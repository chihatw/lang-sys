import user from 'application/user/framework/1-middleware';
import audio from 'application/audio/framework/1-middleware';
import recordWorkouts from 'application/recordWorkouts/framework/1-middleware';
import chineseWorkouts from 'application/chineseCueWorkouts/framework/1-middleware';

export default [...user, ...audio, ...recordWorkouts, ...chineseWorkouts];
