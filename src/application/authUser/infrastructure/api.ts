import * as firebaseAuth from 'firebase/auth';
import { auth } from 'infrastructure/firebase';

export const signInWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<{
  authUser: firebaseAuth.User | null;
  errorMsg: string;
}> => {
  try {
    const { user } = await firebaseAuth.signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return { authUser: user, errorMsg: '' };
  } catch (error) {
    return { authUser: null, errorMsg: (error as { message: string }).message };
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
