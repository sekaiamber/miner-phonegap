/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import classnames from 'classnames';
import Decimal from 'decimal.js-light';
import { connect } from 'dva';
import { Spin, Input } from 'antd';
import { Link } from 'dva/router';
import message from '../../../utils/message';

import './style.scss';


import buyUsdtImg from '../../../assets/buy_usdt.svg';
import ltcImg from '../../../assets/ltc.png';
import btcImg from '../../../assets/btc.png';

const icons = {
  btc: btcImg,
  ltc: ltcImg,
};

// images
// import blockHeightImg from '../../../assets/block_height.svg';

class Buy extends Component {
  state = {
    selected: undefined,
    showOrder: false,
    use: 'usdt',
    form: {},
  }

  getOrderCost() {
    const { form } = this.state;
    let cost = 0;
    Object.keys(form).forEach((id) => {
      const p = form[id];
      cost += parseFloat(p.product.price) * p.count;
    });
    return cost;
  }

  getItemList(list) {
    const { form } = this.state;
    return list.map(product => (
      <div className="item balance" key={product.id}>
        <div className="logo">
          <img src={icons[product.currency.toLowerCase()]} alt="" />
        </div>
        <div className="center">
          <div className="txid">{product.power}T <span>{product.price} USDT({product.days}天/期)</span></div>
          <div className="time">{product.month_earns}</div>
        </div>
        <div className="amount">
          <a className="minus" onClick={this.handleProductCountClick.bind(this, product, -1)}>-</a>
          <Input className="amount-input" value={form[product.id] ? form[product.id].count : ''} onChange={this.handleProductCountChange.bind(this, product)} />
          <a className="plus" onClick={this.handleProductCountClick.bind(this, product, 1)}>+</a>
        </div>
      </div>
    ));
  }

  handleShowOrder = () => {
    if (this.getOrderCost() > 0) {
      this.setState({
        showOrder: true,
      });
    }
  }

  handleCloseModal = (e) => {
    if (e.currentTarget === e.target) {
      this.setState({
        showOrder: false,
      });
    }
  }

  handleSubmitOrder = () => {
    const { form, submitting } = this.state;
    const { dispatch } = this.props;

    if (submitting) return;

    this.setState({
      submitting: true,
    });

    const order = Object.keys(form).map(id => ({
      id,
      amount: form[id].count,
    }));
    dispatch({
      type: 'product/buy',
      payload: {
        order,
      },
      onSuccess: () => {
        message.success('購買成功');
        this.setState({
          submitting: false,
          showOrder: false,
        });
        dispatch({
          type: 'utils/refreshPage',
        });
      },
      onFail: () => {
        this.setState({
          submitting: false,
        });
      },
    });
  }

  handleProductCountChange(product, e) {
    const { form } = this.state;
    const { value } = e.target;
    const reg = /^[0-9]+$/;
    if ((!Number.isNaN(value) && reg.test(value)) || value === '') {
      this.setState({
        form: {
          ...form,
          [product.id]: {
            product,
            count: value,
          },
        },
      });
    }
  }

  handleProductCountClick(product, number) {
    const { form } = this.state;
    const value = form[product.id];
    if (!value) {
      this.setState({
        form: {
          ...form,
          [product.id]: {
            product,
            count: '1',
          },
        },
      });
    } else {
      const newCount = Math.max(parseInt(value.count, 10) + number, 0);
      this.setState({
        form: {
          ...form,
          [product.id]: {
            product,
            count: newCount.toString(),
          },
        },
      });
    }
  }

  render() {
    const { list, accountInfo } = this.props;
    const {
      showOrder, form, submitting,
    } = this.state;
    const orderCost = this.getOrderCost();


    return (
      <div id="buy" className="container">
        <div className="item balance">
          <img className="logo" src={buyUsdtImg} alt="" />
          <div className="center">
            <div className="txid">{accountInfo.usdt_balance} <span>USDT</span></div>
            <div className="time">可用金额</div>
          </div>
          <div className="amount">
            <Link to="/deposit/usdt">去充值</Link>
          </div>
        </div>

        <div className="product-group-title">租赁算力包（无忧控矿，到期押金全退）</div>
        {list.rent_products && this.getItemList(list.rent_products)}
        <div className="product-group-title">购买矿机</div>
        {list.buy_products && this.getItemList(list.buy_products)}
        <div className="product-group-title">购买矿机（限时预约，付款后20天后开始产生收益）</div>
        {list.reservation_buy_products && this.getItemList(list.reservation_buy_products)}
        <div className="product-group-title">矿场机位（限时预约，付款后80天后开始产生收益）</div>
        {list.buy_position_products && this.getItemList(list.buy_position_products)}


        <div className="footer">
          <div className="info-container">
            <div className="info">
              <div className="cost">合計：{orderCost} USDT</div>
            </div>
          </div>
          <div className="btn-container">
            <div className="btn" onClick={this.handleShowOrder}>确认订单</div>
          </div>
        </div>
        {showOrder && (
          <div className="order-modal" onClick={this.handleCloseModal}>
            <div className="order-container">
              {Object.keys(form).map(id => form[id]).map(order => (
                <div className="item balance" key={order.product.id}>
                  <div className="logo">
                    <img src={icons[order.product.currency.toLowerCase()]} alt="" />
                  </div>
                  <div className="center">
                    <div className="txid">{order.product.power}T ({order.product.days}天/期)</div>
                    <div className="time">{order.product.price} USDT</div>
                  </div>
                  <div className="amount check">X{order.count}</div>
                </div>
              ))}
              <div className="submit" onClick={this.handleSubmitOrder}>
                {submitting ? (
                  <Spin />
                ) : (
                  `提交订单 (合计${orderCost} USDT)`
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps({ product, account }) {
  const { account: accountInfo } = account;

  return {
    list: product.products,
    canBuy: product.canBuy,
    accountInfo,
  };
}

export default connect(mapStateToProps)(Buy);
