/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'dva';
import Qrcode from '../common/qrcode';
import message from '../../../utils/message';
import saveImage from '../../../utils/saveImage';
import './style.scss';

import walletBaseImg from '../../../assets/wallet_base.svg';
import bitrabbitImg from '../../../assets/bitrabbit.svg';

// images
class Deposit extends Component {
  state = {
    url: '',
  }

  handleUrlChange = (url) => {
    this.setState({
      url,
    });
  }

  handleSaveImage = () => {
    const { url } = this.state;
    saveImage(url, () => {
      message.success('已成功保存到相冊');
    }, () => {
      message.error('自動保存失敗，請手動截屏');
    });
  }

  handleOpenBitrabbit = () => {
    if (window.cordova) {
      window.cordova.InAppBrowser.open('https://bitrabbit.io', '_system', 'location=yes');
    }
  }

  render() {
    const { userInfo } = this.props;

    return (
      <div id="deposit" className="container">
        <div className="banner">
          <img className="logo" src={walletBaseImg} alt="" />
          <div className="amount">BASE</div>
        </div>
        <div className="qrcode-container">
          {userInfo.payment_address && (
            <div className="qrcode"><Qrcode data={userInfo.payment_address} option={{ height: 250, width: 250, margin: 2 }} onUrlChange={this.handleUrlChange} /></div>
          )}
          <div className="btn" onClick={this.handleSaveImage}>保存二維碼</div>
          <div className="desc">BASE 充值地址</div>
          <div className="address clipboard-target" data-clipboard-text={userInfo.payment_address}>{userInfo.payment_address}</div>
        </div>
        <div className="bitrabbit">BASE 購買渠道</div>
        <div className="btn" onClick={this.handleOpenBitrabbit}>
          <img src={bitrabbitImg} alt="" />
        </div>
      </div>
    );
  }
}

function mapStateToProps({ account }) {
  const { userInfo } = account;

  return {
    userInfo,
  };
}
export default connect(mapStateToProps)(Deposit);
