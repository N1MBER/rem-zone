import { SignInData } from './AuthSignIn/AuthSignIn';

type ValidateResponse<TYPE extends Record<string, unknown>> = {
  valid: boolean;
  data?: Partial<Record<keyof TYPE, string>>;
};
export const validateAuthData = (
  data: SignInData
): ValidateResponse<SignInData> => {
  const errors: ValidateResponse<SignInData>['data'] = {};
  if (data) {
    if (data.username) {
      if (data.username.length < 5) {
        errors.username = 'Неверно указан логин';
      }
    } else {
      errors.username = 'Не указан логин';
    }
    if (data.password) {
      if (data.password.length < 5) {
        errors.password = 'Неверно указан пароль';
      }
    } else {
      errors.password = 'Не указан пароль';
    }
    return {
      valid: Object.keys(errors).length === 0,
      data: errors,
    };
  }
  return {
    valid: false,
    data: {
      username: 'Не указан логин',
      password: 'Не указан пароль',
    },
  };
};
