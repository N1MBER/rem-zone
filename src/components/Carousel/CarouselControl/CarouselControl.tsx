import React from 'react';
import { cn } from '../../../__private__/utils/bem';
import { cnMixFocus } from '@consta/uikit/MixFocus';
import './CarouselControl.scss';

type Props = {
  length: number;
  onClick?: (id: number) => void;
  className?: string;
};

const cnCarouselControl = cn('CarouselControl');

export const CarouselControl = (props: Props) => {
  const { length, onClick, className } = props;
  return (
    <div className={cnCarouselControl(null, [className])}>
      {Array.from({ length }, (x) => x).map((_item, index) => {
        return (
          <button
            className={cnCarouselControl('Button', [cnMixFocus()])}
            type="button"
            onClick={() => onClick?.(index)}
          />
        );
      })}
    </div>
  );
};
