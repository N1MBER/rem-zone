import { useEffect, useState } from 'react';

type Result = {
  width: number;
  height: number;
};

export const getWindowDimensions = (): Result => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

export const useWindowDimension = (): Result => {
  const [windowDimensions, setWindowDimensions] = useState<Result>(
    getWindowDimensions()
  );

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowDimensions(getWindowDimensions());
    });
  }, []);

  return windowDimensions;
};
