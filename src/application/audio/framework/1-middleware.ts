import chinSan_voice from 'assets/audios/chinSan_voice.mp3';
import chinSan2_voice from 'assets/audios/chinSan2_voice.mp3';

import { AnyAction, Middleware } from '@reduxjs/toolkit';
import { audioActions } from './0-reducer';
import { Services } from 'infrastructure/services';
import { RootState } from 'main';

const audioMiddleware =
  (services: Services): Middleware =>
  ({ dispatch, getState }) =>
  (next) =>
  async (action: AnyAction) => {
    next(action);
    switch (action.type) {
      case 'recordWorkoutList/getAudioBuffersStart':
      case 'chineseCueWorkoutList/getAudioBuffersStart': {
        const paths: string[] = action.payload.paths;
        const { fetchedAudioBuffers } = (getState() as RootState).audio;

        // audioBuffers の取得
        const audioBuffers: { [path: string]: AudioBuffer } = {};
        await Promise.all(
          paths.map(async (path) => {
            const fetchedAudioBuffer = fetchedAudioBuffers[path];
            // fetchedAudioBuffer が存在しない場合
            if (!fetchedAudioBuffer) {
              const gotAudioBuffer =
                await services.api.audio.fetchStorageAudioBuffer(path);
              if (gotAudioBuffer) {
                audioBuffers[path] = gotAudioBuffer;
              }
            }
          })
        );

        dispatch(audioActions.mergeFetchedAudioBuffers(audioBuffers));

        break;
      }
      case 'recordWorkoutPractice/initiate': {
        const { chenVoice } = (getState() as RootState).audio;
        // chenVoice が存在すれば、終了
        if (!!chenVoice) break;

        // chenVoice が存在しなければ、
        const audioBuffer = await services.api.audio.fetchLocalAudioBuffer(
          chinSan_voice
        );
        if (audioBuffer) {
          dispatch(audioActions.setChenVoice(audioBuffer));
        }
        break;
      }
      case 'audio/saveAudioBuffer': {
        const path = action.payload.path as string;
        const { recordedBlob } = (getState() as RootState).audio;
        if (!!recordedBlob) {
          await services.api.audio.uploadStorageByPath(recordedBlob, path);
          dispatch(audioActions.resetBlobAndAudioBuffer());
          break;
        }
      }
      case 'audio/removeFetchedAudioBuffer': {
        const path = action.payload as string;
        await services.api.audio.deleteStorageByPath(path);
        break;
      }
      case 'chineseCueWorkoutPractice/initiate': {
        const { chenVoice2 } = (getState() as RootState).audio;
        //  recordedVoice が存在すれば、終了
        if (!!chenVoice2) break;

        // recordedVoice が存在しなければ、
        const audioBuffer = await services.api.audio.fetchLocalAudioBuffer(
          chinSan2_voice
        );

        if (audioBuffer) {
          dispatch(audioActions.setChenVoice2(audioBuffer));
        }
        break;
      }
      default:
    }
  };

export default [audioMiddleware];
