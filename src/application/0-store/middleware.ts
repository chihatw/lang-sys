import user from '../user/framework/1-middleware';
import signinForm from '../signinForm/framework/1-middleware';
import recordWorkoutList from '../recordWorkoutList/framework/1-middleware';
import recordWorkoutPractice from '../recordWorkoutPractice/framework/1-middleware';

export default [
  ...user,
  ...signinForm,
  ...recordWorkoutList,
  ...recordWorkoutPractice,
];
