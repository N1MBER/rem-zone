import React from 'react';
import { Responses404 } from '@consta/uikit/Responses404';
import { Button } from '@consta/uikit/Button';
import { IconArrowRight } from '@consta/uikit/IconArrowRight';
import { useHistory } from 'react-router-dom';

export const PageLayoutError = () => {
  const history = useHistory();

  const handleCLick = () => {
    history.push('/analytic');
  };

  return (
    <Responses404
      actions={
        <Button
          label="Вернуться на главную"
          iconRight={IconArrowRight}
          onClick={handleCLick}
        />
      }
    />
  );
};
