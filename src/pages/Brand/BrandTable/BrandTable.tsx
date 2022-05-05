import React, { useState } from 'react';
import { TableColumn } from '@consta/uikit/Table';
import { Button } from '@consta/uikit/Button';
import { IconDocFilled } from '@consta/uikit/IconDocFilled';
import { IconEdit } from '@consta/uikit/IconEdit';
import { IconTrash } from '@consta/uikit/IconTrash';
import { BaseTable } from '../../../common/BaseComponents/BaseTable/BaseTable';
import {
  deleteBrand as deleteBrandFunc,
  getBrand,
  updateBrand,
} from '../../../utils/api/routes/cars/cars';
import { toast } from '../../../utils/toast/toast';
import { cn } from '../../../__private__/utils/bem';
import { ModalCrudType } from '../../../types/setings';
import { useFlag } from '@consta/uikit/useFlag';
import { CrudModal } from '../../../common/CrudModal/CrudModal';
import { brandsUpdate, brandsView } from '../helper';
import { Brand } from '../../../types/auto';
import { getErrorMessage } from '../../../utils';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducers';

import './BrandTable.scss';

type Props = {
  data: Brand[];
};

const cnBrandTable = cn('BrandTable');

export const BrandTable = (props: Props) => {
  const { data } = props;

  const [modalType, setModalType] = useState<ModalCrudType | undefined>();
  const [showModal, setShowModal] = useFlag();
  const [brand, setBrand] = useState<Brand | undefined>();

  const { userType } = useSelector((store: RootState) => store.user);

  const deleteVehicle = (id: string) => {
    deleteBrandFunc(id).then((res) => {
      if (res.status === 204) {
        toast.success('Марка успешно удалена');
        setTimeout(() => document.location.reload(), 1000);
      } else {
        toast.alert(res.data.detail);
      }
    });
  };

  const columns: Array<TableColumn<Brand>> = [
    {
      title: 'Название',
      accessor: 'name',
    },
    {
      title: '',
      accessor: 'id',
      renderCell: (row) => {
        const onClick = (type: 'edit' | 'view') => {
          setModalType(type);
          setBrand(row);
          setShowModal.on();
        };
        return (
          <div className={cnBrandTable('Controls')}>
            <Button
              size="xs"
              title="Просмотр"
              onlyIcon
              view="secondary"
              onClick={() => onClick('view')}
              iconLeft={IconDocFilled}
              form={userType !== 'master-executor' ? 'defaultBrick' : 'default'}
            />
            {userType !== 'master-executor' && (
              <>
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
                />{' '}
              </>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <>
      <BaseTable
        stickyColumns={2}
        className={cnBrandTable()}
        columns={columns}
        data={data}
      />
      {userType !== 'master-executor' && (
        <>
          {modalType === 'edit' ? (
            <CrudModal
              mode="edit"
              updateFunc={updateBrand}
              items={brandsUpdate}
              element={brand ? { name: brand.name } : undefined}
              title="Изменение данных марки"
              onClose={() => {
                setModalType(undefined);
                setShowModal.off();
              }}
              itemId={brand?.id ?? ''}
              isOpen={showModal}
              successCallback={() => {
                toast.success('Данные успешно обновились');
                setTimeout(() => document.location.reload(), 1000);
              }}
              errorCallback={(error) => {
                const message = getErrorMessage(error);
                toast.alert(message ?? 'Не удалось обновить данные марки');
              }}
            />
          ) : (
            <CrudModal
              mode="view"
              viewFunc={getBrand}
              items={brandsView}
              title="Просмотр данных марки"
              onClose={() => {
                setModalType(undefined);
                setShowModal.off();
              }}
              itemId={brand?.id ?? ''}
              isOpen={showModal}
            />
          )}
        </>
      )}
    </>
  );
};
