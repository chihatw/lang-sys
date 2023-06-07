import user from '../user/framework/1-middleware';
import signinForm from '../signinForm/framework/1-middleware';
import recordWorkouts from '../recordWorkouts/framework/1-middleware';

export default [...user, ...signinForm, ...recordWorkouts];
