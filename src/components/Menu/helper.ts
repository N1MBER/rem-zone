import { LinkType } from './MenuLinks/MenuLinks';
import { IconInComparison } from '@consta/uikit/IconInComparison';
import { IconWorld } from '@consta/uikit/IconWorld';
import { IconUser } from '@consta/uikit/IconUser';
import { IconFunnel } from '@consta/uikit/IconFunnel';
import { IconProcessing } from '@consta/uikit/IconProcessing';
import { IconTable } from '@consta/uikit/IconTable';
import { IconDocFilled } from '@consta/uikit/IconDocFilled';
import { Group } from '../../types/user';

export const getMenuLinks = (
  groups?: Group[],
  superUser?: boolean
): LinkType[] => {
  if ((groups && groups.find((el) => el.id === 1)) || superUser) {
    return [
      {
        label: 'Аналитика',
        icon: IconInComparison,
        link: '/analytic',
      },
      {
        label: 'Клиенты',
        icon: IconWorld,
        link: '/clients',
      },
      {
        label: 'Сотрудники',
        icon: IconUser,
        link: '/staff',
        subMenu: [
          {
            label: 'Сотрудники',
            link: '/staff',
          },
          {
            label: 'Группы',
            link: '/staff/groups',
          },
          {
            label: 'Должности',
            link: '/staff/positions',
          },
          {
            label: 'Время работы',
            link: '/staff/worklogs',
          },
        ],
      },
      {
        label: 'Обслуживание',
        icon: IconFunnel,
        link: '/service',
      },
      {
        label: 'Склад',
        icon: IconProcessing,
        link: '/storage',
      },
      {
        label: 'Расписание',
        icon: IconTable,
        link: '/timetable',
      },
      {
        label: 'Заказ-наряд',
        icon: IconDocFilled,
        link: '/work_order',
      },
    ];
  }
  return [
    {
      label: 'Сотрудники',
      icon: IconUser,
      link: '/staff/worklogs',
      subMenu: [
        {
          label: 'Время работы',
          link: '/staff/worklogs',
        },
      ],
    },
  ];
};
