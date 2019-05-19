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
const queryAcitiviesDone = () => fetch.private.get(QUERYS.QUERY_ACTIVITIES_DONE);
const queryAcitiviesAll = () => fetch.private.get(QUERYS.QUERY_ACTIVITIES_ALL);
const queryAcitiviesYesterday = () => fetch.private.get(QUERYS.QUERY_ACTIVITIES_YESTERDAY);
const queryAcitiviesTotal = () => fetch.private.get(QUERYS.QUERY_ACTIVITIES_TOTAL);
const queryOrders = () => fetch.private.get(QUERYS.QUERY_ORDERS);
const queryDeposits = () => fetch.private.get(QUERYS.QUERY_DEPOSITS);
const queryWithdraws = () => fetch.private.get(QUERYS.QUERY_WITHDRAWS);
const querySubUser = () => fetch.private.get(QUERYS.QUERY_SUB_USER);

export default {
  namespace: 'account',
  state: {
    member_token: undefined,
    userInfo: {},
    account: {},
    acitivies: [],
    acitiviesDone: [],
    acitiviesAll: [],
    acitiviesYesterday: 0,
    acitiviesTotal: 0,
    orders: [],
    history: [],
    subuser: [],
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
        const wallet = pathToRegexp('/wallet').exec(pathname);
        if (wallet) {
          dispatch({
            type: 'queryMy',
          });
          dispatch({
            type: 'queryAccount',
          });
          dispatch({
            type: 'queryHistory',
          });
        }
        const me = pathToRegexp('/me').exec(pathname);
        if (me) {
          dispatch({
            type: 'queryMy',
          });
        }
        const invite = pathToRegexp('/invite').exec(pathname);
        if (invite) {
          dispatch({
            type: 'queryMy',
          });
        }
        const activities = pathToRegexp('/activities').exec(pathname);
        if (activities) {
          dispatch({
            type: 'queryAcitiviesDone',
          });
        }
        const subuser = pathToRegexp('/subuser').exec(pathname);
        if (subuser) {
          dispatch({
            type: 'querySubUser',
          });
        }
        const miners = pathToRegexp('/miners').exec(pathname);
        if (miners) {
          dispatch({
            type: 'queryAcitiviesAll',
          });
          dispatch({
            type: 'queryAcitiviesTotal',
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
      yield put({
        type: 'updateState',
        payload: {
          acitivies: [],
        },
      });
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
    * queryAcitiviesDone(_, { call, put }) {
      const data = yield call(queryAcitiviesDone);
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            acitiviesDone: data.data,
          },
        });
      }
    },
    * queryAcitiviesAll(_, { call, put }) {
      const data = yield call(queryAcitiviesAll);
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            acitiviesAll: data.data,
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
    * queryAcitiviesTotal(_, { call, put }) {
      const data = yield call(queryAcitiviesTotal);
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            acitiviesTotal: data.amount,
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
    * queryHistory(_, { call, put }) {
      const withdraws = yield call(queryWithdraws);
      const deposits = yield call(queryDeposits);
      if (withdraws.success && deposits.success) {
        const wit = withdraws.data.map(d => ({
          ...d,
          type: 'withdraw',
        }));
        const dep = deposits.data.map(d => ({
          ...d,
          type: 'deposits',
        }));
        const history = wit.concat(dep);
        history.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        yield put({
          type: 'updateState',
          payload: {
            history,
          },
        });
      }
    },
    * querySubUser(_, { call, put }) {
      const data = yield call(querySubUser);
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            subuser: data.data,
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