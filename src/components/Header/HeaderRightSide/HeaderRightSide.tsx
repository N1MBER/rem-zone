import React, { CSSProperties, useContext, useMemo, useRef } from 'react';

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
import { IconLock } from '@consta/uikit/IconLock';
import { HeaderCalendar } from './HeaderCalendar/HeaderCalendar';
import { useHistory } from 'react-router-dom';
import { logout as logoutFunc } from '../../../utils/api/routes/auth/auth';
import { logout as logoutStore } from '../../../store/reducers/user/user';
import { useDispatch } from 'react-redux';

import './HeaderRightSide.scss';
import { HeaderNotifications } from './HeaderNotifications/HeaderNotifications';
import { ChangePasswordModal } from '../ChangePasswordModal/ChangePasswordModal';

type Props = {
  isMinified?: boolean;
  isLogged?: boolean;
  user?: User;
  style?: CSSProperties;
};

type Item = {
  name: string;
  icon?: IconComponent;
  type?: string;
  onClick?: () => void;
};

const cnHeaderRightSide = cn('HeaderRightSide');

export const HeaderRightSide = (props: Props) => {
  const { user, isLogged, isMinified, style } = props;

  const [showContextMenu, { on, off }] = useFlag(false);
  const [showModal, setShowModal] = useFlag();

  const loginRef = useRef<HTMLButtonElement>(null);

  const history = useHistory();

  const dispatch = useDispatch();

  const logout = async () => {
    history.push('/auth');
    dispatch(logoutStore());
    await logoutFunc();
  };

  const menuItems: Item[] = useMemo(() => {
    const arr: Item[] = [
      {
        name: 'Выход',
        icon: IconExit,
        onClick: logout,
      },
    ];
    if (!user?.is_superuser) {
      arr.unshift({
        name: 'Сменить пароль',
        icon: IconLock,
        onClick: setShowModal.on,
      });
    }
    return arr;
  }, [user]);

  const handleClick = () => {
    if (showContextMenu) {
      off();
    } else {
      on();
    }
  };

  const onContextMenuClick = (item: Item) => {
    if (item.onClick) {
      item?.onClick();
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
        <HeaderNotifications />
      </HeaderModule>
      <HeaderModule indent="s">
        <HeaderLogin
          ref={loginRef}
          isLogged={isLogged}
          personName={
            user?.last_name
              ? `${user?.last_name} ${user?.first_name[0]}.`
              : '???'
          }
          personStatus="available"
          personInfo={user?.email}
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
        getItemOnClick={(item) => item.onClick}
        onItemClick={({ item }) => onContextMenuClick(item)}
      />
      <ChangePasswordModal isOpen={showModal} onClose={setShowModal.off} />
    </>
  );
};
