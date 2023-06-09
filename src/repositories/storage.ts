import { ref, uploadBytes } from 'firebase/storage';
import { storage } from './firebase';

// todo will delete
export const uploadStorage = (blob: Blob, path: string) => {
  const storageRef = ref(storage, path);
  // Blob 経由でファイルをアップロード
  uploadBytes(storageRef, blob)
    .then(() => console.log('uploaded'))
    .catch((error) => console.error(error));
};
