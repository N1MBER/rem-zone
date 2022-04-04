import React from 'react';
import { Button } from '@consta/uikit/Button';
import { IconHamburger } from '@consta/uikit/IconHamburger';
import { cn } from '../../../__private__/utils/bem';
import { HeaderLogo, HeaderModule } from '@consta/uikit/Header';
import { Logotype } from '../../Logotype/Logotype';

import './HeaderLeftSide.scss';

type Props = {
  changeVisibleMenu?: () => void;
};

const cnHeaderLeftSide = cn('HeaderLeftSide');

export const HeaderLeftSide = (props: Props) => {
  const { changeVisibleMenu } = props;
  return (
    <HeaderModule className={cnHeaderLeftSide()}>
      <Button
        onlyIcon
        iconLeft={IconHamburger}
        size="s"
        view="clear"
        onClick={changeVisibleMenu}
        className={cnHeaderLeftSide('Button')}
      />
      <HeaderLogo>
        <Logotype />
      </HeaderLogo>
    </HeaderModule>
  );
};
