import user from '../user/framework/1-middleware';
import audio from '../audio/framework/1-middleware';
import recordWorkouts from '../recordWorkouts/framework/1-middleware';

export default [...user, ...audio, ...recordWorkouts];