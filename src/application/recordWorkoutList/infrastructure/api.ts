import { storage } from '../../../repositories/firebase';
import { DocumentData } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref } from 'firebase/storage';
import { blobToAudioBuffer } from '../../audio/core/2-services';
import { IRecordWorkout } from '../../recordWorkouts/core/0-interface';

export const fetchAudioBuffer = async (
  path: string,
  audioContext: AudioContext
) => {
  let fetchPath = '';
  try {
    fetchPath = await getDownloadURL(ref(storage, path));
  } catch (e) {
    console.warn(e);
  }
  if (!fetchPath) return;

  const response = await fetch(fetchPath);

  if (!response) return;

  const blob = await response.blob();
  if (!blob) return;

  const audioBuffer = await blobToAudioBuffer(blob, audioContext);
  return audioBuffer;
};

export const deleteRecordWorkoutAudio = async (id: string) => {
  const path = `recordWorkout/${id}`;
  const storageRef = ref(storage, path);
  deleteObject(storageRef)
    .then(() => console.log('deleted'))
    .catch((err) => console.error(err));
};

export const buildWorkout = (doc: DocumentData): IRecordWorkout => {
  const { uid, cueIds, title, logs, createdAt } = doc.data();
  return {
    id: doc.id,
    uid: uid || '',
    logs: logs || {},
    title: title || '',
    cueIds: cueIds || [],
    createdAt: createdAt || 0,
  };
};
