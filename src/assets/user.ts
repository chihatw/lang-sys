const userChenUid = import.meta.env.VITE_USER_CHEN_UID;
const adminUid = import.meta.env.VITE_ADMIN_UID;

export const USERS: { [key: string]: string } = {
  [adminUid]: '原田',
  [userChenUid]: '陳さん',
};
