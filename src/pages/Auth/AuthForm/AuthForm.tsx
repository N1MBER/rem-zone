import './AuthForm.scss';

import React, { useState } from 'react';
import { cn } from '../../../__private__/utils/bem';
import { AuthFormSignIn, SignInData } from './AuthSignIn/AuthSignIn';
import { login } from '../../../store/reducers/user/user';
import { useHistory } from 'react-router-dom';
import { PageLoader } from '../../../components/PageLoader/PageLoader';
import { toast } from '../../../utils/toast/toast';
import { useDispatch } from 'react-redux';

const cnAuthForm = cn('AuthForm');

export const AuthForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const history = useHistory();

  const dispatch = useDispatch();

  const signIn = (data: Required<SignInData>) => {
    setErrorMessage(undefined);
    dispatch(
      login({
        ...data,
        setLoading,
        successCallback: (data) =>
          history.push(
            data?.groups[0].id === 2 ? '/staff/worklogs' : '/analytic'
          ),
        errorCallback: (message) => {
          setErrorMessage(message);
          toast.alert(message);
        },
      })
    );
  };

  return (
    <aside className={cnAuthForm()}>
      <img
        className={cnAuthForm('Logo')}
        src="images/Logotype.svg"
        alt="Логотип"
      />
      <AuthFormSignIn
        className={cnAuthForm('Form')}
        onSubmit={({ data }) => signIn(data)}
        error={errorMessage}
      />
      {loading && <PageLoader />}
    </aside>
  );
};
