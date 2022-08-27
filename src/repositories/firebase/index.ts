import { getAuth } from '@firebase/auth';
import { getStorage } from '@firebase/storage';
import { getFirestore } from '@firebase/firestore';
import { initializeApp } from '@firebase/app';

import config from './config';

const firebaseApp = initializeApp(config);

export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp);
