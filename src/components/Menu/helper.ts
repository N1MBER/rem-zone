import { LinkType } from './MenuLinks/MenuLinks';
import { IconInComparison } from '@consta/uikit/IconInComparison';
import { IconWorld } from '@consta/uikit/IconWorld';
import { IconUser } from '@consta/uikit/IconUser';
import { IconFunnel } from '@consta/uikit/IconFunnel';
import { IconRUS } from '@consta/uikit/IconRUS';
import { IconTable } from '@consta/uikit/IconTable';
import { UserType } from '../../types/user';
import { resetDateTime } from '../../utils/date/date';

const date = resetDateTime(new Date(), 'start');

const defaultTablePageParams = '?page=1&limit=20';
const defaultSheduleParams = `?mode=week&date=${date.getTime()}`;

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
        link: `/clients${defaultTablePageParams}`,
      },
      {
        label: 'Автомобили',
        icon: IconRUS,
        link: `/auto${defaultTablePageParams}`,
        subMenu: [
          { label: 'Автомобили', link: `/auto${defaultTablePageParams}` },
          { label: 'Марки', link: `/auto/brands${defaultTablePageParams}` },
          { label: 'Модели', link: `/auto/models${defaultTablePageParams}` },
        ],
      },
      {
        label: 'Сотрудники',
        icon: IconUser,
        link: `/staff${defaultTablePageParams}`,
        subMenu: [
          {
            label: 'Сотрудники',
            link: `/staff${defaultTablePageParams}`,
          },
          {
            label: 'Группы',
            link: `/staff/groups${defaultTablePageParams}`,
          },
          {
            label: 'Должности',
            link: `/staff/positions${defaultTablePageParams}`,
          },
          {
            label: 'Время работы',
            link: `/staff/worklogs${defaultTablePageParams}`,
          },
        ],
      },
      {
        label: 'Услуги',
        icon: IconFunnel,
        link: `/favours${defaultTablePageParams}`,
      },
      {
        label: 'Расписание',
        icon: IconTable,
        link: `/timetable${defaultSheduleParams}`,
      },
    ];
  }
  return [
    {
      label: 'Сотрудники',
      icon: IconUser,
      link: `/staff/worklogs${defaultTablePageParams}`,
      subMenu: [
        {
          label: 'Время работы',
          link: `/staff/worklogs${defaultTablePageParams}`,
        },
      ],
    },
    {
      label: 'Автомобили',
      icon: IconRUS,
      link: `/auto${defaultTablePageParams}`,
      subMenu: [
        { label: 'Автомобили', link: `/auto${defaultTablePageParams}` },
        { label: 'Марки', link: `/auto/brands${defaultTablePageParams}` },
        { label: 'Модели', link: `/auto/models${defaultTablePageParams}` },
      ],
    },
    {
      label: 'Расписание',
      icon: IconTable,
      link: `/timetable${defaultSheduleParams}`,
    },
  ];
};
