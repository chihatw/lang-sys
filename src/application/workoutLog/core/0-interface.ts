export interface IWorkoutLog {
  id: string;
  kanas: string[];
  cueIds: string[];
  createdAt: number;
  opening: {
    tapped: string[];
  };
  practice: {
    answers: {
      [index: number]: {
        createdAt: number;
        playedAt: number[];
        selected: string;
      };
    };
  };
  result: {
    createdAt: number;
    tapped: string[];
  };
}
