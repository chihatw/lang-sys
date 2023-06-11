import { collection, getDocs, query } from 'firebase/firestore';
import { db } from 'infrastructure/firebase';
import { USER_STORE_COLLECTION } from '../core/1-constants';

export const fetchUsers = async () => {
  console.log(`%cfetch ${USER_STORE_COLLECTION}`, 'color:red');

  let q = query(collection(db, USER_STORE_COLLECTION));

  const querySnapshot = await getDocs(q);
  const users: { [id: string]: string } = {};

  querySnapshot.forEach((doc) => {
    const { uid, displayName } = doc.data();
    users[uid] = displayName;
  });
  return users;
};
