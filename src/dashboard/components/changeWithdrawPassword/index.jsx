/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-is-valid */
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

import scanImg from '../../../assets/withdraw_scan.svg';


// images
class ChangePassword extends Component {
  state = {
    old_password: '',
    password: '',
    password_confirmation: '',
  }

  handleSubmit = () => {
    const {
      old_password, password, password_confirmation,
    } = this.state;
    const { dispatch } = this.props;
    if (password !== password_confirmation) {
      message.error('两次输入密码不一致');
      return;
    }
    const payload = {
      old_password, password, password_confirmation,
    };
    dispatch({
      type: 'account/changeWithdrawPassword',
      payload,
    });
  }

  handleChange(key, e) {
    this.setState({
      [key]: e.target.value,
    });
  }

  canSubmit() {
    const {
      old_password, password, password_confirmation,
    } = this.state;
    return old_password !== ''
      && password !== ''
      && password_confirmation !== '';
  }

  render() {
    const {
      old_password, password, password_confirmation,
    } = this.state;

    return (
      <div id="signup" className="container">
        <div className="form">
          <InputRow label="旧密码" type="password" placeholder="请输入旧密码" value={old_password} onChange={this.handleChange.bind(this, 'old_password')} />
          <InputRow label="新密码" type="password" placeholder="8-20位数字或字母" value={password} onChange={this.handleChange.bind(this, 'password')} />
          <InputRow label="新密码确认" type="password" placeholder="请再次输入新密码" value={password_confirmation} onChange={this.handleChange.bind(this, 'password_confirmation')} />
        </div>
        <div className="submit">
          <button className="btn" disabled={!this.canSubmit()} onClick={this.handleSubmit}>修改提现密码</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(ChangePassword);
