import { routerRedux } from 'dva/router';
import pathToRegexp from 'path-to-regexp';

export default {
  namespace: 'utils',
  state: {
    test: '222'
  },
  subscriptions: {
    setup({ dispatch, history }) {
      // history.listen(({ pathname }) => {
      //   const test = pathToRegexp(router.test).exec(pathname);
      //   if (test) {
      //     dispatch({
      //       type: 'updateState',
      //     });
      //   }
      // });
    },
  },
  effects: {
    * goBack(_, { select }) {
      const history = yield select(({ utils }) => utils.history);
      history.goBack();
    },
    * goto({ goto }, { put }) {
      yield put(routerRedux.push(goto));
    },
  },
  reducers: {
    updateCurrentPathName(state, { pathname, history }) {
      return { ...state, pathname, history };
    },
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
