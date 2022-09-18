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
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../../../App';
import { USERS } from '../../../assets/user';
import {
  INITIAL_KANA_WORKOUT,
  INITIAL_RHYTHM_WORKOUT,
  INITIAL_STATE,
  KanaWorkout,
  RhythmWorkout,
  State,
} from '../../../Model';
import {
  buildRhythmKanaFormKanaWorkout,
  setKanaWorkout,
} from '../../../services/kanaWorkout';
import {
  buildRhythmKanaFormRhythmWorkout,
  setRhythmWorkout,
} from '../../../services/rhythmWorkout';
import { ActionTypes } from '../../../Update';
import { INITIAL_RHYTHM_KANA_FORM_STATE, RhythmKanaFormState } from './Model';

const reduce = (state: RhythmKanaFormState, action: RhythmKanaFormState) =>
  action;

const RhythmKanaEditPage = () => {
  const { workoutId, type } = useParams();

  const { state } = useContext(AppContext);
  const [formState, formDispatch] = useReducer(reduce, {
    ...INITIAL_RHYTHM_KANA_FORM_STATE,
    uid: Object.keys(USERS)[1],
  });

  useEffect(() => {
    if (!workoutId || !type) return;

    let formState = INITIAL_RHYTHM_KANA_FORM_STATE;
    if (type === 'rhythm') {
      formState = buildRhythmKanaFormRhythmWorkout(
        state.admin.rhythmWorkouts[workoutId]
      );
    } else {
      formState = buildRhythmKanaFormKanaWorkout(
        state.admin.kanaWorkouts[workoutId]
      );
    }
    formDispatch(formState);
  }, []);

  if (!type) return <Navigate to='/' />;
  return <RhythmKanaEditForm state={formState} dispatch={formDispatch} />;
};

export default RhythmKanaEditPage;

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

  const handleChangeIsLocked = (isLocked: boolean) => {
    dispatch({ ...state, isLocked });
  };

  const handleChangeCueIdsStr = (cueIdsStr: string) => {
    dispatch({ ...state, cueIdsStr });
  };

  const handleSubmit = () => {
    let updatedAppState = INITIAL_STATE;
    switch (type) {
      case 'rhythm':
        const originalRhythmWorkout = workoutId
          ? appState.admin.rhythmWorkouts[workoutId]
          : INITIAL_RHYTHM_WORKOUT;

        const updatedRhythmWorkout: RhythmWorkout = {
          id: originalRhythmWorkout.id || nanoid(8),
          uid: state.uid,
          logs: originalRhythmWorkout.logs,
          title: state.title,
          cueIds: state.cueIdsStr.split('\n'),
          isActive: state.isActive,
          createdAt: originalRhythmWorkout.createdAt || Date.now(),
          isLocked: state.isLocked,
        };

        // remote
        setRhythmWorkout(updatedRhythmWorkout);
        // local
        updatedAppState = R.assocPath<RhythmWorkout, State>(
          ['admin', 'rhythmWorkouts', updatedRhythmWorkout.id],
          updatedRhythmWorkout
        )(appState);
        appDispatch({ type: ActionTypes.setState, payload: updatedAppState });
        break;
      case 'kana':
        const originalKanaWorkout = workoutId
          ? appState.admin.kanaWorkouts[workoutId]
          : INITIAL_KANA_WORKOUT;

        const updatedKanaWorkout: KanaWorkout = {
          id: originalKanaWorkout.id || nanoid(8),
          uid: state.uid,
          logs: originalKanaWorkout.logs,
          title: state.title,
          kanas: state.cueIdsStr.split('\n'),
          isActive: state.isActive,
          createdAt: originalKanaWorkout.createdAt || Date.now(),
          isLocked: state.isLocked,
        };

        // remote
        setKanaWorkout(updatedKanaWorkout);
        // local
        updatedAppState = R.assocPath<KanaWorkout, State>(
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
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={state.isLocked}
                onChange={(e) => handleChangeIsLocked(e.target.checked)}
              />
            }
            label='isLocked'
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
