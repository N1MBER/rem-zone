import { useRefs } from '@consta/uikit/useRefs';
import React from 'react';

export function useFormControlsFocus(controlsLength: number) {
  const refs = useRefs<HTMLInputElement | HTMLButtonElement>(controlsLength);

  const onKeyPress = (e: React.KeyboardEvent, index: number) => {
    const ref = refs[index].current;
    if (e.key === 'Enter' && ref) {
      e.preventDefault();
      ref?.[index !== controlsLength - 1 ? 'click' : 'focus']();
    }
  };

  return {
    refs,
    onKeyPress,
  };
}
