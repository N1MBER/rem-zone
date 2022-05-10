import React, { useEffect, useRef, useState } from 'react';
import { Job } from '../../../../types/timetable';
import { NotificationsList } from '@consta/header/NotificationsList';
import moment from 'moment';
import { convertStatus } from '../../../BigCalendar/helper';
import { IconCards } from '@consta/uikit/IconCards';
import { Button } from '@consta/uikit/Button';
import { getStartDate } from '../../../../pages/Shedule/helper';
import { getJobs } from '../../../../utils/api/routes/jobs/jobs';
import { useFlag } from '@consta/uikit/useFlag';
import { Popover, Direction } from '@consta/uikit/Popover';
import { Loader } from '@consta/uikit/Loader';
import { cn } from '../../../../__private__/utils/bem';
import { cnMixPopoverArrow } from '@consta/uikit/MixPopoverArrow';

import './HeaderNotifications.scss';

const cnHeaderNotifications = cn('HeaderNotifications');

const currentDate = getStartDate('week', new Date());

export const HeaderNotifications = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [showNotifications, setShowNotifications] = useFlag();
  const [loading, setLoading] = useFlag();
  const [direction, setDirection] = useState<Direction | undefined>(undefined);

  useEffect(() => {
    if (showNotifications) {
      setLoading.on();
      getJobs({
        offset: 0,
        limit: 20,
        start: currentDate[0].toISOString(),
        end: currentDate[1].toISOString(),
      })
        .then((res) => {
          const { results } = res.data;
          if (Array.isArray(results)) {
            setJobs(results);
          }
          setLoading.off();
        })
        .catch(() => {
          setLoading.off();
        });
    }
  }, [showNotifications]);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const getItemLabel = (item: Job): string => {
    return `Задача на ${moment(item.started_at).format('DD.MM HH:mm')}`;
  };

  return (
    <>
      <Button
        className={cnHeaderNotifications('Button')}
        onlyIcon
        iconLeft={IconCards}
        view="clear"
        size="s"
        onClick={setShowNotifications.toogle}
        ref={buttonRef}
      />
      {showNotifications && (
        <Popover
          onClickOutside={setShowNotifications.off}
          className={cnHeaderNotifications()}
          anchorRef={buttonRef}
          direction="downLeft"
          onSetDirection={setDirection}
          offset="xl"
        >
          <div
            className={cnHeaderNotifications('Arrow', [
              cnMixPopoverArrow({ direction }),
            ])}
          />
          {loading ? (
            <Loader size="s" />
          ) : (
            <NotificationsList
              items={jobs}
              className={cnHeaderNotifications('List')}
              title="Список задач на неделю"
              getItemLabel={getItemLabel}
              getItemDescription={(item) => item.description}
              getItemDate={(item) => new Date(item.started_at)}
              getItemBadges={(item) => [
                {
                  label: item.status,
                  status: convertStatus(item.status),
                },
              ]}
            />
          )}
        </Popover>
      )}
    </>
  );
};
