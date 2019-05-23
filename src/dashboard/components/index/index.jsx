/* eslint-disable jsx-a11y/click-events-have-key-events */
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
  handleAutoReceive = () => {
    const { autoReceive, dispatch } = this.props;
    dispatch({
      type: 'account/changeAutoReceive',
      payload: !autoReceive,
    });
  }

  render() {
    const {
      prices, block, boardData, acitivies, autoReceive,
    } = this.props;

    return (
      <div>
        <div id="home">
          <div className="block-info">
            <div className="item">
              <div className="wrapper">
                <div>
                  <div><img src={blockHeightImg} alt="" /></div>
                  <div>{block.height}</div>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="wrapper">
                <div>
                  <div><img src={blockPowerImg} alt="" /></div>
                  <div>{block.power}</div>
                </div>
              </div>
            </div>
          </div>
          <Activities data={acitivies} />
          <div className="opt container">
            <div className={classnames('switch', { on: autoReceive })} onClick={this.handleAutoReceive}>
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
