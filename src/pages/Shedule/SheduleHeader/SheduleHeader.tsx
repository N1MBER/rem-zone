import React from 'react';
import { Text } from '@consta/uikit/Text';
import { Button } from '@consta/uikit/Button';
import { IconAdd } from '@consta/uikit/IconAdd';
import { IconCheck } from '@consta/uikit/IconCheck';
import { Select } from '@consta/uikit/Select';
import { cn } from '../../../__private__/utils/bem';
import { ViewMode } from '../../../types/timetable';

import './SheduleHeader.scss';

type Props = {
  viewMode: ViewMode;
  changeViewMode?: (mode: ViewMode) => void;
  onAddNewTask?: () => void;
  servicePlace?: string[];
  onChangeService?: (service: string) => void;
};

const cnSheduleHeader = cn('SheduleHeader');

export const SheduleHeader = (props: Props) => {
  const {
    viewMode,
    changeViewMode,
    onAddNewTask,
    servicePlace,
    onChangeService,
  } = props;

  return (
    <div className={cnSheduleHeader()}>
      <div className={cnSheduleHeader('Title')}>
        <Text
          size="xl"
          align="left"
          lineHeight="m"
          view="primary"
          weight="bold"
        >
          Расписание
        </Text>
        <Button
          size="xs"
          iconLeft={IconAdd}
          label="Добавить задачу"
          onClick={onAddNewTask}
        />
      </div>
      <Text view="primary" size="xs" align="left" lineHeight="m">
        Параметры отображения
      </Text>
      <div className={cnSheduleHeader('Filters', { short: !servicePlace })}>
        <div className={cnSheduleHeader('Controls')}>
          {servicePlace && (
            <Select
              size="xs"
              placeholder="Сервис"
              items={servicePlace}
              style={{
                zIndex: 10,
              }}
              getItemLabel={(item) => item}
              value={servicePlace[0]}
              dropdownClassName={cnSheduleHeader('SelectDropdown')}
              getItemKey={(item) => item}
              onChange={({ value }) => value && onChangeService?.(value)}
            />
          )}
        </div>
        <div className={cnSheduleHeader('View')}>
          <Button
            label="Месяц"
            size="xs"
            view={viewMode === 'month' ? 'secondary' : 'ghost'}
            onClick={() => changeViewMode?.('month')}
            iconLeft={viewMode === 'month' ? IconCheck : undefined}
          />
          <Button
            label="Неделя"
            size="xs"
            view={viewMode === 'week' ? 'secondary' : 'ghost'}
            onClick={() => changeViewMode?.('week')}
            iconLeft={viewMode === 'week' ? IconCheck : undefined}
          />
          <Button
            label="День"
            size="xs"
            view={viewMode === 'day' ? 'secondary' : 'ghost'}
            onClick={() => changeViewMode?.('day')}
            iconLeft={viewMode === 'day' ? IconCheck : undefined}
          />
        </div>
      </div>
    </div>
  );
};
