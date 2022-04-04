import './AuthForm.scss';

import React from 'react';
import { cn } from '../../../__private__/utils/bem';
import { AuthFormSignIn } from './AuthSignIn/AuthSignIn';

const cnAuthForm = cn('AuthForm');

export const AuthForm: React.FC = () => {
  return (
    <aside className={cnAuthForm()}>
      <img
        className={cnAuthForm('Logo')}
        src="images/Logotype.svg"
        alt="Логотип"
      />
      <AuthFormSignIn className={cnAuthForm('Form')} />
    </aside>
  );
};
