import { deleteObject, ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../repositories/firebase';
import { blobToAudioBuffer } from '../core/2-services';

export const deleteStorageByPath = async (path: string) => {
  const storageRef = ref(storage, path);
  deleteObject(storageRef)
    .then(() => console.log(`%c"${path}" deleted`, 'color:red'))
    .catch((err) => console.error(err));
};

export const fetchStorageAudioBuffer = async (
  path: string,
  audioContext: AudioContext
) => {
  let storagePath = '';
  try {
    storagePath = await getDownloadURL(ref(storage, path));
  } catch (e) {
    console.warn(e);
  }
  if (!storagePath) return;

  return await fetchAudioBuffer(storagePath, audioContext);
};

export const fetchLocalAudioBuffer = async (
  path: string,
  audioContext: AudioContext
) => {
  const localPath = path;
  return await fetchAudioBuffer(localPath, audioContext);
};

const fetchAudioBuffer = async (path: string, audioContext: AudioContext) => {
  const response = await fetch(path);

  if (!response) return;

  const blob = await response.blob();
  if (!blob) return;

  const audioBuffer = await blobToAudioBuffer(blob, audioContext);
  return audioBuffer;
};