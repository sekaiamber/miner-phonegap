const QUERYS = {
  LOGIN: '/api/v1/sessions.json',
  QUERY_MARKET: '/api/v1/markets.json',
  QUERY_BLOCK: '/api/v1/home.json',
  QUERY_MY: '/api/v1/my.json',
  QUEYR_ACCOUNT: '/api/v1/accounts.json',
  QUERY_ACTIVITIES_YESTERDAY: '/api/v1/activities/yesterday.json?page=1&state=submitted',
  QUERY_ACTIVITIES: '/api/v1/activities.json?page=1&state=submitted',
  QUERY_ACTIVITIES_DONE: page => `/api/v1/activities.json?page=${page}&state=done`,
  QUERY_ACTIVITIES_ALL: '/api/v1/activities.json?page=1',
  QUERY_ACTIVITIES_TOTAL: '/api/v1/activities/total.json',
  QUERY_ORDERS: '/api/v1/orders.json',
  QUERY_PRODUCTS: '/api/v1/products.json',
  QUERY_DEPOSITS: '/api/v1/deposits.json',
  QUERY_WITHDRAWS: '/api/v1/withdraws.json',
  QUERY_NOTICE: '/api/v1/notices.json',
  QUERY_SUB_USER: '/api/v1/my/sub_users.json',
  COLLECT: id => `/api/v1/activities/${id}/collect.json`,
  SEND_SMS: '/api/v1/sms.json',
  SEND_FORGET_SMS: '/api/v1/sms/reset_password.json',
  SIGNUP: '/api/v1/users.json',
  RESET_PASSWORD: '/api/v1/reset_password.json',
};

Object.keys(QUERYS).forEach((key) => {
  if (typeof QUERYS[key] === 'string') {
    QUERYS[key] = 'https://www.basepool.net' + QUERYS[key];
  } else if (typeof QUERYS[key] === 'function') {
    const tmp = QUERYS[key];
    QUERYS[key] = (...args) => 'https://www.basepool.net' + tmp(...args);
  }
});

export default QUERYS;
