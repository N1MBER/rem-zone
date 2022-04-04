const SET_REFRESH = 'refresh/SET_REFRESH';

type Action = {
  type: string;
  refresh: string;
};

export const setRefresh = (refresh: string) => ({ type: SET_REFRESH, refresh });

export const refreshReducer = (state = { refresh: '' }, action: Action) => {
  switch (action.type) {
    case SET_REFRESH: {
      return { refresh: action.refresh };
    }
    default:
      return state;
  }
};
