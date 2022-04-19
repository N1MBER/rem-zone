import React from 'react';
import { Text } from '@consta/uikit/Text';
import { Select } from '@consta/uikit/Select';
import { limits } from '../../../../utils';
import { cn } from '../../../../__private__/utils/bem';

import './TablePageHeader.scss';

const cnTablePageHeader = cn('TablePageHeader');

type Props = {
  title: string;
  titleButton?: React.ReactElement;
  additionalControls?: React.ReactElement;
  changeLimit: (limit: number) => void;
  limit: number;
};

export const TablePageHeader = (props: Props) => {
  const { titleButton, title, limit, additionalControls, changeLimit } = props;

  return (
    <>
      <div className={cnTablePageHeader()}>
        <div className={cnTablePageHeader('Top')}>
          <Text size="3xl" lineHeight="m" view="primary" weight="bold">
            {title}
          </Text>
          {titleButton}
        </div>
        <div
          className={cnTablePageHeader('Bottom', {
            empty: !additionalControls,
          })}
        >
          {additionalControls}
          <Select
            size="s"
            className={cnTablePageHeader('Select')}
            placeholder="Количество"
            items={limits}
            value={limit}
            onChange={({ value }) => value && changeLimit(value)}
            getItemKey={(item) => item}
            getItemLabel={(item) => item.toString()}
          />
        </div>
      </div>
    </>
  );
};
