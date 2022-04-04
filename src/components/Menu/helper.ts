import { Link } from './MenuLinks/MenuLinks';
import { IconInComparison } from '@consta/uikit/IconInComparison';
import { IconWorld } from '@consta/uikit/IconWorld';
import { IconUser } from '@consta/uikit/IconUser';
import { IconFunnel } from '@consta/uikit/IconFunnel';
import { IconProcessing } from '@consta/uikit/IconProcessing';
import { IconTable } from '@consta/uikit/IconTable';
import { IconDocFilled } from '@consta/uikit/IconDocFilled';

export const menuLinks: Link[] = [
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
