import React, { useEffect, useState, memo } from 'react';
import { Loader } from '@consta/uikit/Loader';
import { BaseListRequest, DefaultQueries } from '../../utils/api/types';
import { PaginationProps, PaginationState } from './types';
import { usePrevious } from '../../hooks/usePrevious/usePrevious';
import { useDebounce } from '../../hooks/useDebounce/useDebounce';
import { cn } from '../../__private__/utils/bem';

const cnPagination = cn('Pagination');

const memoizeQuery = <T extends DefaultQueries>(
  prevQuery?: T,
  nextQuery?: T
): boolean => {
  let same = true;
  if (!prevQuery && !nextQuery) return true;
  if (!prevQuery || !nextQuery) return false;
  for (const key in nextQuery) {
    if (!prevQuery.hasOwnProperty(key) || nextQuery[key] !== prevQuery[key]) {
      same = false;
      break;
    }
  }

  return same;
};

const PaginationRender = <
  TYPE,
  U extends BaseListRequest & Q,
  Q extends DefaultQueries,
  K extends DefaultQueries
>(
  props: PaginationProps<TYPE, U, Q, K>
) => {
  const {
    getList,
    listComponent,
    listProps,
    limit = 10,
    onStartCallback,
    successCallback,
    errorCallback,
    queries,
    rerenderAfterActionTrigger,
    className,
  } = props;

  const [page, setPage] = useState(1);
  const [initialLoading, setInitialLoading] = useState(false);
  const [state, setState] = useState<PaginationState<TYPE>>({
    count: 0,
    data: [],
  });
  const previousPage = usePrevious(page);

  const debouncedQueries = useDebounce(queries, 300);

  useEffect(() => {
    setPage(1);
  }, [queries, rerenderAfterActionTrigger]);

  useEffect(() => {
    if (onStartCallback) onStartCallback();

    page === 1 && setInitialLoading(true);

    const params = (
      queries
        ? { offset: (page - 1) * limit, limit, ...queries }
        : { offset: (page - 1) * limit, limit }
    ) as U;

    getList?.(params)
      .then((res) => {
        setState((prev) => ({
          count: res.data.count,
          data:
            page === previousPage
              ? res.data.results
              : [...prev.data, ...res.data.results],
        }));
      })
      .catch((err) => {
        errorCallback && errorCallback(err);
      })
      .finally(() => {
        page === 1 && setInitialLoading(false);
      });
  }, [page, debouncedQueries]);

  useEffect(() => {
    successCallback && successCallback(state.data);
  }, [state]);

  const Component = listComponent;

  return (
    <div className={cnPagination(null, [className])}>
      {initialLoading ? (
        <Loader className={cnPagination('Loader')} />
      ) : (
        <div className={cnPagination('Content')}>
          <Component
            data={state.data}
            {...(listProps as K)}
            className={cnPagination('Table')}
          />
        </div>
      )}
    </div>
  );
};

export const Pagination = memo(PaginationRender, (prev, next) => {
  return (
    memoizeQuery(
      prev.queries as DefaultQueries,
      next.queries as DefaultQueries
    ) && prev.rerenderAfterActionTrigger === next.rerenderAfterActionTrigger
  );
}) as typeof PaginationRender;
