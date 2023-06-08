import { getDownloadURL, ref } from 'firebase/storage';
import * as R from 'ramda';

import { Dispatch, useEffect, useState } from 'react';
import { State } from '../Model';
import { storage } from '../repositories/firebase';
import { Action, ActionTypes } from '../Update';
import { blobToAudioBuffer } from '../application/audio/core/2-services';

// todo
export const useAudioBuffer = (
  path: string,
  state: State,
  audioContext: AudioContext | null,
  dispatch: Dispatch<Action>,
  isRemote?: boolean
) => {
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);

  /** 代入 */
  useEffect(() => {
    if (!path) {
      setAudioBuffer(null);
      return;
    }

    const audioBuffer = state.audioBuffers[path];
    // ローカルになければ、終了
    if (!audioBuffer) {
      setAudioBuffer(null);
      return;
    }
    setAudioBuffer(audioBuffer);
  }, [state.audioBuffers, path]);

  /** state.audioBuffers の更新 */
  useEffect(() => {
    if (!path) return;

    const audioBuffer = state.audioBuffers[path];
    // ローカルにあれば、終了
    if (!!audioBuffer) return;

    const fetchData = async () => {
      updateState_by_fetch_audioPath(
        path,
        state,
        audioContext,
        dispatch,
        isRemote
      );
    };
    fetchData();
  }, [state.audioBuffers, audioContext, path]);

  return audioBuffer;
};

const updateState_by_fetch_audioPath = async (
  path: string,
  state: State,
  audioContext: AudioContext | null,
  dispatch: Dispatch<Action>,
  isRemote?: boolean
) => {
  if (!audioContext) return;

  try {
    const fetchPath = !isRemote
      ? path
      : await getDownloadURL(ref(storage, path));
    const response = await fetch(fetchPath);

    if (!response) return;
    const blob = await response.blob();
    if (!blob) return;

    const audioBuffer = await blobToAudioBuffer(blob, audioContext);
    if (!audioBuffer) return;

    const updatedState = R.assocPath<AudioBuffer, State>(
      ['audioBuffers', path],
      audioBuffer
    )(state);

    dispatch({ type: ActionTypes.setState, payload: updatedState });
  } catch (e) {
    console.log(e);
  }
};
