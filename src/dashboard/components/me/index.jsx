/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'dva';
import { Link } from 'dva/router';

import './style.scss';

// images
import avatarImg from '../../../assets/me_avatar.svg';
import linkImg1 from '../../../assets/me_link_1.svg';
import linkImg2 from '../../../assets/me_link_2.svg';
import linkImg3 from '../../../assets/me_link_3.svg';
import linkImg4 from '../../../assets/me_link_4.svg';
import linkImg5 from '../../../assets/me_link_5.svg';
import linkImg6 from '../../../assets/me_link_6.svg';

class Me extends Component {
  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'account/logout',
    });
  }

  render() {
    const { userInfo } = this.props;
    return (
      <div id="me" className="container">
        <div className="avatar-container">
          <img src={avatarImg} alt="" />
          <div className="nickname">{userInfo.nickname}</div>
        </div>
        <div className="divider" />
        <div className="link">
          <span className="icon"><img src={linkImg1} alt="" /></span>
          <Link to="/changeWithdrawPassword">钱包设置</Link>
        </div>
        <div className="link">
          <span className="icon"><img src={linkImg2} alt="" /></span>
          <Link to="/changePassword">安全设置</Link>
        </div>
        <div className="link">
          <span className="icon"><img src={linkImg3} alt="" /></span>
          <Link to="/about">关于我们</Link>
        </div>
        <div className="link">
          <span className="icon"><img src={linkImg4} alt="" /></span>
          <Link to="/post/qa">常见问题</Link>
        </div>
        <div className="link">
          <span className="icon"><img src={linkImg5} alt="" /></span>
          <Link to="/me">联系我们</Link>
        </div>
        <div className="link">
          <span className="icon"><img src={linkImg6} alt="" /></span>
          <Link to="/invite">APP下载</Link>
        </div>
        {/* <div className="link-list">
          <Link to="/invite" className="link">
            <div>邀请好友</div>
            <div>&gt;</div>
          </Link>
          <Link to="/miners" className="link">
            <div>矿工管理</div>
            <div>&gt;</div>
          </Link>
          <Link to="/subuser" className="link">
            <div>我的矿工</div>
            <div>&gt;</div>
          </Link>
        </div> */}
        <div className="logout">
          <a onClick={this.handleLogout}>退出登录</a>
        </div>
        <div className="version">
          {__VERSION__}
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

export default connect(mapStateToProps)(Me);
