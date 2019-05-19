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
      message.success('成功');
    }, () => {
      message.error('失敗');
    });
  }

  render() {
    const { userInfo } = this.props;
    console.log(userInfo);

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
