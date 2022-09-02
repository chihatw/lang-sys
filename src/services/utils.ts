export const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};
export const blobToAudioBuffer = async (
  blob: Blob,
  audioContext: AudioContext
) => {
  const arrayBuffer = await blob.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  return audioBuffer;
};

export const createSourceNode = async (
  blob: Blob,
  audioContext: AudioContext
) => {
  const sourceNode = audioContext.createBufferSource();
  sourceNode.buffer = await blobToAudioBuffer(blob, audioContext);
  sourceNode.connect(audioContext.destination);
  return sourceNode;
};
