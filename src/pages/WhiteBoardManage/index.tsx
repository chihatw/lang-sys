import * as R from 'ramda';
import React, { useContext, useEffect, useReducer } from 'react';
import { AppContext } from '../../App';
import { USERS } from '../../constants';
import { getWhiteBoardText } from '../../services/whiteboard';
import { ActionTypes } from '../../Update';
import {
  INITIAL_WHITE_BOARD_MANAGE_FORM_STATE,
  WhiteBoardManageFormState,
} from './Model';
import { whiteboardManageFormReducer } from './Update';
import { State } from '../../Model';
import WhiteBoardManageForm from './WhiteBoardManageForm';

const WhiteBoardManage = () => {
  const { state, dispatch } = useContext(AppContext);

  const [whiteboardManageFormState, whiteboardManageFormDispatch] = useReducer(
    whiteboardManageFormReducer,
    INITIAL_WHITE_BOARD_MANAGE_FORM_STATE
  );

  useEffect(() => {
    if (!whiteboardManageFormState.initialize) return;
    const fetchData = async () => {
      const users: { uid: string; name: string }[] = [];
      for (const [uid, name] of Object.entries(USERS)) {
        users.push({ uid, name });
      }
      const uid = users[0].uid;
      const text =
        typeof state.whiteBoardTexts[uid] === 'string'
          ? state.whiteBoardTexts[uid]
          : await getWhiteBoardText(uid);

      const updatedState = R.assocPath<string, State>(
        ['whiteBoardTexts', uid],
        text
      )(state);
      dispatch({ type: ActionTypes.setState, payload: updatedState });

      const whiteboardManageFormState: WhiteBoardManageFormState = {
        initialize: false,
        uid,
        users,
        text,
      };
      whiteboardManageFormDispatch(whiteboardManageFormState);
    };
    fetchData();
  }, [state.whiteBoardTexts, whiteboardManageFormState.initialize]);

  return (
    <WhiteBoardManageForm
      state={whiteboardManageFormState}
      dispatch={whiteboardManageFormDispatch}
    />
  );
};

export default WhiteBoardManage;
