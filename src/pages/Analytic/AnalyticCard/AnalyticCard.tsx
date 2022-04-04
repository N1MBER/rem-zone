import React from 'react';
import { Card } from '@consta/uikit/Card';
import { Text } from '@consta/uikit/Text';
import { IconTeam } from '@consta/uikit/IconTeam';
import { IconWatch } from '@consta/uikit/IconWatch';
import { IconProcessing } from '@consta/uikit/IconProcessing';
import { IconRuler } from '@consta/uikit/IconRuler';
import { IconCalculator } from '@consta/uikit/IconCalculator';
import { cn } from '../../../__private__/utils/bem';

import './AnalyticCard.scss';
import {
  IconComponent,
  IconPropView,
} from '@consta/uikit/__internal__/src/icons/Icon/Icon';

type Props = {
  hours?: number;
  serviceCount?: number;
  newClients?: number;
  sparesCount?: number;
  orderCount?: number;
  total?: number;
};

type Element = {
  icon: IconComponent;
  label: string;
  value: string | number;
  color: IconPropView;
};

const cnAnalyticCard = cn('AnalyticCard');

export const AnalyticCard = (props: Props) => {
  const {
    hours = 0,
    serviceCount = 0,
    newClients = 0,
    sparesCount = 0,
    orderCount = 0,
    total = 0,
  } = props;

  const elements: Element[] = [
    {
      icon: IconWatch,
      label: 'Отработанные часы',
      value: `${hours} Ч`,
      color: 'success',
    },
    {
      icon: IconProcessing,
      label: 'Количество заказов на ремонт',
      value: serviceCount,
      color: 'brand',
    },
    {
      icon: IconRuler,
      label: 'Количество заказов на запчасти',
      value: sparesCount,
      color: 'warning',
    },
    {
      icon: IconTeam,
      label: 'Количество новых клиентов',
      value: `${newClients} чел`,
      color: 'alert',
    },
  ];

  return (
    <Card
      verticalSpace="2xl"
      horizontalSpace="2xl"
      className={cnAnalyticCard()}
    >
      <Text size="xl" lineHeight="m" weight="bold" view="primary">
        Статистика за месяц
      </Text>
      <div className={cnAnalyticCard('Content')}>
        {elements.map((element) => {
          const { icon, color, label, value } = element;
          const Icon = icon;
          return (
            <div className={cnAnalyticCard('Position')}>
              <div className={cnAnalyticCard('Position-Label')}>
                <Icon size="s" view={color} />
                <Text size="s" lineHeight="m" view="primary">
                  {label}
                </Text>
              </div>
              <Text size="m" lineHeight="m" weight="bold" view="primary">
                {value}
              </Text>
            </div>
          );
        })}
        <div className={cnAnalyticCard('Orders')}>
          <Text size="s" lineHeight="m" view="primary">
            Обработанных заказов: <span>{orderCount}</span>
          </Text>
          <IconCalculator size="m" view="brand" />
        </div>
        <div className={cnAnalyticCard('Total')}>
          <Text size="m" lineHeight="m">
            Итоговая выручка за месяц:
          </Text>
          <Text size="2xl" lineHeight="m" weight="bold">
            {total} ₽
          </Text>
        </div>
      </div>
    </Card>
  );
};
