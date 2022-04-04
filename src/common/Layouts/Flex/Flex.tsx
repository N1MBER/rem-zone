import React from 'react';
import { cn } from '../../../__private__/utils/bem';
import './Flex.scss';

type AlignItems = 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';

type JustifyContent =
  | 'center'
  | 'start'
  | 'end'
  | 'flex-start'
  | 'flex-end'
  | 'left'
  | 'right'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

type FlexProps = {
  direction?: 'row' | 'column';
  alignItems?: AlignItems;
  justifyContent?: JustifyContent;
  className?: string;
  children?: React.ReactNode;
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
};

const cnFlex = cn('Flex');

export const Flex = (props: FlexProps) => {
  const {
    direction = 'row',
    alignItems = 'flex-start',
    justifyContent = 'flex-start',
    children,
    className,
    flexWrap = 'nowrap',
  } = props;

  return (
    <div
      className={cnFlex({ direction }, [className])}
      style={{
        ['--flex-align-items' as string]: alignItems,
        ['--flex-justify-content' as string]: justifyContent,
        ['--flex-flex-wrap' as string]: flexWrap,
      }}
    >
      {children}
    </div>
  );
};
