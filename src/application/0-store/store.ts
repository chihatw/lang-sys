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
            'audio/setAudioContext',
            'audio/setAudioBuffers',
          ],
          ignoredPaths: [
            'user.currentUser',
            'audio.audioContext',
            'audio.audioBuffers',
            'recordWorkoutList.audioBuffers',
          ],
        },
      })
        .concat(logger)
        .concat([...middleware].map((f) => f(services))),
  });
