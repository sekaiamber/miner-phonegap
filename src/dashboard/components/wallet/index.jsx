/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'dva';
import { Link } from 'dva/router';

import './style.scss';

// images
import walletBaseImg from '../../../assets/wallet_base.svg';
import walletQrImg from '../../../assets/wallet_qr.svg';
import walletDepImg from '../../../assets/wallet_deposit.svg';
import walletWitImg from '../../../assets/wallet_withdraw.svg';

class Wallet extends Component {
  handleGotoDeposit = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'utils/goto',
      goto: '/deposit',
    });
  }

  render() {
    const { userInfo, accountInfo, history } = this.props;

    return (
      <div id="wallet" className="container">
        <div className="card">
          <div className="top">
            <img className="logo" src={walletBaseImg} alt="" />
            <div className="address">
              <div className="currency">BASE</div>
              <div className="text">
                <span>{userInfo.payment_address}</span>
                <img src={walletQrImg} alt="" onClick={this.handleGotoDeposit} />
              </div>
            </div>
          </div>
          <div className="amount">{parseFloat(accountInfo.balance).toFixed(2)}</div>
        </div>
        <div className="opt">
          <Link className="opt-btn" to="/deposit">
            <img src={walletDepImg} alt="" />
            <span>充值</span>
          </Link>
          <Link className="opt-btn" to="/withdraw">
            <img src={walletWitImg} alt="" />
            <span>提現</span>
          </Link>
        </div>
        <div className="page-title">充提歷史</div>
        <div className="history">
          {history.map((item, i) => (
            <div className="item" key={item.type + i}>
              <img className="logo" src={walletBaseImg} alt="" />
              <div className="center">
                <div className="txid">{item.txid || '等待中'}</div>
                <div className="time">{item.created_at}</div>
              </div>
              <div className="amount">
                {item.type === 'deposits' ? '+' : '-'}{item.amount}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ account }) {
  const {
    userInfo, account: accountInfo, history,
  } = account;

  return {
    userInfo,
    accountInfo,
    history,
  };
}

export default connect(mapStateToProps)(Wallet);
