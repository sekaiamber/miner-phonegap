/* eslint-disable react/button-has-type */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import classnames from 'classnames';
import { Link } from 'dva/router';
import { connect } from 'dva';
import AutoFontSizeDiv from '../common/autoFontSizeDiv';

import './style.scss';


class Power extends Component {
  render() {
    const { invite, subuser } = this.props;

    // json.(activity, :title, :description, :state, :can_receive?, :id)
    // json.amount activity.amount.round(4)
    // json.time activity.updated_at.strftime('%Y-%m-%d')
    // user = activity&.order&.user
    // json.nickname user&.nickname
    // json.user_id user&.id


    return (
      <div id="power" className="container">
        <div className="pad btc">
          <div className="name">BTC 昨日奖金</div>
          <div className="yesterday">{invite.yesterday_btc_total || '0'}</div>
          <div className="total">
            <div>总奖金 {invite.btc_total || '0'} BTC</div>
          </div>
        </div>
        <div className="pad usdt">
          <div className="name">USDT 昨日奖金</div>
          <div className="yesterday">{invite.yesterday_usdt_total || '0'}</div>
          <div className="total">
            <div>总奖金 {invite.usdt_total || '0'} USDT</div>
          </div>
        </div>
        <div className="pad ltc">
          <div className="name">LTC 昨日奖金</div>
          <div className="yesterday">{invite.yesterday_ltc_total || '0'}</div>
          <div className="total">
            <div>总奖金 {invite.ltc_total || '0'} LTC</div>
          </div>
        </div>

        <div>
          <Link className="invite-btn" to="/invite"><button>邀请矿友</button></Link>
        </div>
        <div>
          {subuser.map((item, i) => (
            <div className={`item ${item.can_withdraw ? 'vip' : ''}`} key={i}>
              <div className="center">
                <div className="txid">{item.nickname}</div>
                {/* <div className="time">{item.phone_number}</div> */}
              </div>
              <div className="amount">{item.phone_number}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ account }) {
  const {
    subuser,
    invite
  } = account;

  return {
    subuser,
    invite
  };
}

export default connect(mapStateToProps)(Power);
