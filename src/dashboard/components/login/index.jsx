/* eslint-disable react/destructuring-assignment */
import { connect } from 'dva';
import React, { Component } from 'react';
import logoImg from '../../../assets/logo.svg';

import './style.scss';

class NormalLoginForm extends Component {
  render() {
    return (
      <div id="login">
        <header className="no-login">
          <div className="title">賬戶登錄</div>
        </header>
        <div className="logo-container"><img src={logoImg} alt="" /></div>
        <div className="form">
          <div className="item">
            <input type="text" placeholder="請輸入您的手機號碼" />
          </div>
          <div className="item">
            <input type="password" placeholder="請輸入您的登錄密碼" />
          </div>
        </div>
        <div className="submit">
          <button>登 錄</button>
        </div>
        <div className="opts">
          <div><a href="#">忘記密碼</a></div>
          <div>還沒有賬戶？<a href="#">註冊</a></div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  logIn: (form, validation) => dispatch({ type: 'users/logIn', form, validation }),
});
export default connect(null, mapDispatchToProps)(NormalLoginForm);
