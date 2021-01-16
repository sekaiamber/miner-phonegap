/* eslint-disable react/button-has-type */
/* eslint-disable camelcase */
/* eslint-disable react/no-array-index-key */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import classnames from 'classnames';
import Decimal from 'decimal.js-light';
import { connect } from 'dva';
import message from '../../../utils/message';
import InputRow from '../common/inputRow';

import './style.scss';

import scanImg from '../../../assets/withdraw_scan.svg';

const phoneReg = /^1\d{10}$/;

let handler;

// images
class ForgetPassword extends Component {
  state = {
    phone_number: '',
    password: '',
    password_confirmation: '',
    verify_code: '',
    counting: 0,
  }

  componentWillMount() {
    if (handler) {
      clearTimeout(handler);
    }
  }

  handleSubmit = () => {
    const {
      phone_number, password, password_confirmation, verify_code,
    } = this.state;
    const { dispatch } = this.props;
    const payload = {
      phone_number, password, password_confirmation, verify_code,
    };
    dispatch({
      type: 'utils/resetPassword',
      payload,
    });
  }

  handleSendSms = () => {
    const { phone_number } = this.state;
    const { dispatch } = this.props;
    if (!phoneReg.test(phone_number)) {
      message.error('请输入正确的手机号');
      return;
    }
    dispatch({
      type: 'utils/sendResetSms',
      payload: {
        phone_number,
      },
      onSuccess: () => {
        this.handleCountDown(true);
      },
    });
  }

  handleChange(key, e) {
    this.setState({
      [key]: e.target.value,
    });
  }

  canSubmit() {
    const {
      phone_number, password, password_confirmation, verify_code,
    } = this.state;
    return phone_number !== ''
      && password !== ''
      && password_confirmation !== ''
      && verify_code !== '';
  }

  handleCountDown(start) {
    const { counting } = this.state;
    if (start) {
      this.setState({
        counting: 60,
      });
      handler = setTimeout(this.handleCountDown.bind(this), 1000);
    } else if (counting > 0) {
      this.setState({
        counting: counting - 1,
      });
      handler = setTimeout(this.handleCountDown.bind(this), 1000);
    }
  }

  render() {
    const {
      phone_number, password, password_confirmation, verify_code, counting,
    } = this.state;

    return (
      <div id="forgetPassword" className="container">
        <div className="form">
          <InputRow label="登录手机号码" type="number" placeholder="请输入手机号码" value={phone_number} onChange={this.handleChange.bind(this, 'phone_number')} />
          <InputRow
            label="验证码"
            type="text"
            placeholder="请输入验证码"
            value={verify_code}
            onChange={this.handleChange.bind(this, 'verify_code')}
            extra={(
              <button onClick={this.handleSendSms} disabled={counting > 0}>
                {counting > 0 ? counting : '发送验证码'}
              </button>
            )}
          />
          <InputRow label="新密码" type="password" placeholder="8-20位数字或字母" value={password} onChange={this.handleChange.bind(this, 'password')} />
          <InputRow label="确认密码" type="password" placeholder="请再次输入新密码" value={password_confirmation} onChange={this.handleChange.bind(this, 'password_confirmation')} />
        </div>
        <div className="submit">
          <button className="btn" disabled={!this.canSubmit()} onClick={this.handleSubmit}>重置密码</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}
export default connect(mapStateToProps)(ForgetPassword);
