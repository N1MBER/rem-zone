import React from 'react';
import { TablePage } from '../../common/BaseComponents/TablePage/TablePage';
import { Button } from '@consta/uikit/Button';
import { IconAdd } from '@consta/uikit/IconAdd';
import { useFlag } from '@consta/uikit/useFlag';
import { WorklogsTable } from './WorklogsTable/WorklogsTable';
import { CrudModal } from '../../common/CrudModal/CrudModal';
import { toast } from '../../utils/toast/toast';
import { cn } from '../../__private__/utils/bem';
import { worklogCreate } from './helper';
import {
  getWorklogs,
  addWorklog,
} from '../../utils/api/routes/worklogs/worklogs';
import { getErrorMessage } from '../../utils';

const cnWorklogs = cn('cnWorklogs');

export const Worklogs = () => {
  const [open, setOpen] = useFlag();

  return (
    <>
      <TablePage
        className={cnWorklogs()}
        title="Время работы"
        apiFunction={getWorklogs}
        tableComponent={WorklogsTable}
        titleButton={
          <Button
            label="Зафиксировать время"
            size="s"
            iconLeft={IconAdd}
            onClick={setOpen.on}
          />
        }
      />
      <CrudModal
        mode="create"
        createFunc={addWorklog}
        title="Фиксация времени работы"
        onClose={setOpen.off}
        isOpen={open}
        items={worklogCreate}
        successCallback={() => {
          toast.success('Время работы зафиксирована');
          setTimeout(() => document.location.reload(), 1000);
        }}
        errorCallback={(error) => {
          const message = getErrorMessage(error);
          toast.alert(message ?? 'Не удалось зафиксировать время');
        }}
      />
    </>
  );
};

export default Worklogs;
