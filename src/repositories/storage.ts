import { deleteObject, ref, uploadBytes } from 'firebase/storage';
import { storage } from './firebase';

export const uploadStorage = (blob: Blob, path: string) => {
  const storageRef = ref(storage, path);
  // Blob 経由でファイルをアップロード
  uploadBytes(storageRef, blob)
    .then(() => console.log('uploaded'))
    .catch((error) => console.error(error));
};

export const deleteStorage = (path: string) => {
  const storageRef = ref(storage, path);
  deleteObject(storageRef)
    .then(() => console.log('deleted'))
    .catch((err) => console.error(err));
};
