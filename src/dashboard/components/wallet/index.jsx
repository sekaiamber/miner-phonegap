/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Spin } from 'antd';
import './style.scss';

// images
import walletBaseImg from '../../../assets/wallet_base.svg';
import walletBase2Img from '../../../assets/wallet_base_2.svg';
import walletUsdtImg from '../../../assets/wallet_usdt.png';
import walletQrImg from '../../../assets/wallet_qr.svg';
import walletDepImg from '../../../assets/wallet_deposit.svg';
import walletWitImg from '../../../assets/wallet_withdraw.svg';

class Wallet extends Component {
  state = {
    use: 'usdt',
  }

  getUseWallet() {
    const { use } = this.state;
    const {
      userInfo, accountInfo, prices, block,
    } = this.props;
    const info = {
      unit: use.toUpperCase(),
      address: '',
      balance: '',
      logo: '',
      block: null,
    };
    if (use === 'usdt') {
      info.address = userInfo.usdt_payment_address;
      info.balance = accountInfo.usdt_balance;
      info.logo = walletUsdtImg;
      info.unitValue = prices.usdt.cny;
    } else if (use === 'btc') {
      info.address = '';
      info.balance = accountInfo.btc_balance;
      info.logo = walletBase2Img;
      info.unitValue = prices[use].usdt;
      info.block = block.btc;
    } else if (use === 'ltc') {
      info.address = '';
      info.balance = accountInfo.ltc_balance;
      info.logo = walletBase2Img;
      info.unitValue = prices[use].usdt;
      info.block = block.ltc;
    }
    return info;
  }

  handleGotoDeposit = () => {
    const { use } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'utils/goto',
      goto: '/deposit/' + use,
    });
  }

  handleChangeUse(use) {
    this.setState({
      use,
    });
  }

  render() {
    const { use } = this.state;
    const useWallet = this.getUseWallet();

    return (
      <div id="wallet" className="container">
        <div className="top-select">
          <span>
            <span className={classnames('option', { active: use === 'usdt' })} onClick={this.handleChangeUse.bind(this, 'usdt')}>USDT</span>
            <span className={classnames('option', { active: use === 'btc' })} onClick={this.handleChangeUse.bind(this, 'btc')}>BTC</span>
            <span className={classnames('option', { active: use === 'ltc' })} onClick={this.handleChangeUse.bind(this, 'ltc')}>LTC</span>
          </span>
        </div>
        <div className={classnames('card', { usdt: use === 'usdt' })}>
          <div className="top">{useWallet.unit}</div>
          <div className="amount">{parseFloat(useWallet.balance).toFixed(2)}</div>
          <div className="value">
            <span>
              {use === 'usdt' ? (
                `${parseFloat(useWallet.balance * useWallet.unitValue).toFixed(2)} CNY`
              ) : (
                `$ ${parseFloat(useWallet.balance * useWallet.unitValue).toFixed(2)}`
              )}
            </span>
          </div>
        </div>
        {useWallet.block && (
          <div className="info">
            <div className="row">
              <div className="me">
                <div className="key">999T</div>
                <div className="value">我的{useWallet.unit}算力</div>
              </div>
              <div className="block">
                <div className="key">{useWallet.block.hashRate}</div>
                <div className="value">{useWallet.unit}全网算力</div>
              </div>
            </div>
            <div className="row">
              <div className="me">
                <div className="key">0.2222 BTC</div>
                <div className="value">我的{useWallet.unit}矿池收益</div>
              </div>
              <div className="block">
                <div className="key">{useWallet.block.difficulty}</div>
                <div className="value">{useWallet.unit}全网难度</div>
              </div>
            </div>
          </div>
        )}
        <div className="opt">
          {use === 'usdt' && (
            <Link className="opt-btn" to={`/deposit/${use}`}>
              充值
            </Link>
          )}
          <Link className="opt-btn" to={`/withdraw/${use}`}>
            提現
          </Link>
        </div>
        <Link className="big" to="/buy">矿机租赁</Link>
        <Link className="big" to="/orders">我的矿机</Link>
      </div>
    );
  }
}

function mapStateToProps({ account, market }) {
  const {
    userInfo, account: accountInfo,
  } = account;

  return {
    userInfo,
    accountInfo,
    block: market.block,
    prices: market.prices,
  };
}

export default connect(mapStateToProps)(Wallet);
