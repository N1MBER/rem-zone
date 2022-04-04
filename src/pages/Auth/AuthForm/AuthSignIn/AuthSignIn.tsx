import './AuthFormSignIn.scss';

import React, { useState } from 'react';
import { Button } from '@consta/uikit/Button';
import { Text } from '@consta/uikit/Text';
import { TextField, TextFieldPropOnChange } from '@consta/uikit/TextField';
import { PropsWithHTMLAttributes } from '../../../../__private__/utils/types/PropsWithHTMLAttributes';
import { cn } from '../../../../__private__/utils/bem';
import { useFormControlsFocus } from '../../../../hooks/useFormControlsFocus/useFormControlsFocus';

const cnAuthFormSignIn = cn('AuthFormSignIn');

type SignInData = {
  email?: string;
  password?: string;
};

type Props = PropsWithHTMLAttributes<
  {
    onSubmit?: (value: { e: React.MouseEvent; data: SignInData }) => void;
  },
  HTMLDivElement
>;

export const AuthFormSignIn = (props: Props) => {
  const { onSubmit, className } = props;
  const [data, setData] = useState<SignInData>({});

  const handleClick = (e: React.MouseEvent) => {
    onSubmit?.({
      e,
      data,
    });
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
        type="email"
        name="email"
        value={data.email}
        autoFocus
        width="full"
        size="m"
        ref={refs[0]}
        onKeyPress={(e) => onKeyPress(e, 1)}
        placeholder="Email"
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
