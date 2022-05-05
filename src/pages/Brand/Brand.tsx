import React from 'react';
import { TablePage } from '../../common/BaseComponents/TablePage/TablePage';
import { Button } from '@consta/uikit/Button';
import { IconAdd } from '@consta/uikit/IconAdd';
import { useFlag } from '@consta/uikit/useFlag';
import { CrudModal } from '../../common/CrudModal/CrudModal';
import { toast } from '../../utils/toast/toast';
import { cn } from '../../__private__/utils/bem';
import { brandsUpdate } from './helper';
import { addBrand, getBrands } from '../../utils/api/routes/cars/cars';
import { BrandTable } from './BrandTable/BrandTable';
import { getErrorMessage } from '../../utils';

const cnBrands = cn('Brands');

const Brands = () => {
  const [open, setOpen] = useFlag();

  return (
    <>
      <TablePage
        className={cnBrands()}
        title="Марки"
        apiFunction={getBrands}
        tableComponent={BrandTable}
        titleButton={
          <Button
            label="Добавить марку"
            size="s"
            iconLeft={IconAdd}
            onClick={setOpen.on}
          />
        }
      />
      <CrudModal
        mode="create"
        createFunc={addBrand}
        title="Создание новой марки"
        onClose={setOpen.off}
        isOpen={open}
        items={brandsUpdate}
        successCallback={() => {
          toast.success('Марка успешно создан');
          setTimeout(() => document.location.reload(), 1000);
        }}
        errorCallback={(error) => {
          const message = getErrorMessage(error);
          toast.alert(message ?? 'Не удалось создать марку');
        }}
      />
    </>
  );
};

export default Brands;
