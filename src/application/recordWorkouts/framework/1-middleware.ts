import { AnyAction, Middleware } from '@reduxjs/toolkit';
import { Services } from '../../../infrastructure/services';
import { recordWorkoutsActions } from './0-reducer';
import { recordWorkoutListActions } from '../../recordWorkoutList/framework/0-reducer';
import { RootState } from '../../../main';
import { recordWorkoutPracticeActions } from '../../recordWorkoutPractice/framework/0-reducer';
import { shuffle } from '../../utils/utils';

const recordWorkoutsMiddleware =
  (services: Services): Middleware =>
  ({ dispatch, getState }) =>
  (next) =>
  async (action: AnyAction) => {
    next(action);
    switch (action.type) {
      case 'recordWorkoutList/getListStart': {
        const uid = action.payload.uid as string;
        // workouts の取得
        const workouts = await services.api.recordWorkouts.fetchWorkouts(uid);
        dispatch(recordWorkoutsActions.setWorkouts(workouts));

        const workoutIds = Object.values(workouts)
          .sort((a, b) => a.createdAt - b.createdAt)
          .map((workout) => workout.id);

        dispatch(recordWorkoutListActions.setWorkoutIds(workoutIds));
        break;
      }
      case 'recordWorkoutPractice/initiate': {
        const workoutId: string = action.payload.workoutId;
        const recordWorkouts = (getState() as RootState).recordWorkouts;

        const workout = recordWorkouts[workoutId];

        // workout が存在する場合
        if (!!workout) {
          const shuffledCueIds = shuffle([...workout.cueIds]);
          dispatch(
            recordWorkoutPracticeActions.setWorkoutIdAndShuffledCueIds({
              workoutId,
              shuffledCueIds,
            })
          );
          break;
        }

        // workout が存在しない場合
        const gotWorkout = await services.api.recordWorkouts.fetchWorkout(
          workoutId
        );
        if (!!gotWorkout) {
          dispatch(
            recordWorkoutsActions.setWorkouts({ [workoutId]: gotWorkout })
          );

          const shuffledCueIds = shuffle([...gotWorkout.cueIds]);
          dispatch(
            recordWorkoutPracticeActions.setWorkoutIdAndShuffledCueIds({
              workoutId,
              shuffledCueIds,
            })
          );
        }

        break;
      }
      default:
    }
  };

export default [recordWorkoutsMiddleware];
