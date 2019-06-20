/* eslint-disable prefer-destructuring */
import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'dva';
import { Link } from 'dva/router';

// images
import homeImg from '../../../assets/m_home.svg';
import homeActiveImg from '../../../assets/m_home_active.svg';
import powerImg from '../../../assets/m_power.svg';
import powerActiveImg from '../../../assets/m_power_active.svg';
import buyImg from '../../../assets/m_buy.svg';
import buyActiveImg from '../../../assets/m_buy_active.svg';
import walletImg from '../../../assets/m_wallet.svg';
import walletActiveImg from '../../../assets/m_wallet_active.svg';
import meImg from '../../../assets/m_me.svg';
import meActiveImg from '../../../assets/m_me_active.svg';

import './style.scss';

class Footer extends Component {
  render() {
    const { config } = this.props;
    const { activeNav } = config;

    return (
      <footer className={classnames({ hide: activeNav === undefined })}>
        <div className={classnames('item', { active: activeNav === 0 })}>
          {activeNav === 0 ? (
            <div>
              <div className="active-container">
                <img src={homeActiveImg} alt="" />
              </div>
            </div>
          ) : (
            <Link to="/">
              <div>
                <img src={homeImg} alt="" />
              </div>
              <div className="name">首頁</div>
            </Link>
          )}
        </div>
        <div className={classnames('item', { active: activeNav === 1 })}>
          {activeNav === 1 ? (
            <div>
              <div className="active-container">
                <img src={powerActiveImg} alt="" />
              </div>
            </div>
          ) : (
            <Link to="/power">
              <div>
                <img src={powerImg} alt="" />
              </div>
              <div className="name">算力</div>
            </Link>
          )}
        </div>
        <div className={classnames('item', { active: activeNav === 2 })}>
          {activeNav === 2 ? (
            <div>
              <div className="active-container">
                <img src={buyActiveImg} alt="" />
              </div>
            </div>
          ) : (
            <Link to="/buy">
              <div>
                <img src={buyImg} alt="" />
              </div>
              <div className="name">購買</div>
            </Link>
          )}
        </div>
        <div className={classnames('item', { active: activeNav === 3 })}>
          {activeNav === 3 ? (
            <div>
              <div className="active-container">
                <img src={walletActiveImg} alt="" />
              </div>
            </div>
          ) : (
            <Link to="/wallet">
              <div>
                <img src={walletImg} alt="" />
              </div>
              <div className="name">錢包</div>
            </Link>
          )}
        </div>
        <div className={classnames('item', { active: activeNav === 4 })}>
          {activeNav === 4 ? (
            <div>
              <div className="active-container">
                <img src={meActiveImg} alt="" />
              </div>
            </div>
          ) : (
            <Link to="/me">
              <div>
                <img src={meImg} alt="" />
              </div>
              <div className="name">我的</div>
            </Link>
          )}
        </div>
      </footer>
    );
  }
}

function mapStateToProps({ utils }) {
  return {
    currentPath: utils.currentPath,
    config: utils.currentPathConfig.footer || {},
  };
}

export default connect(mapStateToProps)(Footer);
