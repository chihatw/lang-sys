import { BrandingWatermark } from '@mui/icons-material';
import {
  Button,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Select,
  Switch,
  TextField,
} from '@mui/material';
import { Container } from '@mui/system';
import { nanoid } from 'nanoid';
import * as R from 'ramda';
import React, { useContext, useEffect, useReducer } from 'react';
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';

import { USERS } from '../../../../assets/user';
import {
  INITIAL_WORKOUT,
  INITIAL_STATE,
  Workout,
  State,
} from '../../../../Model';
import { buildRhythmKanaForm, setWorkout } from '../../../../services/workout';
import { ActionTypes } from '../../../../Update';
import { TYPE } from '../commons';
import { INITIAL_RHYTHM_KANA_FORM_STATE, RhythmKanaFormState } from './Model';
import { AppContext } from '../../..';

const reduce = (state: RhythmKanaFormState, action: RhythmKanaFormState) =>
  action;

const WorkoutEditPage = () => {
  const { workoutId } = useParams();

  const { pathname } = useLocation();
  const type = pathname.split('/')[1];

  const { state } = useContext(AppContext);
  const [formState, formDispatch] = useReducer(reduce, {
    ...INITIAL_RHYTHM_KANA_FORM_STATE,
    uid: Object.keys(USERS)[1],
  });

  useEffect(() => {
    if (!workoutId || !type) return;

    let formState = INITIAL_RHYTHM_KANA_FORM_STATE;

    const CUEIDS = {
      [TYPE.pitch]: state.admin.rhythmWorkouts[workoutId].cueIds,
      [TYPE.rhythm]: state.admin.rhythmWorkouts[workoutId].cueIds,
      [TYPE.kana]: state.admin.kanaWorkouts[workoutId].kanas,
    };
    switch (type) {
      case TYPE.pitch:
      case TYPE.rhythm:
        formState = buildRhythmKanaForm(
          state.admin.rhythmWorkouts[workoutId],
          CUEIDS[type].join('\n')
        );
        break;
      case TYPE.kana:
        formState = buildRhythmKanaForm(
          state.admin.kanaWorkouts[workoutId],
          CUEIDS[type].join('\n')
        );
        break;
      default:
    }
    formDispatch(formState);
  }, []);

  if (!type) return <Navigate to='/' />;
  return <RhythmKanaEditForm state={formState} dispatch={formDispatch} />;
};

export default WorkoutEditPage;

const RhythmKanaEditForm = ({
  state,
  dispatch,
}: {
  state: RhythmKanaFormState;
  dispatch: React.Dispatch<RhythmKanaFormState>;
}) => {
  const { workoutId, type } = useParams();
  const { state: appState, dispatch: appDispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/');
  };

  const handleChangeTitle = (title: string) => {
    dispatch({ ...state, title });
  };

  const handleChangeUid = (uid: string) => {
    dispatch({ ...state, uid });
  };

  const handleChangeIsActive = (isActive: boolean) => {
    dispatch({ ...state, isActive });
  };

  const handleChangeCueIdsStr = (cueIdsStr: string) => {
    dispatch({ ...state, cueIdsStr });
  };

  const handleSubmit = () => {
    let updatedAppState = INITIAL_STATE;
    switch (type) {
      case TYPE.rhythm:
        const originalRhythmWorkout = workoutId
          ? appState.admin.rhythmWorkouts[workoutId]
          : INITIAL_WORKOUT;

        const updatedRhythmWorkout: Workout = {
          id: originalRhythmWorkout.id || nanoid(8),
          uid: state.uid,
          logs: originalRhythmWorkout.logs,
          title: state.title,
          kanas: [],
          cueIds: state.cueIdsStr.split('\n'),
          isActive: state.isActive,
          createdAt: originalRhythmWorkout.createdAt || Date.now(),
        };

        // remote
        setWorkout(type, updatedRhythmWorkout);
        // local
        updatedAppState = R.assocPath<Workout, State>(
          ['admin', 'rhythmWorkouts', updatedRhythmWorkout.id],
          updatedRhythmWorkout
        )(appState);
        appDispatch({ type: ActionTypes.setState, payload: updatedAppState });
        break;
      case TYPE.kana:
        const originalKanaWorkout = workoutId
          ? appState.admin.kanaWorkouts[workoutId]
          : INITIAL_WORKOUT;

        const updatedKanaWorkout: Workout = {
          id: originalKanaWorkout.id || nanoid(8),
          uid: state.uid,
          logs: originalKanaWorkout.logs,
          title: state.title,
          kanas: state.cueIdsStr.split('\n'),
          cueIds: [],
          isActive: state.isActive,
          createdAt: originalKanaWorkout.createdAt || Date.now(),
        };

        // remote
        setWorkout(type, updatedKanaWorkout);
        // local
        updatedAppState = R.assocPath<Workout, State>(
          ['admin', 'kanaWorkouts', updatedKanaWorkout.id],
          updatedKanaWorkout
        )(appState);
        appDispatch({ type: ActionTypes.setState, payload: updatedAppState });

        break;
      default:
    }
    navigate('/');
  };

  return (
    <Container maxWidth='sm' sx={{ paddingTop: 2, paddingBottom: 20 }}>
      <div style={{ display: 'grid', rowGap: 16 }}>
        <div>
          <Button
            variant='contained'
            sx={{ color: 'white' }}
            onClick={handleBack}
          >
            戻る
          </Button>
        </div>
        <TextField
          size='small'
          value={state.title}
          label='title'
          onChange={(e) => handleChangeTitle(e.target.value)}
        />
        <Select
          value={state.uid}
          size='small'
          onChange={(e) => handleChangeUid(e.target.value)}
        >
          {Object.entries(USERS).map(([key, value], index) => (
            <MenuItem key={key} value={key}>
              {value}
            </MenuItem>
          ))}
        </Select>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={state.isActive}
                onChange={(e) => handleChangeIsActive(e.target.checked)}
              />
            }
            label='isActive'
          />
        </FormGroup>
        <TextField
          multiline
          rows={10}
          value={state.cueIdsStr}
          size='small'
          onChange={(e) => handleChangeCueIdsStr(e.target.value)}
        />
        <Button
          variant='contained'
          sx={{ color: 'white' }}
          onClick={handleSubmit}
        >
          {!!workoutId ? '更新' : '新規作成'}
        </Button>
      </div>
    </Container>
  );
};
