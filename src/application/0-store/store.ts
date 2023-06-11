import * as rtk from '@reduxjs/toolkit';
import logger from 'redux-logger';

import reducer from 'application/0-store/reducer';
import middleware from 'application/0-store/middleware';
import { Services } from 'infrastructure/services';

const serializableCheck = {
  ignoredActions: [
    // authUser
    'authUser/setUser',
    'authUser/setLoginUser',
    // audio
    'audio/setBlob',
    'audio/setChenVoice',
    'audio/setRecordedVoice',
    'audio/setAudioContext',
    'audio/addFetchedAudioBuffers',
    // recordWorkoutPractice
    'recordWorkoutPractice/setAudioBuffer',
    'recordWorkoutPractice/saveAudioBuffer',
    // chineseCueWorkoutPractice
    'chineseCueWorkoutPractice/setAudioBuffer',
    'chineseCueWorkoutPractice/saveAudioBuffer',
  ],
  ignoredPaths: [
    // authUser
    'authUser.loginUser',
    // audio
    'audio.blob',
    'audio.chenVoice',
    'audio.recordedVoice',
    'audio.fetchedAudioBuffers',
    //recordWoroutPractice
    'recordWorkoutPractice.blob',
    'recordWorkoutPractice.audioBuffer',
    // chineseCueWorkoutPractice
    'chineseCueWorkoutPractice.blob',
    'chineseCueWorkoutPractice.audioBuffer',
  ],
};

export const configureStore = import.meta.env.DEV
  ? // 開発の場合
    (services: Services) =>
      rtk.configureStore({
        reducer,
        middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({ serializableCheck })
            .concat(logger) // logger を挟む
            .concat([...middleware].map((f) => f(services))),
        devTools: import.meta.env.DEV,
      })
  : // 本番の場合
    (services: Services) =>
      rtk.configureStore({
        reducer,
        middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({ serializableCheck }).concat(
            [...middleware].map((f) => f(services))
          ),
        devTools: import.meta.env.DEV,
      });
