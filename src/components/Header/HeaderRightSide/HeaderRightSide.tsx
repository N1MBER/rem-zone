import React, { CSSProperties, useContext, useRef } from 'react';
import { IconCards } from '@consta/uikit/IconCards';
import { Button } from '@consta/uikit/Button';
import { ThemeToggler } from '@consta/uikit/ThemeToggler';
import { HeaderLogin, HeaderModule } from '@consta/uikit/Header';
import { ContextMenu } from '@consta/uikit/ContextMenuCanary';
import { cn } from '../../../__private__/utils/bem';
import { ThemeName, themes } from '../../../types/theme';
import { User } from '../../../types/user';
import { useFlag } from '@consta/uikit/useFlag';
import { IconComponent } from '@consta/uikit/__internal__/src/icons/Icon/Icon';
import { getDataOfTheme } from './helper';
import { ThemeContext } from '../../App';
import { IconExit } from '@consta/uikit/IconExit';

import './HeaderRightSide.scss';
import { HeaderCalendar } from './HeaderCalendar/HeaderCalendar';

type Props = {
  isMinified?: boolean;
  isLogged?: boolean;
  user?: User;
  style?: CSSProperties;
};

type Item = {
  name: string;
  icon?: IconComponent;
  onClick?: () => void;
};

const getUserData = (user?: User): User => {
  return {
    avatar: user?.avatar ?? undefined,
    name: user?.name ?? '',
    info: user?.info ?? '',
    userType: 'worker',
  };
};

const cnHeaderRightSide = cn('HeaderRightSide');

export const HeaderRightSide = (props: Props) => {
  const { user, isLogged, isMinified, style } = props;

  const { avatar, name, info, status } = getUserData(user);

  const [showContextMenu, { on, off }] = useFlag(false);

  const loginRef = useRef<HTMLButtonElement>(null);

  const menuItems: Item[] = [
    {
      name: 'Выход',
      icon: IconExit,
    },
  ];

  const handleClick = () => {
    if (showContextMenu) {
      off();
    } else {
      on();
    }
  };

  const onContextMenuClick = (item: Item) => {
    if (!item.onClick) {
      off();
    }
    off();
  };

  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <>
      <HeaderModule indent="s" className={cnHeaderRightSide()}>
        <HeaderCalendar />
      </HeaderModule>
      <HeaderModule indent="s">
        <ThemeToggler
          size="s"
          items={themes}
          value={theme}
          onChange={({ value }) => setTheme(value as ThemeName)}
          getItemIcon={(item) => getDataOfTheme(item as ThemeName).icon}
          getItemLabel={(item) => getDataOfTheme(item as ThemeName).label}
          getItemKey={(item) => getDataOfTheme(item as ThemeName).label}
        />
      </HeaderModule>
      <HeaderModule indent="s">
        <Button
          onlyIcon
          iconLeft={IconCards}
          view="clear"
          size="s"
          onClick={handleClick}
        />
      </HeaderModule>
      <HeaderModule indent="s">
        <HeaderLogin
          ref={loginRef}
          isLogged={isLogged}
          personName={name || 'Михаил Зерно'}
          personStatus={status || 'available'}
          personInfo={info}
          personAvatarUrl={avatar || undefined}
          isMinified={isMinified}
          onClick={handleClick}
        />
      </HeaderModule>
      <ContextMenu
        isOpen={showContextMenu}
        onClickOutside={off}
        anchorRef={loginRef}
        items={menuItems}
        offset={16}
        size="s"
        getItemLabel={(item) => item.name}
        getItemLeftIcon={(item) => item.icon}
        direction="downStartRight"
        style={{
          zIndex: style?.zIndex ? Number(style.zIndex) + 1 : 1,
        }}
        onItemClick={({ item }) => onContextMenuClick(item)}
      />
    </>
  );
};
