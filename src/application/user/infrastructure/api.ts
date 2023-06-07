import * as firebaseAuth from 'firebase/auth';
import { auth } from '../../../repositories/firebase';

export const signInWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<{
  user: firebaseAuth.User | null;
  errorMsg: string;
}> => {
  try {
    const { user } = await firebaseAuth.signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return { user, errorMsg: '' };
  } catch (error) {
    return { user: null, errorMsg: (error as { message: string }).message };
  }
};

export const signOut = async (): Promise<{ errorMsg: string }> => {
  try {
    await firebaseAuth.signOut(auth);
    return { errorMsg: '' };
  } catch (error) {
    return { errorMsg: (error as { message: string }).message };
  }
};
