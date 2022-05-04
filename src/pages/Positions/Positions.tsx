import React from 'react';
import { TablePage } from '../../common/BaseComponents/TablePage/TablePage';
import { Button } from '@consta/uikit/Button';
import { IconAdd } from '@consta/uikit/IconAdd';
import { useFlag } from '@consta/uikit/useFlag';
import { PositionsTable } from './PositionsTable/PositionsTable';
import { CrudModal } from '../../common/CrudModal/CrudModal';
import { toast } from '../../utils/toast/toast';
import { cn } from '../../__private__/utils/bem';
import { positionCreate } from './helper';
import {
  getPositions,
  addPosition,
} from '../../utils/api/routes/positions/positions';

const cnPositions = cn('Positions');

export const Positions = () => {
  const [open, setOpen] = useFlag();

  return (
    <>
      <TablePage
        className={cnPositions()}
        title="Должности"
        apiFunction={getPositions}
        tableComponent={PositionsTable}
        titleButton={
          <Button
            label="Добавить должность"
            size="s"
            iconLeft={IconAdd}
            onClick={setOpen.on}
          />
        }
      />
      <CrudModal
        mode="create"
        createFunc={addPosition}
        title="Создание новой должности"
        onClose={setOpen.off}
        isOpen={open}
        items={positionCreate}
        successCallback={() => {
          toast.success('Должность успешно создана');
          setTimeout(() => document.location.reload(), 1000);
        }}
        errorCallback={() => {
          toast.alert('Не удалось создать должность');
        }}
      />
    </>
  );
};

export default Positions;
