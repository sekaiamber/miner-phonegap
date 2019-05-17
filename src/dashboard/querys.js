const QUERYS = {
  LOGIN: '/api/v1/sessions.json',
  QUERY_MARKET: '/api/v1/markets.json',
  QUERY_BLOCK: '/api/v1/home.json',
  QUERY_MY: '/api/v1/my.json',
  QUEYR_ACCOUNT: '/api/v1/accounts.json',
  QUERY_ACTIVITIES_YESTERDAY: '/api/v1/activities/yesterday.json?page=1&state=submitted',
  QUERY_ACTIVITIES: '/api/v1/activities.json?page=1&state=submitted',
};

Object.keys(QUERYS).forEach((key) => {
  QUERYS[key] = 'https://www.basepool.net' + QUERYS[key];
});

export default QUERYS;
