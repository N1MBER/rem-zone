import React, { useEffect, useState } from 'react';

type Result = {
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  width?: number;
  height?: number;
};

const convertPxToNumber = (pixels: string) => Number(pixels.split('px')[0]);

export function useRefSizes<ITEM extends HTMLElement>(
  ref?: React.RefObject<ITEM>
): Result {
  const [sizes, setSizes] = useState<Result>({});

  useEffect(() => {
    if (ref && ref.current) {
      const styles = window.getComputedStyle(ref.current);
      setSizes({
        paddingTop: convertPxToNumber(styles.paddingTop),
        paddingBottom: convertPxToNumber(styles.paddingBottom),
        paddingLeft: convertPxToNumber(styles.paddingLeft),
        paddingRight: convertPxToNumber(styles.paddingRight),
        marginBottom: convertPxToNumber(styles.marginBottom),
        marginLeft: convertPxToNumber(styles.marginLeft),
        marginRight: convertPxToNumber(styles.marginRight),
        marginTop: convertPxToNumber(styles.marginTop),
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight,
      });
    }
  }, [ref]);

  return sizes;
}
