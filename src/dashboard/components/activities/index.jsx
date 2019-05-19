/* eslint-disable react/no-array-index-key */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'dva';

import './style.scss';

import walletBaseImg from '../../../assets/wallet_base.svg';

// images
class Activities extends Component {
  render() {
    const { list } = this.props;

    return (
      <div id="myActivities" className="container">
        {list.map(item => (
          <div className="item" key={item.id}>
            <img className="logo" src={walletBaseImg} alt="" />
            <div className="center">
              <div className="txid">{item.title}</div>
              <div className="time">{item.time}</div>
            </div>
            <div className="amount">{item.amount}</div>
          </div>
        ))}
      </div>
    );
  }
}

function mapStateToProps({ account }) {
  return {
    list: account.acitiviesDone,
  };
}

export default connect(mapStateToProps)(Activities);
