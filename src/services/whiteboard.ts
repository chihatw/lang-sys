import { doc, getDoc, setDoc, onSnapshot } from '@firebase/firestore';
import { useEffect } from 'react';

import { db } from '../repositories/firebase';

export const useWhiteBoard = (uid: string, setText: (text: string) => void) => {
  useEffect(() => {
    if (!uid) return;
    const unsub = onSnapshot(doc(db, 'whiteboards', uid), (doc) => {
      console.log('snapshot whiteboard');
      if (!doc.exists()) return;
      setText(doc.data().text);
    });
    return () => unsub();
  }, [uid]);
};

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
