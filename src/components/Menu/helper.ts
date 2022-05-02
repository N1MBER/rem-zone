import { LinkType } from './MenuLinks/MenuLinks';
import { IconInComparison } from '@consta/uikit/IconInComparison';
import { IconWorld } from '@consta/uikit/IconWorld';
import { IconUser } from '@consta/uikit/IconUser';
import { IconFunnel } from '@consta/uikit/IconFunnel';
import { IconTable } from '@consta/uikit/IconTable';
import { UserType } from '../../types/user';

export const getMenuLinks = (userType?: UserType): LinkType[] => {
  if (userType !== 'master-executor') {
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
        label: 'Услуги',
        icon: IconFunnel,
        link: '/favours',
      },
      {
        label: 'Расписание',
        icon: IconTable,
        link: '/timetable',
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
    {
      label: 'Расписание',
      icon: IconTable,
      link: '/timetable',
    },
  ];
};
