import React, { useContext, useEffect } from 'react';
import { cn } from '../../__private__/utils/bem';
import { Text } from '@consta/uikit/Text';
import { MenuLinks } from './MenuLinks/MenuLinks';
import { menuLinks } from './helper';
import { ThemeContext } from '../App';
import { useLocation } from 'react-router-dom';

import './Menu.scss';

type Props = {
  name?: string;
  position?: string;
  image?: string;
  view: 'full' | 'short';
};

const cnMenu = cn('Menu');

export const Menu = (props: Props) => {
  const { name = 'Имя', position = 'Должность', image, view } = props;
  const { theme } = useContext(ThemeContext);

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className={cnMenu({ view, dark: theme !== 'Default' })}>
      <div className={cnMenu('User')}>
        <div className={cnMenu('ImageContainer', { hasImage: !!image })}>
          {image ? (
            <img src={image} alt={position} className={cnMenu('Image')} />
          ) : (
            <Text size="xl" lineHeight="m" view="brand">
              {name[0]}
            </Text>
          )}
        </div>
        <div className={cnMenu('Info')}>
          <Text size="xl" lineHeight="m" className={cnMenu('Name')}>
            {name}
          </Text>
          <Text
            size="m"
            lineHeight="m"
            view="secondary"
            className={cnMenu('Position')}
          >
            {position}
          </Text>
        </div>
      </div>
      <MenuLinks className={cnMenu('Links')} links={menuLinks} />
    </div>
  );
};
