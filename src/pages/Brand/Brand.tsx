import React, { useState } from 'react';
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
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import { Text } from '@consta/uikit/Text';
import { TextField } from '@consta/uikit/TextField';
import { IconRevert } from '@consta/uikit/IconRevert';
import { IconSearch } from '@consta/uikit/IconSearch';

const cnBrands = cn('Brands');

const Brands = () => {
  const [open, setOpen] = useFlag();
  const [filterData, setFilterData] = useState<string | undefined>();
  const [data, setData] = useState<string | undefined>();
  const { userType } = useSelector((store: RootState) => store.user);

  const clearData = () => {
    setFilterData(undefined);
    setData(undefined);
  };

  return (
    <>
      <TablePage
        className={cnBrands()}
        title="Марки"
        apiFunction={getBrands}
        tableComponent={BrandTable}
        titleButton={
          userType !== 'master-executor' ? (
            <Button
              label="Добавить марку"
              size="s"
              iconLeft={IconAdd}
              onClick={setOpen.on}
            />
          ) : undefined
        }
        additionalControls={
          <>
            <div className={cnBrands('Controls')}>
              <Text size="s" lineHeight="m" view="primary" weight="regular">
                Поиск
              </Text>
              <div className={cnBrands('Inputs')}>
                <TextField
                  className={cnBrands('Input')}
                  type="text"
                  size="s"
                  value={filterData}
                  onChange={({ value }) => setFilterData(value?.toString())}
                  placeholder="Название"
                />
              </div>
            </div>
            <div className={cnBrands('Buttons')}>
              <Button
                form="defaultBrick"
                size="s"
                view="secondary"
                label="Сброс"
                onClick={clearData}
                iconLeft={IconRevert}
              />
              <Button
                form="brickDefault"
                size="s"
                label="Поиск"
                onClick={() => setData(filterData)}
                iconRight={IconSearch}
              />
            </div>
          </>
        }
        queries={{
          name: data,
        }}
      />
      {userType !== 'master-executor' && (
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
      )}
    </>
  );
};

export default Brands;
