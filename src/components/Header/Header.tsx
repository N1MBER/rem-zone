import React from 'react';
import { Header as ConstaHeader } from '@consta/uikit/Header';
import { cn } from '../../__private__/utils/bem';
import { HeaderLeftSide } from './HeaderLeftSide/HeaderLeftSide';
import { useSelector } from 'react-redux';
import './Header.scss';
import { HeaderRightSide } from './HeaderRightSide/HeaderRightSide';
import { RootState } from '../../store/reducers/index';

type Props = {
  changeVisibleMenu?: () => void;
};

const cnHeader = cn('Header');

export const Header = (props: Props) => {
  const { changeVisibleMenu } = props;

  const user = useSelector((store: RootState) => store.user.profile);

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
