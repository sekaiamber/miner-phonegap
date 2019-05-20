/* eslint-disable react/no-array-index-key */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import classnames from 'classnames';
import Decimal from 'decimal.js-light';
import { connect } from 'dva';
import message from '../../../utils/message';

import './style.scss';

import scanImg from '../../../assets/withdraw_scan.svg';

// images
class Withdraw extends Component {
  state = {
    to: '',
    amount: '',
  }

  getFee() {
    const { amount } = this.state;
    let fee = '0';
    if (amount !== '') {
      fee = new Decimal(amount).mul(new Decimal('0.02'));
      if (fee.lessThan(new Decimal('20'))) {
        fee = '20';
      } else {
        fee = fee.toString();
      }
    }
    return fee;
  }

  getFinal() {
    const { amount } = this.state;
    let final = '0';
    if (amount !== '' && new Decimal(amount).greaterThan(new Decimal('20'))) {
      let fee = new Decimal(amount).mul(new Decimal('0.02'));
      if (fee.lessThan(new Decimal('20'))) {
        fee = new Decimal('20');
      }
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

  handleScan = () => {
    const scaner = window.QRScanner;
    if (!scaner) {
      message.error('初始化相機失敗，請手工輸入');
      return;
    }
    scaner.scan(this.handleScanSuccess);
    scaner.show();
  }

  handleScanSuccess(err, text) {
    if (err) {
      // an error occurred, or the scan was canceled (error code `6`)
    } else {
      this.setState({
        to: text,
      });
    }
  }

  canSubmit() {
    const { amount, to } = this.state;
    return !(to !== '' && amount !== '' && new Decimal(amount).greaterThan(new Decimal('20')));
  }

  render() {
    const { to, amount } = this.state;
    const { data } = this.props;
    console.log(data);

    return (
      <div id="withdraw" className="container">
        <div className="banner">
          <div>可提現餘額</div>
          <div>{data.balance}</div>
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
            <div className="form-info">
              <div>手續費</div>
              <div>{this.getFee()} BASE</div>
            </div>
          </div>
          <div className="item">
            <div className="form-info">
              <div>到賬金額</div>
              <div>{this.getFinal()} BASE</div>
            </div>
          </div>
        </div>
        <div className="submit">
          <button className="btn" disabled={this.canSubmit()}>確認提現</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ account }) {
  const { account: data } = account;

  return {
    data,
  };
}
export default connect(mapStateToProps)(Withdraw);
