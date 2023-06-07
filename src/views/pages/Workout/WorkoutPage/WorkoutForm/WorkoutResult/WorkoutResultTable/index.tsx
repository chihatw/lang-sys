import { WorkoutState } from '../../../Model';
import WorkoutResultTableHeader from './WorkoutResultTableHeader';
import WorkoutResultTableRow from './WorkoutResultTableRow/indet';

const WorkoutResultTable = ({
  type,
  state,
  handleClick,
}: {
  type: string;
  state: WorkoutState;
  handleClick: (cueId: string) => void;
}) => {
  const cueIds = state.cues.map((cue) => cue.id);
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div
        style={{
          width: 440,
          display: 'grid',
          rowGap: 8,
        }}
      >
        <WorkoutResultTableHeader />
        {cueIds.map((_, index) => (
          <WorkoutResultTableRow
            key={index}
            type={type}
            state={state}
            index={index}
            handleClick={handleClick}
          />
        ))}
      </div>
    </div>
  );
};

export default WorkoutResultTable;
