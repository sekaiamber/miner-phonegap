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
          <Link to="/">
            <div>
              <img src={activeNav === 0 ? homeActiveImg : homeImg} alt="" />
            </div>
            <div className="name">首頁</div>
          </Link>
        </div>
        <div className={classnames('item', { active: activeNav === 1 })}>
          <Link to="/power">
            <div>
              <img src={activeNav === 1 ? powerActiveImg : powerImg} alt="" />
            </div>
            <div className="name">算力</div>
          </Link>
        </div>
        <div className={classnames('item', { active: activeNav === 2 })}>
          <Link to="/buy">
            <div>
              <img src={activeNav === 2 ? buyActiveImg : buyImg} alt="" />
            </div>
            <div className="name">購買</div>
          </Link>
        </div>
        <div className={classnames('item', { active: activeNav === 3 })}>
          <Link to="/wallet">
            <div>
              <img src={activeNav === 3 ? walletActiveImg : walletImg} alt="" />
            </div>
            <div className="name">錢包</div>
          </Link>
        </div>
        <div className={classnames('item', { active: activeNav === 4 })}>
          <Link to="/me">
            <div>
              <img src={activeNav === 4 ? meActiveImg : meImg} alt="" />
            </div>
            <div className="name">我的</div>
          </Link>
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
