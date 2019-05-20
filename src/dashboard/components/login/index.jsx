/* eslint-disable react/destructuring-assignment */
import { connect } from 'dva';
import React, { Component } from 'react';
import logoImg from '../../../assets/logo.svg';
import message from '../../../utils/message';

import './style.scss';

class NormalLoginForm extends Component {
  state = {
    login: '',
    password: '',
  }

  handleChangeAccount = (e) => {
    this.setState({
      login: e.target.value,
    });
  }

  handleChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  }

  handleSubmit = () => {
    const { dispatch } = this.props;
    const { login, password } = this.state;
    if (login.length === 0) {
      message.error('請輸入手機號碼');
      return;
    }
    if (password.length === 0) {
      message.error('請輸入密碼');
      return;
    }
    dispatch({
      type: 'account/login',
      payload: {
        login,
        password,
      },
    });
  }

  render() {
    const { login, password } = this.state;

    return (
      <div id="login">
        <header className="no-login">
          <div className="title">賬戶登錄</div>
        </header>
        <div className="logo-container"><img src={logoImg} alt="" /></div>
        <div className="form">
          <div className="item">
            <input type="text" placeholder="請輸入您的手機號碼" value={login} onChange={this.handleChangeAccount} />
          </div>
          <div className="item">
            <input type="password" placeholder="請輸入您的登錄密碼" value={password} onChange={this.handleChangePassword} />
          </div>
        </div>
        <div className="submit">
          <button onClick={this.handleSubmit}>登 錄</button>
        </div>
        <div className="opts">
          <div><a href="#">忘記密碼</a></div>
          <div>還沒有賬戶？<a href="#">註冊</a></div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ utils }) {
  return {
    test: utils.test,
  };
}

export default connect(mapStateToProps)(NormalLoginForm);
