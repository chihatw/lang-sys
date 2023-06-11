import audio from 'application/audio/framework/0-reducer';

import authUser from 'application/authUser/framework/0-reducer';
import signinForm from 'application/signinForm/framework/0-reducer';

import users from 'application/users/framework/0-reducer';
import userList from 'application/userList/framework/0-reducer';

import recordWorkouts from 'application/recordWorkouts/framework/0-reducer';
import recordWorkoutList from 'application/recordWorkoutList/framework/0-reducer';
import recordWorkoutPractice from 'application/recordWorkoutPractice/framework/0-reducer';

import chineseCueWorkouts from 'application/chineseCueWorkouts/framework/0-reducer';
import chineseCueWorkoutList from 'application/chineseCueWorkoutList/framework/0-reducer';
import chineseCueWorkoutPractice from 'application/chineseCueWorkoutPractice/framework/0-reducer';

export default {
  audio,

  authUser,
  signinForm,

  users,
  userList,

  recordWorkouts,
  recordWorkoutList,
  recordWorkoutPractice,

  chineseCueWorkouts,
  chineseCueWorkoutList,
  chineseCueWorkoutPractice,
};
