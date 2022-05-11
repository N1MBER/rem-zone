import React, { useState } from 'react';
import { BaseModal } from '../../../common/BaseComponents/BaseModal/BaseModal';
import { cn } from '../../../__private__/utils/bem';
import { BigCalendarModalProps, jobEdit, jobView } from './helper';
import { ChoiceGroup } from '@consta/uikit/ChoiceGroup';
import { CrudModalUpdate } from '../../../common/CrudModal/CrudModalUpdate/CrudModalUpdate';
import { CrudModalView } from '../../../common/CrudModal/CrudModalView/CrudModalView';
import { getJob, updateJob } from '../../../utils/api/routes/jobs/jobs';
import { CrudModalProps } from '../../../common/CrudModal/types';
import { Job } from '../../../types/timetable';
import { CustomJob } from '../../../pages/Shedule/helper';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducers';

import './BigCalendarModal.scss';

const cnBigCalendarModal = cn('BigCalendarModal');

type ChoiceItem = {
  label: string;
  type: 'edit' | 'view';
  disabled?: boolean;
};

const convertJob = (job: Job): CustomJob => {
  return {
    favour: job.favour,
    description: job.description,
    date: [new Date(job.started_at), new Date(job.ended_at)],
    master: `${job.master.last_name} ${job.master.first_name[0]}.`,
  };
};

export const BigCalendarModal = (props: BigCalendarModalProps) => {
  const { isOpen, onClose, item } = props;

  const { userType } = useSelector((store: RootState) => store.user);

  const choiceItems: ChoiceItem[] = [
    {
      label: 'Просмотр',
      type: 'view',
    },
    {
      label: 'Изменение',
      type: 'edit',
      disabled: userType === 'master-executor',
    },
  ];

  const [type, setType] = useState<ChoiceItem>(choiceItems[0]);

  const update = (data: CustomJob, id: string) => {
    const { description, favour, date } = data;
    return updateJob(
      {
        description,
        favour,
        started_at: date[0].toISOString(),
        ended_at: date[1].toISOString(),
      },
      id
    );
  };

  return (
    <BaseModal
      className={cnBigCalendarModal()}
      onClose={onClose}
      withCloseButton
      isOpen={isOpen}
      title=" "
      lockBackground
    >
      <div className={cnBigCalendarModal('Container')}>
        <ChoiceGroup
          items={choiceItems}
          onChange={({ value }) => setType(value)}
          size="m"
          view="primary"
          multiple={false}
          name="ChoiceGroupType"
          width="full"
          value={type}
          getDisabled={(item) => item.disabled}
          getLabel={(item) => item.label}
        />
        {type.type === 'edit' ? (
          <CrudModalUpdate
            items={jobEdit}
            updateFunc={
              // @ts-ignore
              update as CrudModalProps<'edit', CustomJob>['updateFunc']
            }
            itemId={item.resource.id}
            element={convertJob(item.resource)}
          />
        ) : (
          <CrudModalView
            itemId={item.resource.id}
            viewFunc={getJob}
            items={jobView}
          />
        )}
      </div>
    </BaseModal>
  );
};
