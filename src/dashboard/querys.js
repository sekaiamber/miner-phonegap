const QUERYS = {
  LOGIN: '/api/v1/sessions.json',
};

Object.keys(QUERYS).forEach((key) => {
  QUERYS[key] = 'https://www.basepool.net' + QUERYS[key];
});

export default QUERYS;
