import { Pause, PlayArrow } from '@mui/icons-material';
import { IconButton, Slider, useTheme } from '@mui/material';
import { useEffect, useMemo, useRef, useState } from 'react';

import TimePane from './TimePane';
import { createSourceNode } from 'application/audio/core/2-services';

const AudioBufferSlider = ({ audioBuffer }: { audioBuffer: AudioBuffer }) => {
  const redrawSliderTiming = 5; // 何フレームに1回更新するか
  const theme = useTheme();

  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);

  const rafIdRef = useRef(0);
  const frameCountRef = useRef(0);
  const sourseNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const currentPausedAtRef = useRef(0);
  const audioContextCurrentTimeAtStartRef = useRef(0);

  const { start, end, duration } = useMemo(
    () => ({
      start: 0,
      end: audioBuffer.duration,
      duration: audioBuffer.duration,
    }),
    [audioBuffer]
  );
  const pausedRef = useRef(false);

  useEffect(() => {
    return () => {
      pause();
    };
  }, []);

  // debug
  useEffect(() => {
    console.log(JSON.stringify({ sliderValue: Math.round(sliderValue) }));
  }, [sliderValue]);

  const play = async () => {
    const audioContext = new AudioContext();
    audioContextRef.current = audioContext;
    const sourceNode = await createSourceNode(audioBuffer);

    const offset = currentPausedAtRef.current; // 開始位置を秒で指定

    //　最後まで再生した時の処理
    sourceNode.onended = () => {
      window.cancelAnimationFrame(rafIdRef.current);

      setIsPlaying(false);
      if (!pausedRef.current) {
        setElapsedTime(0);
        setSliderValue(0);
        currentPausedAtRef.current = start;
      }
    };

    sourceNode.start(0, offset, end - offset);

    setIsPlaying(true);
    sourseNodeRef.current = sourceNode;
    audioContextCurrentTimeAtStartRef.current = audioContext.currentTime;

    pausedRef.current = false;

    loop();
  };

  const loop = () => {
    const audioContext = audioContextRef.current;
    console.log('a');
    if (!audioContext) return;

    const currentElapsedTime =
      audioContext.currentTime - audioContextCurrentTimeAtStartRef.current;
    const elapsedTime = currentElapsedTime + currentPausedAtRef.current;
    console.log(JSON.stringify({ elapsedTime: elapsedTime.toFixed(1) }));
    setElapsedTime(elapsedTime);

    // 間引かないと slider の描画が更新されない
    if (frameCountRef.current % redrawSliderTiming === 0) {
      setSliderValue(currentTimeToSliderValue(elapsedTime, duration, start));
    }

    frameCountRef.current++;
    rafIdRef.current = window.requestAnimationFrame(loop);
  };

  const pause = () => {
    const audioContext = audioContextRef.current;
    if (!audioContext) return;

    const sourceNode = sourseNodeRef.current;
    sourceNode && sourceNode.stop(0);
    sourseNodeRef.current = null;

    setIsPlaying(false);
    window.cancelAnimationFrame(rafIdRef.current);

    currentPausedAtRef.current =
      audioContext.currentTime - audioContextCurrentTimeAtStartRef.current;
    pausedRef.current = true;
  };

  const handleChangeSliderValue = (value: number) => {
    setSliderValue(value);
    const elapsedTime = sliderValueToElapsedTime(
      value,
      audioBuffer.duration,
      0
    );
    setElapsedTime(elapsedTime);
    currentPausedAtRef.current = elapsedTime;
  };

  return (
    <div
      style={{
        ...(theme.typography as any).mPlusRounded,
        display: 'flex',
        fontSize: 12,
        alignItems: 'center',
        whiteSpace: 'nowrap',
      }}
    >
      <IconButton
        sx={{ color: '#86bec4' }}
        onClick={(e) => {
          e.stopPropagation();
          isPlaying ? pause() : play();
        }}
      >
        {isPlaying ? <Pause /> : <PlayArrow />}
      </IconButton>
      <TimePane elapsed={elapsedTime} duration={audioBuffer.duration} />
      <Slider
        sx={{ paddingTop: '14px', marginRight: '6px' }}
        color='primary'
        value={sliderValue}
        onChange={(e, value) => {
          e.stopPropagation();
          handleChangeSliderValue(value as number);
        }}
      />
    </div>
  );
};

export default AudioBufferSlider;

const currentTimeToSliderValue = (
  currentTime: number,
  duration: number,
  start: number
): number => {
  const value = duration ? ((currentTime - start) / duration) * 100 : 0;
  return Math.min(Math.max(value, 0), 100);
};

const sliderValueToElapsedTime = (
  sliderValue: number,
  duration: number,
  start?: number
): number => {
  return (duration * sliderValue) / 100 + (start || 0);
};
