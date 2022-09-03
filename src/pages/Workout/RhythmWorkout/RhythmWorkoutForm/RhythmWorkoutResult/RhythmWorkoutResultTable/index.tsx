import React from 'react';
import { RhythmWorkoutState } from '../../../Model';
import RhythmWorkoutResultTableHeader from './RhythmWorkoutResultTableHeader';
import RhythmWorkoutResultTableRow from './RhythmWorkoutResultTableRow/indet';

const RhythmWorkoutResultTable = ({
  state,
  handleClick,
}: {
  state: RhythmWorkoutState;
  handleClick: (start: number, end: number, type: string) => void;
}) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div
        style={{
          width: 440,
          display: 'grid',
          rowGap: 8,
        }}
      >
        <RhythmWorkoutResultTableHeader />
        {state.cueIds.map((_, index) => (
          <RhythmWorkoutResultTableRow
            key={index}
            state={state}
            index={index}
            handleClick={handleClick}
          />
        ))}
      </div>
    </div>
  );
};

export default RhythmWorkoutResultTable;
