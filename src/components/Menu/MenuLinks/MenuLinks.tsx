import React, { useEffect, useState } from 'react';
import { PropsWithHTMLAttributes } from '@consta/uikit/__internal__/src/utils/types/PropsWithHTMLAttributes';
import { IconComponent } from '@consta/uikit/__internal__/src/icons/Icon/Icon';
import { NavLink, useLocation } from 'react-router-dom';
import { Text } from '@consta/uikit/Text';
import { cn } from '../../../__private__/utils/bem';

import './MenuLinks.scss';
import { useRefs } from '@consta/uikit/useRefs';

export type Link = {
  label: string;
  icon?: IconComponent;
  link: string;
};

type Props = PropsWithHTMLAttributes<
  {
    children?: never;
    links: Link[];
  },
  HTMLDivElement
>;

const getIcon = (icon: Link['icon']) => {
  if (icon) {
    const Icon = icon;
    return <Icon size="s" />;
  }
  return null;
};

const cnMenuLinks = cn('MenuLinks');

export const MenuLinks: React.FC<Props> = (props) => {
  const { className, links } = props;
  const [linePosition, setLinePosition] = useState<number>(0);

  const location = useLocation();

  useEffect(() => {
    const currentLink = links.find((link) =>
      link.link.includes(location.pathname)
    );
    if (currentLink) {
      const index = links.indexOf(currentLink);
      if (refs[index].current) {
        setLinePosition(refs[index].current?.offsetTop ?? 0);
      }
    }
  }, [location.pathname, location.search]);

  const refs = useRefs<HTMLAnchorElement>(links.length);

  return (
    <ul className={cnMenuLinks(null, [className])}>
      {links.map((link, index) => (
        <NavLink
          ref={refs[index]}
          className={(isActive) => cnMenuLinks('Link', { active: isActive })}
          to={link.link}
          key={cnMenuLinks(`Link-${index}`)}
        >
          {getIcon(link.icon)}
          <Text align="left" weight="bold" lineHeight="m" size="m">
            {link.label}
          </Text>
        </NavLink>
      ))}
      <span
        className={cnMenuLinks('Line')}
        style={{ ['--menu-line-top' as string]: `${linePosition}px` }}
      />
    </ul>
  );
};
