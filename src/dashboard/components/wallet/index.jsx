/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Spin, Icon } from 'antd';
import AutoFontSizeDiv from '../common/autoFontSizeDiv';
import './style.scss';

// images
import walletBaseImg from '../../../assets/wallet_base.svg';
import walletBase2Img from '../../../assets/wallet_base_2.svg';
import walletUsdtImg from '../../../assets/wallet_usdt.png';
import walletWitImg from '../../../assets/wallet-withdraw.svg';
import walletDepImg from '../../../assets/wallet-deposit.svg';
import walletTraImg from '../../../assets/wallet-transfer.svg';

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
      earnings: '',
      power: '',
      lock: '',
      block: null,
    };
    if (use === 'usdt') {
      info.address = userInfo.usdt_payment_address;
      info.balance = accountInfo.usdt_balance;
      info.locked = accountInfo.usdt_locked;
      info.logo = walletUsdtImg;
      info.unitValue = prices.usdt.cny;
    } else if (use === 'btc') {
      info.address = '';
      info.balance = accountInfo.btc_balance;
      info.locked = accountInfo.btc_locked;
      info.logo = walletBase2Img;
      info.unitValue = prices[use].usdt;
      info.block = block.btc;
      info.earnings = accountInfo.btc_total_earnings;
      info.power = accountInfo.btc_total_power;
    } else if (use === 'ltc') {
      info.address = '';
      info.balance = accountInfo.ltc_balance;
      info.locked = accountInfo.ltc_locked;
      info.logo = walletBase2Img;
      info.unitValue = prices[use].usdt;
      info.block = block.ltc;
      info.earnings = accountInfo.ltc_total_earnings;
      info.power = accountInfo.ltc_total_power;
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

  handleExperience = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'account/experience',
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
    const { accountInfo } = this.props;

    return (
      <div id="wallet" className="container">
        <div className="top-select">
          <span>
            <span className={classnames('option', { active: use === 'usdt' })} onClick={this.handleChangeUse.bind(this, 'usdt')}>USDT</span>
            <span className={classnames('option', { active: use === 'btc' })} onClick={this.handleChangeUse.bind(this, 'btc')}>BTC</span>
            <span className={classnames('option', { active: use === 'ltc' })} onClick={this.handleChangeUse.bind(this, 'ltc')}>LTC</span>
          </span>
        </div>
        <div className={classnames('pad', use)}>
          <div className="name">可用余额</div>
          <div className="amount">{useWallet.balance || '0'}</div>
          <div className="locked">
            <div>锁定余额 {useWallet.locked || '0'} {use.toUpperCase()}</div>
          </div>
        </div>
        {useWallet.block && (
          <div className="info">
            <div className="row">
              <div className="me">
                <div className="key">{useWallet.power}T</div>
                <div className="value">我的{useWallet.unit}算力</div>
              </div>
              <div className="block">
                <div className="key">{useWallet.block.hashRate}</div>
                <div className="value">{useWallet.unit}全网算力</div>
              </div>
            </div>
            <div className="row">
              <div className="me">
                <div className="key">{useWallet.earnings} {useWallet.unit}</div>
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
              <button><img src={walletDepImg} /><span>充值</span></button>
            </Link>
          )}
          <Link className="opt-btn" to={`/withdraw/${use}`}>
            <button><img src={walletWitImg} /><span>提现</span></button>
          </Link>
          <Link className="opt-btn" to={`/transfer/${use}`}>
            <button><img src={walletTraImg} /><span>转账</span></button>
          </Link>
        </div>
        <Link className="big" to="/buy">
          <div className="icon">
            <Icon type="transaction" />
          </div>
          <div className="text">
            <div className="title">算力租赁</div>
            <div className="desc tx-weak">多种选择，更加优惠</div>
          </div>
          <Icon type="right" />
        </Link>
        <Link className="big" to="/orders">
          <div className="icon">
            <Icon type="account-book" />
          </div>
          <div className="text">
            <div className="title">我的算力</div>
            <div className="desc tx-weak">立即查看我的算力</div>
          </div>
          <Icon type="right" />
        </Link>
        {accountInfo.can_experience && (
          <a className="big" onClick={this.handleExperience}>
            <div className="icon">
              <Icon type="gift" />
            </div>
            <div className="text">
              <div className="title">体验矿机</div>
              <div className="desc tx-weak">立即体验云矿机</div>
            </div>
            <Icon type="right" />
          </a>
        )}
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
