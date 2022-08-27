export type SignInFormState = {
  email: string;
  password: string;
  hasError: boolean;
};

export const INITIAL_SIGN_IN_FORM_STATE: SignInFormState = {
  email: '',
  password: '',
  hasError: false,
};
