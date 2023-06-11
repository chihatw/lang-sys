import audio from 'application/audio/framework/1-middleware';
import authUser from 'application/authUser/framework/1-middleware';
import recordWorkouts from 'application/recordWorkouts/framework/1-middleware';
import chineseWorkouts from 'application/chineseCueWorkouts/framework/1-middleware';

export default [...authUser, ...audio, ...recordWorkouts, ...chineseWorkouts];
