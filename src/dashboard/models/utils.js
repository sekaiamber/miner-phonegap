import { routerRedux } from 'dva/router';
import pathToRegexp from 'path-to-regexp';

const pathConfigs = {
  '/': {
    header: {
      title: '首頁',
      style: {
        backgroundColor: 'transparent',
        color: '#fff',
        position: 'absolute',
      },
      icon: {
        left: 'notices',
        right: 'activitiesDone',
      },
    },
    footer: {
      activeNav: 0,
    },
  },
  '/power': {
    header: {
      title: '算力',
    },
    footer: {
      activeNav: 1,
    },
  },
};

export default {
  namespace: 'utils',
  state: {
    test: '222',
    currentPath: '',
    currentPathConfig: {},
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        dispatch({
          type: 'updateState',
          payload: {
            currentPath: pathname,
            currentPathConfig: pathConfigs[pathname] || {},
          },
        });
        // const test = pathToRegexp(router.test).exec(pathname);
        // if (test) {
        //   dispatch({
        //     type: 'updateState',
        //   });
        // }
      });
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
