import audio from 'application/audio/framework/1-middleware';
import authUser from 'application/authUser/framework/1-middleware';
import chineseWorkouts from 'application/chineseCueWorkouts/framework/1-middleware';
import users from 'application/users/framework/1-middleware';

export default [...users, ...audio, ...authUser, ...chineseWorkouts];
