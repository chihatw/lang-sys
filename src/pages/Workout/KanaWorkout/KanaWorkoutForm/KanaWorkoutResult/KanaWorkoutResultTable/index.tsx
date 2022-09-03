import React from 'react';
import { KanaWorkoutState } from '../../../Model';
import KanaWorkoutResultTableHeader from './KanaWorkoutResultTableHeader';
import KanaWorkoutResultTableRow from './KanaWorkoutResultTableRow';

const KanaWorkoutResultTable = ({
  state,
  handleClick,
}: {
  state: KanaWorkoutState;
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
        <KanaWorkoutResultTableHeader />
        {state.kanas.map((_, index) => (
          <KanaWorkoutResultTableRow
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

export default KanaWorkoutResultTable;
