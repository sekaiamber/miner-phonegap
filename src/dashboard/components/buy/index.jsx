/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import classnames from 'classnames';
import Decimal from 'decimal.js-light';
import { connect } from 'dva';
import message from '../../../utils/message';

import './style.scss';

// images
import blockHeightImg from '../../../assets/block_height.svg';

class Buy extends Component {
  state = {
    selected: undefined,
    showOrder: false,
  }

  getOrderCost() {
    const { accountInfo } = this.props;
    const { selected } = this.state;
    if (!selected) {
      return {
        discount: '0',
        cost: '0',
      };
    }
    const activityBalance = new Decimal(accountInfo.activity_balance);
    const price = new Decimal(selected.price);
    if (price.lessThan(activityBalance)) {
      return {
        discount: selected.price,
        cost: '0',
      };
    }
    return {
      discount: accountInfo.activity_balance,
      cost: price.minus(activityBalance).toString(),
    };
  }

  handleShowOrder = () => {
    this.setState({
      showOrder: true,
    });
  }

  handleCloseModal = (e) => {
    if (e.currentTarget === e.target) {
      this.setState({
        showOrder: false,
      });
    }
  }

  handleSubmitOrder = () => {
    const { selected } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'product/buy',
      payload: {
        product_id: selected.id,
      },
      onSuccess: () => {
        message.success('購買成功');
      },
    });
  }

  handleSelect(id) {
    this.setState({
      selected: id,
    });
  }

  render() {
    const { list } = this.props;
    const { selected, showOrder } = this.state;
    const orderCost = this.getOrderCost();
    const selectId = selected ? selected.id : undefined;

    return (
      <div id="buy">
        <div className="list container">
          {list.map(item => (
            <div className={classnames('item', { selected: item.id === selectId })} key={item.id} onClick={this.handleSelect.bind(this, item)}>
              <div className="lv">
                <svg xmlns="http://www.w3.org/200/svg" height="44" width="44">
                  <circle cx="22" cy="22" r="20" fill="none" stroke="#ececec" strokeWidth="3" strokeLinecap="round" />
                  <circle
                    className="demo2"
                    cx="22"
                    cy="22"
                    r="20"
                    fill="none"
                    stroke="#fd9840"
                    strokeWidth="3"
                  />
                </svg>
                <span className="text"><span>P</span>{parseInt(item.vip_level.slice(1), 10)}</span>
              </div>
              <div className="center">
                <div className="data">{item.power} ph/s</div>
                <div className="rate">預計收益率{item.rate}/天，{item.days}天</div>
              </div>
              <div className="price">{item.price}</div>
            </div>
          ))}
        </div>
        {selected && (
          <div className="footer">
            <div className="info-container">
              <div className="info">
                <div className="cost">合計：{orderCost.cost}</div>
                <div className="discount">可抵扣：{orderCost.discount}</div>
              </div>
            </div>
            <div className="btn-container">
              <div className="btn" onClick={this.handleShowOrder}>去計算</div>
            </div>
          </div>
        )}
        {showOrder && (
          <div className="order-modal" onClick={this.handleCloseModal}>
            <div className="order-container">
              <div className="item">
                <div>訂單金額：</div>
                <div>{selected ? selected.price : '0'}</div>
              </div>
              <div className="item">
                <div>抵扣</div>
                <div>{orderCost.discount}</div>
              </div>
              <div className="item">
                <div>合計</div>
                <div>{orderCost.cost}</div>
              </div>
              <div className="order-submit">
                <div className="btn" onClick={this.handleSubmitOrder}>提交訂單</div>
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
