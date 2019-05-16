import { routerRedux } from 'dva/router';
import pathToRegexp from 'path-to-regexp';
import message from '../../utils/message';
import fetch from '../../utils/fetch';
import jwt from '../../utils/jwt';
import QUERYS from '../querys';

const login = data => fetch.post(QUERYS.LOGIN, data);

export default {
  namespace: 'account',
  state: {
    test: '222',
    member_token: undefined,
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
    * login({ payload }, { call, put }) {
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
