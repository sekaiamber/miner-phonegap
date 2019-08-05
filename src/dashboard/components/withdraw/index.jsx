/* eslint-disable camelcase */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/no-array-index-key */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import classnames from 'classnames';
import Decimal from 'decimal.js-light';
import { connect } from 'dva';
import { Spin } from 'antd';
import message from '../../../utils/message';

import './style.scss';

import scanImg from '../../../assets/withdraw_scan.svg';

// images
class Withdraw extends Component {
  state = {
    to: '',
    amount: '',
    withdraw_password: '',
    verify_code: '',
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    let currency = 'usdt';
    if (match && match.params) {
      currency = match.params.currency;
    }
    dispatch({
      type: 'account/queryWithdraws',
      payload: currency.toUpperCase(),
    });
  }

  getUseWallet() {
    const { match, data } = this.props;
    let currency = 'usdt';
    if (match && match.params) {
      currency = match.params.currency;
    }
    const info = {
      unit: currency.toUpperCase(),
      balance: '',
    };
    if (currency === 'usdt') {
      info.balance = data.usdt_balance;
    } else {
      info.balance = data[`${currency}_balance`];
    }
    return info;
  }

  getFee() {
    const { match, fee } = this.props;
    let currency = 'usdt';
    if (match && match.params) {
      currency = match.params.currency;
    }
    return fee[currency];
  }

  getFinal() {
    const { amount } = this.state;
    const fee = this.getFee();
    let final = '0';
    if (amount && new Decimal(amount).greaterThan(fee)) {
      final = new Decimal(amount).minus(fee).toString();
    }
    return final;
  }

  handleChangeTo = (e) => {
    this.setState({
      to: e.target.value,
    });
  }

  handleChangeAmount = (e) => {
    this.setState({
      amount: e.target.value,
    });
  }

  handleChangeWithdrawPassword = (e) => {
    this.setState({
      withdraw_password: e.target.value,
    });
  }

  handleChangeVerifyCode = (e) => {
    this.setState({
      verify_code: e.target.value,
    });
  }

  handleScan = () => {
    const { cordova } = window;
    if (cordova && cordova.plugins.barcodeScanner) {
      cordova.plugins.barcodeScanner.scan(this.handleScanSuccess, (error) => {
        message.error(error);
      }, {
        formats: 'QR_CODE',
      });
    } else {
      message.error('初始化相機失敗，請手工輸入');
    }
  }

  handleScanSuccess = (result) => {
    // message.success('We got a barcode\n'
    //   + 'Result: ' + result.text + '\n'
    //   + 'Format: ' + result.format + '\n'
    //   + 'Cancelled: ' + result.cancelled);
    const to = result.text || '';
    this.setState({
      to,
    });
  }

  handleSubmit = () => {
    const {
      to, amount, withdraw_password, verify_code,
    } = this.state;
    const { dispatch, match } = this.props;
    let currency;
    if (match && match.params) {
      currency = match.params.currency;
    }
    if (!currency) return;
    const payload = {
      to,
      amount,
      currency: currency.toUpperCase(),
      withdraw_password,
      verify_code,
    };
    dispatch({
      type: 'account/submitWithdraw',
      payload,
    });
  }

  handleSendSms = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'account/sendWithdrawSms',
    });
  }

  canSubmit() {
    const {
      to, amount, withdraw_password, verify_code,
    } = this.state;
    const { match } = this.props;
    let currency = 'base';
    if (match && match.params) {
      currency = match.params.currency;
    }
    if (currency) {
      return !(to !== '' && amount !== '' && new Decimal(amount).greaterThan(new Decimal('5')));
    }
    return !(to !== '' && amount !== '' && new Decimal(amount).greaterThan(new Decimal('20')));
  }

  render() {
    const {
      to, amount, withdraw_password, verify_code,
    } = this.state;
    const useWallet = this.getUseWallet();
    const { history } = this.props;

    return (
      <div id="withdraw" className={classnames('container', { usdt: useWallet.unit === 'USDT' })}>
        <div className="banner">
          <div>可提現餘額</div>
          <div>{useWallet.balance} {useWallet.unit}</div>
        </div>
        <div className="form">
          <div className="item">
            <input type="text" placeholder="提現地址" value={to} onChange={this.handleChangeTo} />
            <img className="scan-btn" src={scanImg} alt="" onClick={this.handleScan} />
          </div>
          <div className="item">
            <input type="number" placeholder="提現金額" value={amount} onChange={this.handleChangeAmount} />
          </div>
          <div className="item">
            <input type="text" placeholder="提現密码" value={withdraw_password} onChange={this.handleChangeWithdrawPassword} />
          </div>
          <div className="item verify">
            <input type="number" placeholder="手机验证码" value={verify_code} onChange={this.handleChangeVerifyCode} />
            <a onClick={this.handleSendSms}>發送驗證碼</a>
          </div>
          <div className="item">
            <div className="form-info">
              <div>手續費</div>
              <div>{this.getFee()} {useWallet.unit}</div>
            </div>
          </div>
          <div className="item">
            <div className="form-info">
              <div>到賬金額</div>
              <div>{this.getFinal()} {useWallet.unit}</div>
            </div>
          </div>
        </div>
        <div className="submit">
          <button className="btn" disabled={this.canSubmit()} onClick={this.handleSubmit}>確認提現</button>
        </div>
        <div className="page-title">提现歷史</div>
        <div className="history">
          {history === 'LOADING' ? (
            <div className="loading">
              <Spin />
            </div>
          ) : (
            history.map((item, i) => (
              <div className="item" key={item.type + i}>
                <img className="logo" src={useWallet.logo} alt="" />
                <div className="center">
                  <div className="txid">{item.txid || '等待中'}</div>
                  <div className="time">{item.created_at}</div>
                </div>
                <div className="amount">
                  {item.type === 'deposits' ? '+' : '-'}{item.amount}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ account, market }) {
  const { account: data, history } = account;

  return {
    data,
    history,
    fee: market.fee,
  };
}
export default connect(mapStateToProps)(Withdraw);
