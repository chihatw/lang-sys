import { Pause, PlayArrow } from '@mui/icons-material';
import { IconButton, Slider, useTheme } from '@mui/material';
import { useEffect, useMemo, useRef, useState } from 'react';

import TimePane from './TimePane';
import {
  createSourceNode,
  pauseSourceNode,
  updateElapsedTime,
} from 'application/audio/core/2-services';

const AudioBufferSlider = ({ audioBuffer }: { audioBuffer: AudioBuffer }) => {
  const redrawSliderTiming = 4; // 何フレームに1回更新するか
  const theme = useTheme();

  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const rafIdRef = useRef(0);
  const sourseNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const frameCountRef = useRef(0); // 間引きのためのカウンター
  const elapsedTimeRef = useRef(0); // 累積経過時間
  const elapsedStartTimeRef = useRef(0); // 経過時間の起点

  const pausedRef = useRef(false);

  const { start, duration } = useMemo(
    () => ({
      start: 0,
      duration: audioBuffer.duration,
    }),
    [audioBuffer]
  );

  useEffect(() => {
    return () => {
      pause();
    };
  }, []);

  const play = async () => {
    audioContextRef.current = new AudioContext();
    const sourceNode = await createSourceNode(
      audioBuffer,
      audioContextRef.current
    );
    sourseNodeRef.current = sourceNode;

    //　pause または最後まで再生した時の処理
    sourceNode.onended = () => {
      window.cancelAnimationFrame(rafIdRef.current);
      setIsPlaying(false);

      // 最後まで再生した場合、経過時間をリセット
      if (!pausedRef.current) {
        elapsedTimeRef.current = 0;
        setProgress(0);
      }
    };

    // elapsedTime が duration の範囲外の場合は、0 に変更する
    if (elapsedTimeRef.current < 0 || elapsedTimeRef.current > duration) {
      elapsedTimeRef.current = 0;
      setProgress(0);
    }

    sourceNode.start(
      audioContextRef.current.currentTime,
      start + elapsedTimeRef.current // ファイルのスタート位置に経過時間を追加したところから再生
    );

    sourceNode.stop(
      audioContextRef.current.currentTime + duration - elapsedTimeRef.current // duration から経過時間分を引いた時間まで、再生
    );

    setIsPlaying(true);

    // 経過時間の起点を更新
    elapsedStartTimeRef.current = audioContextRef.current.currentTime;

    pausedRef.current = false;

    loop();
  };

  const loop = () => {
    const audioContext = audioContextRef.current;
    if (!audioContext) return;
    updateElapsedTime(audioContext, elapsedStartTimeRef, elapsedTimeRef);

    // 描画は間引いて行う
    if (frameCountRef.current % redrawSliderTiming === 0) {
      setProgress((elapsedTimeRef.current / duration) * 100);
    }

    frameCountRef.current++;
    rafIdRef.current = window.requestAnimationFrame(loop);
  };

  const pause = () => {
    pauseSourceNode(sourseNodeRef);
    pausedRef.current = true;
    setIsPlaying(false);
    window.cancelAnimationFrame(rafIdRef.current);
  };

  const handleChangeSliderValue = (value: number) => {
    pause();
    setProgress(value);
    const elapsedTime = duration * (value / 100);
    elapsedTimeRef.current = elapsedTime;
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
      <TimePane
        elapsed={(duration * progress) / 100}
        duration={audioBuffer.duration}
      />
      <Slider
        sx={{ paddingTop: '14px', marginRight: '6px' }}
        color='primary'
        value={progress}
        onChange={(e, value) => {
          e.stopPropagation();
          handleChangeSliderValue(value as number);
        }}
      />
    </div>
  );
};

export default AudioBufferSlider;
