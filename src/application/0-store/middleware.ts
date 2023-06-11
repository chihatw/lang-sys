import users from 'application/users/framework/1-middleware';
import audio from 'application/audio/framework/1-middleware';
import authUser from 'application/authUser/framework/1-middleware';
import recordWorkouts from 'application/recordWorkouts/framework/1-middleware';
import chineseWorkouts from 'application/chineseCueWorkouts/framework/1-middleware';
import chineseCueWorkoutList from 'application/chineseCueWorkoutList/framework/1-middleware';
import recordWorkoutList from 'application/recordWorkoutList/framework/1-middleware';

export default [
  ...users,
  ...audio,
  ...authUser,
  ...recordWorkouts,
  ...recordWorkoutList,
  ...chineseWorkouts,
  ...chineseCueWorkoutList,
];
