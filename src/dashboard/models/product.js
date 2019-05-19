import pathToRegexp from 'path-to-regexp';
import fetch from '../../utils/fetch';
import QUERYS from '../querys';

const queryProducts = () => fetch.get(QUERYS.QUERY_PRODUCTS);

export default {
  namespace: 'product',
  state: {
    products: [],
    canBuy: false,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const test = pathToRegexp('/buy').exec(pathname);
        if (test) {
          dispatch({
            type: 'queryProducts',
          });
        }
      });
    },
  },
  effects: {
    * queryProducts(_, { call, put }) {
      const data = yield call(queryProducts);
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            products: data.data.products,
            canBuy: data.data.can_buy,
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
