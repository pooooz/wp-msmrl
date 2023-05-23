import { ResponseMessagesEnum } from '../constants/responseMessages';

export const checkPasswordLength = (password: string) => {
  if (password.length < 4 && password.length > 20) {
    return ResponseMessagesEnum.MIN_MAX_PASSWORD_LENGTH;
  } else {
    return;
  }
};
