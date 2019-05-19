import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Markets from './markets';
import Board from './board';
import Activities from './activities';

import './style.scss';

// images
import blockHeightImg from '../../../assets/block_height.svg';
import blockPowerImg from '../../../assets/block_power.svg';
import optBuyPowerImg from '../../../assets/opt_buy_power.svg';
import optAddPowerImg from '../../../assets/opt_add_power.svg';


class Index extends Component {
  render() {
    const {
      prices, block, boardData, acitivies, autoReceive,
    } = this.props;

    return (
      <div>
        <div id="home">
          <div className="block-info">
            <div>
              <span className="wrapper">
                <span><img src={blockHeightImg} alt="" /></span>
                <span>{block.height}</span>
              </span>
            </div>
            <div>
              <span className="wrapper">
                <span><img src={blockPowerImg} alt="" /></span>
                <span>{block.power}</span>
              </span>
            </div>
          </div>
          <Activities data={acitivies} />
          <div className="opt container">
            <div className={classnames('switch', { on: autoReceive })}>
              <span>自動領取</span>
            </div>
            <div className="center" />
            <Link to="/buy"><img src={optBuyPowerImg} alt="" /></Link>
            <Link to="/invite"><img src={optAddPowerImg} alt="" /></Link>
          </div>
          <div className="container desc">注：超過72小時未領取的幣將被銷毀</div>
        </div>
        <Board data={boardData} />
        <Markets data={prices} />
      </div>
    );
  }
}

function mapStateToProps({ market, account }) {
  const {
    userInfo, account: accountInfo, acitiviesYesterday, acitivies,
  } = account;

  const boardData = {
    myPower: userInfo.power,
    myBase: accountInfo.balance,
    rewardPower: acitiviesYesterday,
    deductionBase: accountInfo.activity_balance,
  };

  return {
    prices: market.prices,
    block: market.block,
    boardData,
    acitivies,
    autoReceive: userInfo.auto_receive,
  };
}

export default connect(mapStateToProps)(Index);
