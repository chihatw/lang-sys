import { doc, getDoc, setDoc } from '@firebase/firestore';

import { db } from '../repositories/firebase';

export const getWhiteBoardText = async (uid: string) => {
  console.log('get whiteboard');
  const snapshot = await getDoc(doc(db, 'whiteboards', uid));
  if (!snapshot.exists()) return '';
  return snapshot.data().text;
};

export const setWhiteBoardText = async (uid: string, text: string) => {
  console.log('set whiteboard');
  setDoc(doc(db, 'whiteboards', uid), { text });
};
