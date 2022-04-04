import React from 'react';
import { PropsWithHTMLAttributes } from '@consta/uikit/__internal__/src/utils/types/PropsWithHTMLAttributes';
import { cn } from '../../../__private__/utils/bem';
import { Header } from '../../../components/Header/Header';
import { useFlag } from '@consta/uikit/useFlag';
import { Menu } from '../../../components/Menu/Menu';
import { useWindowDimension } from '../../../hooks/useWindowDimension/useWindowDimension';

import './PageLayout.scss';
import { PageLayoutError } from './PageLayoutError/PageLayoutError';

type Props = PropsWithHTMLAttributes<
  {
    error?: boolean;
    isAdmin?: boolean;
  },
  HTMLDivElement
>;

const cnPageLayout = cn('PageLayout');

export const PageLayout = (props: Props) => {
  const { className, children, error } = props;

  const [fullMenu, { on, off }] = useFlag(true);

  const changeViewMenu = () => {
    if (fullMenu) off();
    else on();
  };

  const { height } = useWindowDimension();

  return (
    <main className={cnPageLayout(null, [className])}>
      <Header changeVisibleMenu={changeViewMenu} />
      <div
        className={cnPageLayout('Content', { error })}
        style={{
          ['--menu-height' as string]: `${height - 60}px`,
        }}
      >
        <Menu view={fullMenu ? 'full' : 'short'} />
        {error ? <PageLayoutError /> : children}
      </div>
    </main>
  );
};
