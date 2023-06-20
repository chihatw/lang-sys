export interface IAuthUser {
  initializing: boolean;
  currentUid: string;
  loginUser: { uid: string };
}
