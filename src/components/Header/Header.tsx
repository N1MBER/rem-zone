import React from 'react';
import { Header as ConstaHeader } from '@consta/uikit/Header';
import { cn } from '../../__private__/utils/bem';
import { HeaderLeftSide } from './HeaderLeftSide/HeaderLeftSide';

import './Header.scss';
import { HeaderRightSide } from './HeaderRightSide/HeaderRightSide';
import { User } from '../../types/user';

type Props = {
  changeVisibleMenu?: () => void;
};

const cnHeader = cn('Header');

const user: User = {
  name: 'Имя Фамилия',
  info: 'Доп. информация',
  status: 'remote',
  userType: 'worker',
};

export const Header = (props: Props) => {
  const { changeVisibleMenu } = props;
  return (
    <ConstaHeader
      style={{
        zIndex: 1000,
      }}
      className={cnHeader()}
      rightSide={
        <HeaderRightSide
          user={user}
          isLogged
          style={{
            zIndex: 1001,
          }}
        />
      }
      leftSide={<HeaderLeftSide changeVisibleMenu={changeVisibleMenu} />}
    />
  );
};
