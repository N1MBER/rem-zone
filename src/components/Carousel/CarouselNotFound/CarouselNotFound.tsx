import React from 'react';
import { Text } from '@consta/uikit/Text';
import { cn } from '../../../__private__/utils/bem';

import './CarouselNotFound.scss';
import { NotFound } from '../../Icons/NotFound/NotFound';

type Props = {
  label: string;
};

const cnCarouselNotFound = cn('CarouselNotFound');

export const CarouselNotFound = (props: Props) => {
  return (
    <div className={cnCarouselNotFound()}>
      <div className={cnCarouselNotFound('ImageContainer')}>
        <NotFound />
      </div>
      <Text
        align="center"
        size="s"
        view="ghost"
        className={cnCarouselNotFound('Label')}
      >
        {props.label}
      </Text>
    </div>
  );
};
