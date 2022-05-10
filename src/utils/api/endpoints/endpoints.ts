export const endpoints = {
  auth: {
    root: '/auth/',
    logout: '/auth/logout/',
    login: '/auth/login/',
    reset_password: '/auth/password/reset/',
    reset_password_confirm: '/auth/password/reset/confirm/',
    user: '/auth/user/',
    change_password: '/auth/password/change/',
    token_verify: '/auth/token/verify/',
    token_refresh: '/auth/token/refresh/',
  },
  users: {
    staff: '/users/staff/',
    changePassword: (id: string) => `/users/staff/${id}/change_password/`,
    groups: '/users/groups/',
    clients: '/users/clients/',
  },
  positions: {
    positions: '/users/staff/positions/',
  },
  worklog: {
    worklog: '/users/staff/worklogs/',
  },
  jobs: {
    jobs: '/api/v1/jobs/',
  },
  favours: {
    favours: '/api/v1/favours/',
  },
  analytic: {
    worklogs: '/api/v1/analytics/worklogs/',
    jobs: '/api/v1/analytics/jobs/',
  },
  cars: {
    cars: '/api/v1/cars/',
    model: '/api/v1/cars/models/',
    brand: '/api/v1/cars/brands/',
  },
  bonuses: {
    balance: '/api/v1/bonuses/balances/',
    changeBalance: (id: string | number) =>
      `/api/v1/bonuses/balances/${id}/change/`,
    history: '/api/v1/bonuses/balances/history/',
  },
};
