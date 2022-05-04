import React from 'react';
import { Responses404 } from '@consta/uikit/Responses404';
import { Button } from '@consta/uikit/Button';
import { IconArrowRight } from '@consta/uikit/IconArrowRight';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/reducers';

export const PageLayoutError = () => {
  const history = useHistory();

  const { userType } = useSelector((store: RootState) => store.user);

  const handleCLick = () => {
    history.push(userType !== 'master-executor' ? '/analytic' : '/timetable');
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
