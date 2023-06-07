import user from '../user/framework/1-middleware';
import signinForm from '../signinForm/framework/1-middleware';

export default [...user, ...signinForm];
