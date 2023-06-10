import * as rtk from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { Services } from '../../infrastructure/services';
import reducer from './reducer';
import middleware from './middleware';

export const configureStore = (services: Services) =>
  rtk.configureStore({
    reducer,
    devTools: import.meta.env.DEV,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
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
        },
      })
        .concat(logger)
        .concat([...middleware].map((f) => f(services))),
  });
