import React from 'react';
import { Text } from '@consta/uikit/Text';
import {
  generateThemeClassNames,
  ThemeContext,
  useTheme,
} from '@consta/uikit/Theme';
import { CarouselDefaultItem } from '../types';
import { cn } from '../../../__private__/utils/bem';

import './CarouselItem.scss';
import { CarouselNotFound } from '../CarouselNotFound/CarouselNotFound';

type Props = CarouselDefaultItem;

const cnCarouselItem = cn('CarouselItem');

export const CarouselItem = (props: Props) => {
  const { src, onClick, label } = props;
  const { theme } = useTheme();

  const tooltipTheme = {
    ...theme,
    color: {
      primary: theme.color.invert,
      accent: theme.color.accent,
      invert: theme.color.primary,
    },
  };

  const themeClassNames = generateThemeClassNames(tooltipTheme);

  return (
    <ThemeContext.Provider value={{ theme: tooltipTheme, themeClassNames }}>
      {src ? (
        <div className={cnCarouselItem()} onClick={() => onClick?.(props)}>
          <img className={cnCarouselItem('Image')} alt={label} src={src} />
          {label && (
            <div
              className={cnCarouselItem('Overlay', [
                themeClassNames.color.accent,
              ])}
            >
              <Text size="3xl" weight="bold" view="primary">
                {label}
              </Text>
            </div>
          )}
        </div>
      ) : (
        <CarouselNotFound label="Хм, кажется, картинка не загрузилась." />
      )}
    </ThemeContext.Provider>
  );
};
