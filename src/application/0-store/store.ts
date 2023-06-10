import * as rtk from '@reduxjs/toolkit';
import logger from 'redux-logger';

import { Services } from '../../infrastructure/services';
import reducer from './reducer';
import middleware from './middleware';

const serializableCheck = {
  ignoredActions: [
    // user
    'user/setUser',
    'user/signinSuccess',
    // audio
    'audio/setChenVoice',
    'audio/setRecordedVoice',
    'audio/setAudioContext',
    'audio/addFetchedAudioBuffers',
    // recordWorkoutPractice
    'recordWorkoutPractice/setBlobAndAudioBuffer',
    // chineseCueWorkoutPractice
    'chineseCueWorkoutPractice/setBlobAndAudioBuffer',
  ],
  ignoredPaths: [
    // user
    'user.currentUser',
    // audio
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
  ? // 開発の場合 logger を挟む
    (services: Services) =>
      rtk.configureStore({
        reducer,
        middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({ serializableCheck })
            .concat(logger)
            .concat([...middleware].map((f) => f(services))),
        devTools: import.meta.env.DEV,
      })
  : // 本番の場合 logger を挟まない
    (services: Services) =>
      rtk.configureStore({
        reducer,
        middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({ serializableCheck }).concat(
            [...middleware].map((f) => f(services))
          ),
        devTools: import.meta.env.DEV,
      });
