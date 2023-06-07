import { Pause, PlayArrow } from '@mui/icons-material';
import { IconButton, Slider, useTheme } from '@mui/material';
import { MutableRefObject, useEffect, useRef, useState } from 'react';

import TimePane from './TimePane';
import { createSourceNode } from '../../../application/audio/core/2-services';

const AudioBufferSlider = ({
  audioBuffer,
  audioContext,
}: {
  audioBuffer: AudioBuffer;
  audioContext: AudioContext;
}) => {
  const redrawSliderTiming = 5; // 何フレームに1回更新するか
  const theme = useTheme();

  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);

  const rafIdRef = useRef(0);
  const frameCountRef = useRef(0);
  const sourseNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const audioContextCurrentTimeAtStartRef = useRef(0);
  const currentPausedAtRef = useRef(0);

  useEffect(() => {
    return () => {
      pause();
    };
  }, []);

  const play = async () => {
    const sourceNode = await createSourceNode(audioBuffer, audioContext);

    //　最後まで再生した時の処理
    sourceNode.onended = () => {
      stopAnimation(rafIdRef);

      // local
      setIsPlaying(false);
      setElapsedTime(0);
      setSliderValue(0);
      currentPausedAtRef.current = 0;
    };

    startAudio(sourceNode, currentPausedAtRef.current);

    // local
    setIsPlaying(true);
    sourseNodeRef.current = sourceNode;
    audioContextCurrentTimeAtStartRef.current = audioContext.currentTime;
    // pausedRef.current = false;

    loop();
  };

  const loop = () => {
    const currentElapsedTime =
      audioContext.currentTime - audioContextCurrentTimeAtStartRef.current;
    const elapsedTime = currentElapsedTime + currentPausedAtRef.current;

    // local
    setElapsedTime(elapsedTime);

    // 間引かないと slider の描画が更新されない
    if (frameCountRef.current % redrawSliderTiming === 0) {
      setSliderValue(
        currentTimeToSliderValue(elapsedTime, audioBuffer.duration)
      );
    }

    frameCountRef.current++;
    rafIdRef.current = window.requestAnimationFrame(loop);
  };

  const pause = () => {
    stopAudio(sourseNodeRef);
    stopAnimation(rafIdRef);

    // local
    setIsPlaying(false);
    // pausedRef.current = true;
    currentPausedAtRef.current =
      audioContext.currentTime - audioContextCurrentTimeAtStartRef.current;
  };

  const handleChangeSliderValue = (value: number) => {
    setSliderValue(value);
    const elapsedTime = sliderValueToElapsedTime(value, audioBuffer.duration);
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

const startAudio = (sourceNode: AudioBufferSourceNode, offset: number) => {
  sourceNode.start(0, offset);
};

const stopAudio = (
  sourseNodeRef: MutableRefObject<AudioBufferSourceNode | null>
) => {
  const sourceNode = sourseNodeRef.current;
  sourceNode && sourceNode.stop(0);
  sourseNodeRef.current = null;
};

const stopAnimation = (rafIdRef: MutableRefObject<number>) => {
  window.cancelAnimationFrame(rafIdRef.current);
};

const currentTimeToSliderValue = (
  currentTime: number,
  duration: number
): number => {
  const value = duration ? (currentTime / duration) * 100 : 0;
  return Math.min(Math.max(value, 0), 100);
};

const sliderValueToElapsedTime = (
  sliderValue: number,
  duration: number
): number => {
  return (duration * sliderValue) / 100;
};
