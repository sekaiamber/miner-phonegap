import { routerRedux } from 'dva/router';
import pathToRegexp from 'path-to-regexp';
import message from '../../utils/message';
import { loading, removeLoading } from '../../utils/loading';
import fetch from '../../utils/fetch';
import jwt from '../../utils/jwt';
import QUERYS from '../querys';

const login = data => fetch.post(QUERYS.LOGIN, data);
const queryMy = () => fetch.private.get(QUERYS.QUERY_MY);
const queryAccount = () => fetch.private.get(QUERYS.QUEYR_ACCOUNT);
const queryAcitivies = () => fetch.private.get(QUERYS.QUERY_ACTIVITIES);
const queryAcitiviesYesterday = () => fetch.private.get(QUERYS.QUERY_ACTIVITIES_YESTERDAY);
const queryOrders = () => fetch.private.get(QUERYS.QUERY_ORDERS);

export default {
  namespace: 'account',
  state: {
    member_token: undefined,
    userInfo: {},
    account: {},
    acitivies: [],
    acitiviesYesterday: 0,
    orders: [],
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const home = pathToRegexp('/').exec(pathname);
        if (home) {
          dispatch({
            type: 'queryMy',
          });
          dispatch({
            type: 'queryAccount',
          });
          dispatch({
            type: 'queryAcitivies',
          });
          dispatch({
            type: 'queryAcitiviesYesterday',
          });
        }
        const power = pathToRegexp('/power').exec(pathname);
        if (power) {
          dispatch({
            type: 'queryMy',
          });
          dispatch({
            type: 'queryAccount',
          });
          dispatch({
            type: 'queryOrders',
          });
          dispatch({
            type: 'queryAcitiviesYesterday',
          });
        }
      });
    },
  },
  effects: {
    * login({ payload }, { call, put }) {
      loading('登錄中');
      const data = yield call(login, payload);
      if (data.success) {
        const token = data.data.member;
        const v = jwt.verify(token);

        yield put({
          type: 'updateLocalState',
          payload: {
            member_token: v.member_token,
            member_id: v.member_id,
          },
        });
        message.success('登錄成功');
        yield put({
          type: 'utils/goto',
          goto: '/',
        });
      }
      removeLoading();
    },
    * queryMy(_, { call, put }) {
      const data = yield call(queryMy);
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            userInfo: data.data,
          },
        });
      }
    },
    * queryAccount(_, { call, put }) {
      const data = yield call(queryAccount);
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            account: data.data,
          },
        });
      }
    },
    * queryAcitivies(_, { call, put }) {
      const data = yield call(queryAcitivies);
      if (data.success) {
        const acitivies = data.data.map(item => ({
          ...item,
          position: {
            left: 0.05 + Math.random() * 0.8,
            top: 0.05 + Math.random() * 0.75,
          },
        }));
        yield put({
          type: 'updateState',
          payload: {
            acitivies,
          },
        });
      }
    },
    * queryAcitiviesYesterday(_, { call, put }) {
      const data = yield call(queryAcitiviesYesterday);
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            acitiviesYesterday: data.amount,
          },
        });
      }
    },
    * queryOrders(_, { call, put }) {
      const data = yield call(queryOrders);
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            orders: data.data,
          },
        });
      }
    },
    * updateLocalState({ payload }, { put }) {
      Object.keys(payload).forEach((key) => {
        localStorage.setItem(key, payload[key]);
      });

      yield put({
        type: 'updateState',
        payload,
      });
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
