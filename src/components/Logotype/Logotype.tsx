import React from 'react';
import { cn } from '../../__private__/utils/bem';

import './Logotype.scss';

const cnLogotype = cn('Logotype');

export const Logotype = () => {
  return (
    <img src="images/Logotype.svg" alt="Логотип" className={cnLogotype()} />
  );
};
