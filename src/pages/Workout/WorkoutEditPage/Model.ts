/**
 * cueIdsStr は、最終的に改行で分割して
 * RhythmWorkout は cueIds
 * KanaWorkout は kanas にする
 */
export type RhythmKanaFormState = {
  uid: string;
  title: string;
  isActive: boolean;
  cueIdsStr: string;
};

export const INITIAL_RHYTHM_KANA_FORM_STATE: RhythmKanaFormState = {
  uid: '',
  title: '',
  isActive: false,
  cueIdsStr: '',
};
