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
  '/buy': {
    header: {
      title: '購買算力',
    },
    footer: {
      activeNav: 2,
    },
  },
  '/wallet': {
    header: {
      title: '錢包',
    },
    footer: {
      activeNav: 3,
    },
  },
  '/me': {
    header: {
      title: '個人中心',
    },
    footer: {
      activeNav: 4,
    },
  },
  '/notice': {
    header: {
      title: '公告',
      icon: {
        left: 'back',
      },
    },
  },
  '/activities': {
    header: {
      title: '領取記錄',
      icon: {
        left: 'back',
      },
    },
  },
  '/invite': {
    header: {
      title: '邀請好友',
      icon: {
        left: 'back',
      },
    },
  },
  '/miners': {
    header: {
      title: '礦工管理',
      icon: {
        left: 'back',
      },
    },
  },
  '/subuser': {
    header: {
      title: '我的礦工',
      icon: {
        left: 'back',
      },
    },
  },
  '/deposit': {
    header: {
      title: '充值',
      icon: {
        left: 'back',
      },
    },
  },
};

export default {
  namespace: 'utils',
  state: {
    history: null,
    currentPath: '',
    currentPathConfig: {},
  },
  subscriptions: {
    setup({ dispatch, history }) {
      dispatch({
        type: 'updateState',
        payload: {
          history,
        },
      });
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
