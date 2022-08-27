export type WhiteBoardManageFormState = {
  initialize: boolean;
  users: { uid: string; name: string }[];
  uid: string;
  text: string;
};

export const INITIAL_WHITE_BOARD_MANAGE_FORM_STATE: WhiteBoardManageFormState =
  {
    initialize: true,
    users: [],
    uid: '',
    text: '',
  };
