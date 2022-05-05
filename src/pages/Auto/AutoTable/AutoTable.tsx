import React, { useState } from 'react';
import { TableColumn } from '@consta/uikit/Table';
import { Button } from '@consta/uikit/Button';
import { IconDocFilled } from '@consta/uikit/IconDocFilled';
import { IconEdit } from '@consta/uikit/IconEdit';
import { IconTrash } from '@consta/uikit/IconTrash';
import { BaseTable } from '../../../common/BaseComponents/BaseTable/BaseTable';
import {
  deleteCar as deleteCarFunc,
  getCar,
  updateCar,
} from '../../../utils/api/routes/cars/cars';
import { toast } from '../../../utils/toast/toast';
import { cn } from '../../../__private__/utils/bem';
import { ModalCrudType } from '../../../types/setings';
import { useFlag } from '@consta/uikit/useFlag';
import { CrudModal } from '../../../common/CrudModal/CrudModal';
import { autoUpdate, autoView } from '../helper';
import { Auto } from '../../../types/auto';
import moment from 'moment';
import { UpdateAuto } from '../../../utils/api/routes/cars/types';

import './AutoTable.scss';

type Props = {
  data: Auto[];
};

const cnAutoTable = cn('AutoTable');

const convertAuto = (auto: Auto | undefined): UpdateAuto | undefined =>
  auto
    ? {
        vin: auto.vin,
        plate_number: auto.plate_number,
        release_date: auto.release_date,
        power: auto.power,
        engine_size: auto.engine_size,
        color_code: auto.color_code,
        mileage: auto.mileage,
      }
    : undefined;

export const AutoTable = (props: Props) => {
  const { data } = props;

  const [modalType, setModalType] = useState<ModalCrudType | undefined>();
  const [showModal, setShowModal] = useFlag();
  const [auto, setAuto] = useState<Auto | undefined>();

  const deleteVehicle = (id: string) => {
    deleteCarFunc(id).then((res) => {
      if (res.status === 204) {
        toast.success('Клиент успешно удален');
        setTimeout(() => document.location.reload(), 1000);
      } else {
        toast.alert(res.data.detail);
      }
    });
  };

  const columns: Array<TableColumn<Auto>> = [
    {
      title: 'Модель автомобиля',
      accessor: 'model',
      renderCell: ({ model }) => `${model.name} ${model.brand.name}`,
    },
    {
      title: 'VIN',
      accessor: 'vin',
    },
    {
      title: 'Номер автомобиля',
      accessor: 'plate_number',
    },
    {
      title: 'Мощность л. с.',
      accessor: 'power',
    },
    {
      title: 'Объем двигателя л.',
      accessor: 'engine_size',
    },
    {
      title: 'Дата регистрации',
      accessor: 'release_date',
      renderCell: ({ release_date }) =>
        moment(release_date).format('DD.MM.YYYY HH:mm'),
    },
    {
      title: '',
      accessor: 'id',
      renderCell: (row) => {
        const onClick = (type: 'edit' | 'view') => {
          setModalType(type);
          setAuto(row);
          setShowModal.on();
        };
        return (
          <div className={cnAutoTable('Controls')}>
            <Button
              size="xs"
              title="Просмотр"
              onlyIcon
              view="secondary"
              onClick={() => onClick('view')}
              iconLeft={IconDocFilled}
              form="defaultBrick"
            />
            <Button
              form="brick"
              size="xs"
              view="secondary"
              title="Изменить"
              onlyIcon
              onClick={() => onClick('edit')}
              iconLeft={IconEdit}
            />
            <Button
              form="brickDefault"
              size="xs"
              view="secondary"
              title="Удалить"
              onlyIcon
              onClick={() => deleteVehicle(row.id)}
              iconLeft={IconTrash}
            />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <BaseTable
        stickyColumns={2}
        className={cnAutoTable()}
        columns={columns}
        data={data}
      />
      {modalType === 'edit' ? (
        <CrudModal
          mode="edit"
          updateFunc={updateCar}
          items={autoUpdate}
          element={convertAuto(auto)}
          title="Изменение данных клиента"
          onClose={() => {
            setModalType(undefined);
            setShowModal.off();
          }}
          itemId={auto?.id ?? ''}
          isOpen={showModal}
          successCallback={() => {
            toast.success('Данные успешно обновились');
            setTimeout(() => document.location.reload(), 1000);
          }}
          errorCallback={() => {
            toast.alert('Не удалось обновить данные клиента');
          }}
        />
      ) : (
        <CrudModal
          mode="view"
          viewFunc={getCar}
          items={autoView}
          title="Просмотр данных клиента"
          onClose={() => {
            setModalType(undefined);
            setShowModal.off();
          }}
          itemId={auto?.id ?? ''}
          isOpen={showModal}
        />
      )}
    </>
  );
};
