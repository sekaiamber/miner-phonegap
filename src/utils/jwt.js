/* eslint-disable camelcase */
import jwt from 'jsonwebtoken';

const KEY = 'f520ec8c33195991a738';
const SECRET = '3da7b1ba9a7614aa97aaed58dfb107ad';

const exp = {
  getPublicToken() {
    return jwt.sign({
      timestamp: parseInt(new Date().getTime() / 1000, 10),
    }, SECRET);
  },

  getKey() {
    return KEY;
  },

  verify(token) {
    return jwt.verify(token, SECRET);
  },

  getPrivateToken() {
    const member_id = localStorage.getItem('member_id') || '';
    const member_token = localStorage.getItem('member_token') || '';
    const sig = jwt.sign({}, member_token);
    return jwt.sign({
      timestamp: parseInt(new Date().getTime() / 1000, 10),
      member_id,
      member_token,
      sig,
    }, SECRET);
  },
};

export default exp;
