import React, { useEffect, useRef, useState } from 'react';
import { PropsWithHTMLAttributes } from '@consta/uikit/__internal__/src/utils/types/PropsWithHTMLAttributes';
import { IconComponent } from '@consta/uikit/__internal__/src/icons/Icon/Icon';
import { NavLink, useLocation } from 'react-router-dom';
import { Text } from '@consta/uikit/Text';
import { Button } from '@consta/uikit/Button';
import { cn } from '../../../__private__/utils/bem';
import { useRefs } from '@consta/uikit/useRefs';
import { useFlag } from '@consta/uikit/useFlag';
import { IconArrowDown } from '@consta/uikit/IconArrowDown';
import { useComponentSize } from '@consta/uikit/useComponentSize';

import './MenuLinks.scss';

export type LinkType = {
  label: string;
  icon?: IconComponent;
  link: string;
  subMenu?: LinkType[];
};

type Props = PropsWithHTMLAttributes<
  {
    children?: never;
    links: LinkType[];
  },
  HTMLDivElement
>;

const getIcon = (icon: LinkType['icon']) => {
  if (icon) {
    const Icon = icon;
    return <Icon size="s" />;
  }
  return null;
};

const cnMenuLinks = cn('MenuLinks');

const Menu = (props: {
  link: LinkType;
  linkRef: React.RefObject<HTMLAnchorElement>;
}) => {
  const { link, linkRef } = props;
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [open, setOpen] = useFlag();
  const [active, setActive] = useFlag();

  const location = useLocation();

  useEffect(() => {
    setActive[
      location.pathname.includes(link.link.split('?')[0]) ? 'on' : 'off'
    ]();
  }, [location.pathname]);

  return (
    <div className={cnMenuLinks('LinkContainer')}>
      <div className={cnMenuLinks('Link', { active })}>
        <NavLink
          ref={linkRef}
          className={cnMenuLinks('Link-Item')}
          to={link.link}
        >
          {getIcon(link.icon)}
          <Text align="left" weight="bold" lineHeight="m" size="m">
            {link.label}
          </Text>
        </NavLink>
        {Array.isArray(link.subMenu) && (
          <Button
            size="s"
            onlyIcon
            ref={buttonRef}
            iconLeft={IconArrowDown}
            onClick={setOpen.toogle}
            view="clear"
            className={cnMenuLinks('LinkButton', { active: open })}
          />
        )}
      </div>
      {link.subMenu && (
        <div
          className={cnMenuLinks('SubMenu')}
          style={{
            ['--menu-link-height' as string]: `${
              open ? link.subMenu?.length * 40 : 0
            }px`,
          }}
        >
          {link.subMenu.map((item) => {
            return (
              <NavLink
                key={`${cnMenuLinks()}-${item.link}`}
                to={item.link}
                className={cnMenuLinks('SubMenu-Item', {
                  active:
                    location.pathname.split('?')[0] === item.link.split('?')[0],
                })}
              >
                <Text align="left" weight="bold" lineHeight="m" size="m">
                  {item.label}
                </Text>
              </NavLink>
            );
          })}
        </div>
      )}
    </div>
  );
};

export const MenuLinks: React.FC<Props> = (props) => {
  const { className, links } = props;
  const [linePosition, setLinePosition] = useState<number>(0);

  const location = useLocation();

  const refs = useRefs<HTMLAnchorElement>(links.length);
  const containerRef = useRef<HTMLDivElement>(null);

  const size = useComponentSize(containerRef);

  const defineLinePosition = () => {
    const currentLink = links.find((link) => {
      return (
        link.link.includes(location.pathname) ||
        link.subMenu?.find((el) => el.link.includes(location.pathname))
      );
    });
    if (currentLink) {
      const index = links.indexOf(currentLink);
      if (refs[index].current) {
        setLinePosition(refs[index].current?.offsetTop ?? 0);
      }
    } else {
      setLinePosition(-1);
    }
  };

  useEffect(() => {
    defineLinePosition();
  }, [location.pathname, location.search, size.height]);

  return (
    <div className={cnMenuLinks(null, [className])} ref={containerRef}>
      {links.map((link, index) => (
        <Menu
          key={cnMenuLinks(`Link-${index}`)}
          linkRef={refs[index]}
          link={link}
        />
      ))}
      <span
        className={cnMenuLinks('Line')}
        style={{
          ['--menu-line-top' as string]: `${linePosition}px`,
          ['--menu-line-left' as string]: `${linePosition < 0 ? -5 : 0}px`,
        }}
      />
    </div>
  );
};
