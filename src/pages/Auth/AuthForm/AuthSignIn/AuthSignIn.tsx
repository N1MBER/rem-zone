import './AuthFormSignIn.scss';

import React, { useState } from 'react';
import { Button } from '@consta/uikit/Button';
import { Text } from '@consta/uikit/Text';
import { TextField, TextFieldPropOnChange } from '@consta/uikit/TextField';
import { PropsWithHTMLAttributes } from '../../../../__private__/utils/types/PropsWithHTMLAttributes';
import { cn } from '../../../../__private__/utils/bem';
import { useFormControlsFocus } from '../../../../hooks/useFormControlsFocus/useFormControlsFocus';
import { validateAuthData } from '../helper';

const cnAuthFormSignIn = cn('AuthFormSignIn');

export type SignInData = {
  username?: string;
  password?: string;
};

type Props = PropsWithHTMLAttributes<
  {
    error?: string;
    onSubmit?: (value: {
      e: React.MouseEvent;
      data: Required<SignInData>;
    }) => void;
  },
  HTMLDivElement
>;

export const AuthFormSignIn = (props: Props) => {
  const { onSubmit, className, error } = props;
  const [data, setData] = useState<SignInData>({});
  const [errors, setErrors] = useState<
    Partial<Record<keyof SignInData, string>>
  >({});

  const handleClick = (e: React.MouseEvent) => {
    const { valid, data: errorsData } = validateAuthData(data);
    if (valid) {
      setErrors({});
      onSubmit?.({
        e,
        data: {
          username: data.username || '',
          password: data.password || '',
        },
      });
    } else {
      errorsData && setErrors(errorsData);
    }
  };

  const handleChange: TextFieldPropOnChange = (params) => {
    const { name, value } = params;
    setData({
      ...data,
      [name as keyof SignInData]: value,
    });
  };

  const { refs, onKeyPress } = useFormControlsFocus(3);

  return (
    <div className={cnAuthFormSignIn(null, [className])}>
      <Text as="h3" className={cnAuthFormSignIn('Label')}>
        Вход в CRM
      </Text>
      <TextField
        label="Имя пользователя"
        type="text"
        name="username"
        value={data.username}
        autoFocus
        width="full"
        size="m"
        ref={refs[0]}
        onKeyPress={(e) => onKeyPress(e, 1)}
        placeholder="Имя пользователя"
        status={errors.username || error ? 'alert' : undefined}
        caption={errors.username || error}
        className={cnAuthFormSignIn('Input')}
        onChange={handleChange}
      />
      <TextField
        label="Пароль"
        type="password"
        name="password"
        width="full"
        size="m"
        ref={refs[1]}
        value={data.password}
        placeholder="Пароль"
        status={errors.password ? 'alert' : undefined}
        caption={errors.password}
        onKeyPress={(e) => onKeyPress(e, 2)}
        className={cnAuthFormSignIn('Input')}
        onChange={handleChange}
      />
      <Button
        className={cnAuthFormSignIn('Button')}
        label="Войти"
        size="l"
        width="full"
        ref={refs[2] as React.RefObject<HTMLButtonElement>}
        onClick={handleClick}
      />
    </div>
  );
};
