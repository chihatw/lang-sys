import * as rtk from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { Services } from '../../infrastructure/services';
import reducer from './reducer';
import middleware from './middleware';

export const configureStore = (services: Services) =>
  rtk.configureStore({
    reducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [
            'user/setUser',
            'user/signinSuccess',
            'audio/setChenVoice',
            'audio/setRecordedVoice',
            'audio/setAudioContext',
            'audio/setAudioBuffers',
            'recordWorkoutPractice/setBlobAndAudioBuffer',
            'chineseCueWorkoutPractice/setBlobAndAudioBuffer',
          ],
          ignoredPaths: [
            'audio.chenVoice',
            'audio.recordedVoice',
            'user.currentUser',
            'audio.audioContext',
            'audio.audioBuffers',
            'recordWorkoutPractice.blob',
            'recordWorkoutPractice.audioBuffer',
            'chineseCueWorkoutPractice.blob',
            'chineseCueWorkoutPractice.audioBuffer',
          ],
        },
      })
        .concat(logger)
        .concat([...middleware].map((f) => f(services))),
  });
