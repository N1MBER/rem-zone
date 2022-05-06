import React, { useState } from 'react';
import { TablePage } from '../../common/BaseComponents/TablePage/TablePage';
import { Button } from '@consta/uikit/Button';
import { IconAdd } from '@consta/uikit/IconAdd';
import { useFlag } from '@consta/uikit/useFlag';
import { CrudModal } from '../../common/CrudModal/CrudModal';
import { toast } from '../../utils/toast/toast';
import { cn } from '../../__private__/utils/bem';
import { modelUpdate } from './helper';
import { addModel, getModels } from '../../utils/api/routes/cars/cars';
import { ModelParams } from '../../utils/api/routes/cars/types';
import { ModelTable } from './ModelTable/ModelTable';
import { getErrorMessage } from '../../utils';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import { Text } from '@consta/uikit/Text';
import { TextField } from '@consta/uikit/TextField';
import { IconRevert } from '@consta/uikit/IconRevert';
import { IconSearch } from '@consta/uikit/IconSearch';

const cnModel = cn('Model');

const Model = () => {
  const [open, setOpen] = useFlag();
  const [filterData, setFilterData] = useState<ModelParams>({});
  const [data, setData] = useState<ModelParams>({});

  const setValue: (
    key: keyof ModelParams,
    value: ModelParams[keyof ModelParams]
  ) => void = (key, value) => {
    setFilterData({
      ...filterData,
      [key as string]: value,
    });
  };

  const clearData = () => {
    setFilterData({});
    setData({});
  };

  const { userType } = useSelector((store: RootState) => store.user);

  return (
    <>
      <TablePage
        className={cnModel()}
        title="Модели автомобилей"
        apiFunction={getModels}
        tableComponent={ModelTable}
        titleButton={
          userType !== 'master-executor' ? (
            <Button
              label="Добавить модель"
              size="s"
              iconLeft={IconAdd}
              onClick={setOpen.on}
            />
          ) : undefined
        }
        additionalControls={
          <>
            <div className={cnModel('Controls')}>
              <Text size="s" lineHeight="m" view="primary" weight="regular">
                Поиск
              </Text>
              <div className={cnModel('Inputs')}>
                <TextField
                  className={cnModel('Input')}
                  form="defaultClear"
                  type="text"
                  size="s"
                  value={filterData.name}
                  onChange={({ value }) => setValue('name', value?.toString())}
                  placeholder="Модель"
                />
                <TextField
                  className={cnModel('Input')}
                  form="brickDefault"
                  type="email"
                  value={filterData.brand__name}
                  onChange={({ value }) =>
                    setValue('brand__name', value?.toString())
                  }
                  size="s"
                  placeholder="Бренд"
                />
              </div>
            </div>
            <div className={cnModel('Buttons')}>
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
          name: data.name,
          // eslint-disable-next-line @typescript-eslint/naming-convention
          brand__name: data.brand__name,
        }}
      />
      {userType !== 'master-executor' && (
        <CrudModal
          mode="create"
          createFunc={addModel}
          title="Создание новой модели"
          onClose={setOpen.off}
          isOpen={open}
          items={modelUpdate}
          successCallback={() => {
            toast.success('Модель успешно создан');
            setTimeout(() => document.location.reload(), 1000);
          }}
          errorCallback={(error) => {
            const message = getErrorMessage(error);
            toast.alert(message ?? 'Не удалось создать модель');
          }}
        />
      )}
    </>
  );
};

export default Model;
