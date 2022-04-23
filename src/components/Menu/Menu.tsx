import React, { useContext, useEffect } from 'react';
import { cn } from '../../__private__/utils/bem';
import { Text } from '@consta/uikit/Text';
import { MenuLinks } from './MenuLinks/MenuLinks';
import { getMenuLinks } from './helper';
import { ThemeContext } from '../App';
import { useLocation } from 'react-router-dom';
import { RootState } from '../../store/reducers';
import { useSelector } from 'react-redux';
import { convertGroupToString } from '../../utils';

import './Menu.scss';

type Props = {
  image?: string;
  view: 'full' | 'short';
};

const cnMenu = cn('Menu');

export const Menu = (props: Props) => {
  const { image, view } = props;
  const { theme } = useContext(ThemeContext);

  const location = useLocation();

  const { userType, profile: user } = useSelector(
    (store: RootState) => store.user
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className={cnMenu({ view, dark: theme !== 'Default' })}>
      <div className={cnMenu('User')}>
        <div className={cnMenu('ImageContainer', { hasImage: !!image })}>
          {image ? (
            <img
              src={image}
              alt={user?.first_name[0]}
              className={cnMenu('Image')}
            />
          ) : (
            <Text size="xl" lineHeight="m" view="brand">
              {`${user?.first_name[0] ?? '???'}`}
            </Text>
          )}
        </div>
        <div className={cnMenu('Info')}>
          <Text size="xl" lineHeight="m" className={cnMenu('Name')}>
            {user?.last_name && user.first_name
              ? `${user?.last_name} ${user?.first_name[0]}.`
              : '???'}
          </Text>
          <Text
            size="m"
            lineHeight="m"
            view="secondary"
            className={cnMenu('Position')}
          >
            {convertGroupToString(user?.groups[0])}
          </Text>
        </div>
      </div>
      <MenuLinks className={cnMenu('Links')} links={getMenuLinks(userType)} />
    </div>
  );
};
