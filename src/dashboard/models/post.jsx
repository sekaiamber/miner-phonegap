import React from 'react';

const posts = {
  qa: {
    title: '常见问题',
    content: (
      <div>
        <h1>算力</h1>
        <h2>什么是挖矿</h2>
        <p>比特币挖矿是利用计算机硬件（即矿机）为比特币网络做数学计算进行交易确认和提高安全性的过程。</p>
        <h2>什么是算力</h2>
        <p>算力可以理解为通过计算机挖掘比特币或者莱特币的能力。您的算力越多产出的币就越多。在通过挖矿得到比特币或者莱特币的过程中，一个节点每秒能做多少次计算，就是其算力代表，单位为THS。您的算力占全网算力的比例越高，算力产出的币就越多。</p>
        <h2>什么是算力到账日期</h2>
        <p>租赁或购买的算力将于购买后24小时内到账，到账后第二天产生收益。</p>
        <h1>收益</h1>
        <h2>收益如何产生？</h2>
        <p>通过挖矿产生的收益，将以个人所租赁或购买的算力份额进行相应的发放，持有算力越多，产生的收益越多。</p>
        <h2>收益什么时候发放？</h2>
        <p>算力到账后的第3天进行发放。</p>
        <h2>收益的什么？</h2>
        <p>胖蚂蚁采取挖什么分什么得形式，即挖比特币得比特币，挖莱特币得莱特币，购买机位客户收益为USDT。</p>
        <h2>预计每日收益如何计算？</h2>
        <p>预计日收益为每日挖矿所得扣除电费后按照PPS方式分配，用户所得均为纯收益。</p>
        <h2>预计年回报率如何计算？</h2>
        <p>因市场行情和全网算力会产生较大的波动，胖蚂蚁仅能根据当日产出和币价给出参考数据，该数据不做投资参考。</p>
        <h2>可以退还本金么？</h2>
        <p>租赁客户本金到期全额退还，购买客户合约到期后，可按市场价格8折出售算力。机位购买客户本金为一次性投资，不可退。</p>
        <h2>什么情况下昨日收益为0</h2>
        <p>当挖矿收益小于矿机的电费时，收益为0。或遇到正常电路检修时，矿机停产，收益为0。</p>
        <h1>提现</h1>
        <h2>怎么操作提现</h2>
        <p>您的挖矿收益，可以APP中进行提现操作。</p>
        <h2>提现需要手续费么</h2>
        <p>手续费根据区块实时收取。</p>
        <h2>提现有最低金额要求么</h2>
        <p>比特币提现最低0.003BTC。莱特币提现最低0.02LTC。USDT不受限制。需要注意的是提现到账地址的最低充值金额，低于最低充值金额则不会到账。</p>
        <h2>操作提现后何时到账。</h2>
        <p>提现成功后，第二个自然日24:00前到账。</p>
        <h2>提现失败怎么办？</h2>
        <p>提现失败通常是网络拥挤造成，可以重新发起提现。</p>
        <h2>提现到错误地址怎么办？</h2>
        <p>由于区块地址的匿名性，我们无法找到对方，如果您输入的地址有误，我们可以协助提供哈希值给您参考，需您自行联系对方。</p>
        <h2>提现后的数字货币如何转换成RMB？</h2>
        <p>可以再场外交易平台或者数字货币交易所，进行兑换。兑换需符合国家相关规定，胖蚂蚁不做任何指导性说明。</p>
      </div>
    ),
  },
};

export default {
  namespace: 'post',
  state: {
    post: '',
  },
  subscriptions: {},
  effects: {
    * setPost({ payload }, { put }) {
      yield put({
        type: 'updateState',
        payload: {
          post: posts[payload],
        },
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
