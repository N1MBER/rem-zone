import React from 'react';
import { ModalCrudType } from '../../types/setings';
import { BaseModal } from '../BaseComponents/BaseModal/BaseModal';
import { CrudModalView } from './CrudModalView/CrudModalView';
import { cn } from '../../__private__/utils/bem';
import { CrudModalProps } from './types';
import { CrudModalCreate } from './CrudModalCreate/CrudModalCreate';
import { CrudModalUpdate } from './CrudModalUpdate/CrudModalUpdate';

import './CrudModal.scss';

const cnCrudModal = cn('CrudModal');

export const CrudModal = <
  TYPE extends Record<string, unknown | undefined>,
  LOADABLE extends boolean,
  OBJECT extends Record<string, unknown>
>(
  props: CrudModalProps<ModalCrudType, LOADABLE, OBJECT, TYPE>
) => {
  const {
    mode,
    title,
    viewFunc,
    createFunc,
    updateFunc,
    isOpen,
    onClose,
    element,
    items,
    itemId,
    successCallback,
    errorCallback,
    defaultValues,
  } = props;

  const getContent = () => {
    if (mode === 'view') {
      return (
        <CrudModalView
          itemId={itemId as string}
          viewFunc={
            viewFunc as CrudModalProps<
              'view',
              LOADABLE,
              OBJECT,
              TYPE
            >['viewFunc']
          }
          items={items}
          successCallback={successCallback}
          errorCallback={errorCallback}
        />
      );
    }
    if (mode === 'create') {
      return (
        <CrudModalCreate
          items={items}
          defaultValues={defaultValues}
          createFunc={
            createFunc as CrudModalProps<
              'create',
              LOADABLE,
              OBJECT,
              TYPE
            >['createFunc']
          }
          onClose={onClose}
          successCallback={successCallback}
          errorCallback={errorCallback}
        />
      );
    }
    return (
      <CrudModalUpdate
        items={items}
        element={element as TYPE}
        onClose={onClose}
        defaultValues={defaultValues}
        updateFunc={
          updateFunc as CrudModalProps<
            'edit',
            LOADABLE,
            OBJECT,
            TYPE
          >['updateFunc']
        }
        itemId={itemId as string}
        successCallback={successCallback}
        errorCallback={errorCallback}
      />
    );
  };

  return (
    <BaseModal
      className={cnCrudModal()}
      title={title}
      isOpen={isOpen}
      onClose={onClose}
    >
      {getContent()}
    </BaseModal>
  );
};
