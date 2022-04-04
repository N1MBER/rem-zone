import './Auth.scss';

import React from 'react';
import { cn } from '../../__private__/utils/bem';
import { AuthForm } from './AuthForm/AuthForm';
import { Carousel } from '../../components/Carousel/Carousel';
import { carouselItems } from '../../components/Carousel/__mocks__/mock.data';

const cnAuth = cn('Auth');

export const Auth: React.FC = () => {
  return (
    <main className={cnAuth()}>
      <AuthForm />
      <div className={cnAuth('Carousel')}>
        <Carousel items={carouselItems} />
      </div>
    </main>
  );
};
