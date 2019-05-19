import pathToRegexp from 'path-to-regexp';
import fetch from '../../utils/fetch';
import QUERYS from '../querys';

const queryNotices = () => fetch.get(QUERYS.QUERY_NOTICE);

export default {
  namespace: 'notice',
  state: {
    notices: [],
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const notice = pathToRegexp('/notice').exec(pathname);
        if (notice) {
          dispatch({
            type: 'queryNotices',
          });
        }
      });
    },
  },
  effects: {
    * queryNotices(_, { call, put }) {
      const data = yield call(queryNotices);
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            notices: data.data,
          },
        });
      }
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
