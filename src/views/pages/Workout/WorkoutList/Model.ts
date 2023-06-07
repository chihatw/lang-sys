import { WorkoutLog } from '../../../../Model';

export type WorkoutListItem = {
  id: string;
  type: string;
  title: string;
  audioBuffer: AudioBuffer | null;
  logs: { createdAt: number; correctRatio: number }[];
};

export const calcCorrectRatio = (log: WorkoutLog, correctAnswers: string[]) => {
  let correctCount = 0;

  Object.values(log.practice.answers).forEach((answer, index) => {
    const correctAnswer = correctAnswers[index];

    if (answer.selected === correctAnswer) {
      correctCount++;
    }
  });
  const correctRatio = Math.round((correctCount / correctAnswers.length) * 100);
  return correctRatio;
};
