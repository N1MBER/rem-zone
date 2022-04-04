const SET_ACCESS = 'access/SET_ACCESS';

export const setAccess = (access: string) => ({ type: SET_ACCESS, access });

type Action = {
  type: string;
  access: string;
};

export const accessReducer = (state = { access: '' }, action: Action) => {
  switch (action.type) {
    case SET_ACCESS: {
      return { access: action.access };
    }
    default:
      return state;
  }
};
