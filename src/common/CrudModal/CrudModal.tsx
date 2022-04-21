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

export const CrudModal = <TYPE,>(
  props: CrudModalProps<ModalCrudType, TYPE>
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
  } = props;

  const getContent = () => {
    if (mode === 'view') {
      return (
        <CrudModalView
          itemId={itemId as string}
          viewFunc={viewFunc as CrudModalProps<'view', TYPE>['viewFunc']}
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
          createFunc={
            createFunc as CrudModalProps<'create', TYPE>['createFunc']
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
        updateFunc={updateFunc as CrudModalProps<'edit', TYPE>['updateFunc']}
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
