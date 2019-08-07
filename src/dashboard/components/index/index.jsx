/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'dva';
import { Carousel } from 'antd';
import { Link } from 'dva/router';
import Markets from './markets';

import './style.scss';

// images
// import blockHeightImg from '../../../assets/block_height.svg';
// import blockPowerImg from '../../../assets/block_power.svg';
import optBuyPowerImg from '../../../assets/opt_buy_power.svg';
import optAddPowerImg from '../../../assets/opt_add_power.svg';
import menuImg from '../../../assets/index_menu.svg';
import menu1Img from '../../../assets/index_menu_1.svg';
import menu2Img from '../../../assets/index_menu_2.svg';
import refreshImg from '../../../assets/index_refresh.svg';


class Index extends Component {
  state = {
    use: 'btc',
  }

  getUseWallet = () => {
    const { account } = this.props;
    const { use } = this.state;
    if (use === 'btc') {
      return {
        name: 'BTC',
        yesterday: account.btc_yesterday_earnings,
        total: account.btc_total_earnings,
      };
    }
    return {
      name: 'LTC',
      yesterday: account.ltc_yesterday_earnings,
      total: account.ltc_total_earnings,
    };
  }

  handleAutoReceive = () => {
    const { autoReceive, dispatch } = this.props;
    dispatch({
      type: 'account/changeAutoReceive',
      payload: !autoReceive,
    });
  }

  handleRedirect(goto) {
    const { dispatch } = this.props;
    dispatch({
      type: 'utils/goto',
      goto,
    });
  }

  handleChangeUse(use) {
    this.setState({
      use,
    });
  }

  render() {
    const {
      prices, banners,
    } = this.props;
    const { use } = this.state;
    const useWallet = this.getUseWallet();

    return (
      <div id="home">
        <div id="banners">
          <Carousel autoplay>
            {banners.map((banner, i) => (
              <div className="banner" key={i}>
                <div style={{ backgroundImage: `url(${banner.image})` }} />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="pad">
          <div className="top-select">
            <span>
              <span className={classnames('option', { active: use === 'btc' })} onClick={this.handleChangeUse.bind(this, 'btc')}>BTC</span>
              <span className={classnames('option', { active: use === 'ltc' })} onClick={this.handleChangeUse.bind(this, 'ltc')}>LTC</span>
            </span>
          </div>
          <div className="earn">
            <div className="name">{useWallet.name} 昨日收益</div>
            <div className="yesterday">{useWallet.yesterday}</div>
            <div className="total"><span>您在胖蚂蚁总计收获 {useWallet.total} {useWallet.name}</span></div>
          </div>
        </div>
        <Markets data={prices} />
      </div>
    );
  }
}

function mapStateToProps({ market, account, utils }) {
  return {
    prices: market.prices,
    block: market.block,
    banners: utils.banners,
    account: account.account,
  };
}

export default connect(mapStateToProps)(Index);
