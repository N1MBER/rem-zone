import React from 'react';
import { cn } from '../../__private__/utils/bem';
import { Card } from '@consta/uikit/Card';
import { Text } from '@consta/uikit/Text';
import { ADDRESS, PHONE_NUMBER, workTime } from './helper';

import './AboutUs.scss';

const cnAboutUs = cn('AboutUs');

export const AboutUs = () => {
  return (
    <Card className={cnAboutUs()} verticalSpace="2xl" horizontalSpace="2xl">
      <Text size="3xl" lineHeight="m" view="primary" weight="bold">
        О нас
      </Text>
      <div className={cnAboutUs('Container')}>
        <Text size="l" lineHeight="s" view="primary" weight="bold">
          Время работы
        </Text>
        <ul className={cnAboutUs('Worktime')}>
          {Object.keys(workTime).map((key) => {
            return (
              <li className={cnAboutUs('Worktime-Item')}>
                <Text size="s" lineHeight="s" view="primary">
                  <b>{workTime[key].label}</b>{' '}
                  {`${workTime[key].start} - ${workTime[key].end}`}
                </Text>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={cnAboutUs('Container')}>
        <Text size="l" lineHeight="s" view="primary" weight="bold">
          Номер телефона
        </Text>
        <Text
          size="s"
          lineHeight="s"
          view="primary"
          as="a"
          href={`tel: ${PHONE_NUMBER}`}
        >
          {PHONE_NUMBER}
        </Text>
      </div>
      <div className={cnAboutUs('Container')}>
        <Text size="l" lineHeight="s" view="primary" weight="bold">
          Адрес
        </Text>
        <Text
          size="s"
          lineHeight="s"
          view="primary"
          as="a"
          target="_blank"
          href={`https://google.com/search?q=${ADDRESS}`}
        >
          {ADDRESS}
        </Text>
      </div>
    </Card>
  );
};
