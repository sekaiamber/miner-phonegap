/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import classnames from 'classnames';

// images
import usdtImg from '../../../assets/usdt2.svg';
import ltcImg from '../../../assets/ltc2.svg';
import btcImg from '../../../assets/btc2.svg';

export default function Markets(props) {
  const { data } = props;
  const { ltc, btc, usdt } = data;
  return (
    <div id="markets" className="container">
      <div className="item">
        <div className="icon"><img src={btcImg} alt="" /></div>
        <div className="info">
          <div className="name">
            <div className="coin">Bitcoin</div>
            <div className="symbol tx-weak">BTC</div>
          </div>
          <div className="price">
            <div className="usdt">$ {parseFloat(btc.usdt).toFixed(4)}</div>
            <div className="cny tx-weak">≈ {parseFloat(btc.cny).toFixed(4)} CNY</div>
          </div>
        </div>
      </div>
      <div className="item">
        <div className="icon"><img src={ltcImg} alt="" /></div>
        <div className="info">
          <div className="name">
            <div className="coin">Litecoin</div>
            <div className="symbol tx-weak">LTC</div>
          </div>
          <div className="price">
            <div className="usdt">$ {parseFloat(ltc.usdt).toFixed(4)}</div>
            <div className="cny tx-weak">≈ {parseFloat(ltc.cny).toFixed(4)} CNY</div>
          </div>
        </div>
      </div>
      <div className="item">
        <div className="icon"><img src={usdtImg} alt="" /></div>
        <div className="info">
          <div className="name">
            <div className="coin">Tether USD</div>
            <div className="symbol tx-weak">USDT</div>
          </div>
          <div className="price">
            <div className="usdt">{parseFloat(usdt.cny).toFixed(4)} CNY</div>
          </div>
        </div>
      </div>
    </div>
  );
}
