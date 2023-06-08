import { AnyAction, Middleware } from '@reduxjs/toolkit';
import { Services } from '../../../infrastructure/services';
import { audioActions } from './0-reducer';

const audioMiddleware =
  (services: Services): Middleware =>
  ({ dispatch }) =>
  (next) =>
  async (action: AnyAction) => {
    next(action);
    switch (action.type) {
      case 'recordWorkoutList/removeAudioBufferPath': {
        const path = action.payload as string;
        dispatch(audioActions.removeAudioBuffer(path));
        break;
      }
      case 'audio/removeAudioBuffer': {
        const path = action.payload as string;
        await services.api.audio.deleteStorageByPath(path);
        break;
      }
      default:
    }
  };

export default [audioMiddleware];
