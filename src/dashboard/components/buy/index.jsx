/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'dva';

import './style.scss';

// images
import blockHeightImg from '../../../assets/block_height.svg';

class Buy extends Component {
  state = {
    selected: undefined,
  }

  handleSelect(id) {
    this.setState({
      selected: id,
    });
  }

  render() {
    const { canBuy, list } = this.props;
    const { selected } = this.state;

    return (
      <div id="buy">
        <div className="list container">
          {list.map(item => (
            <div className={classnames('item', { selected: item.id === selected })} key={item.id} onClick={this.handleSelect.bind(this, item.id)}>
              <div className="lv">
                <svg xmlns="http://www.w3.org/200/svg" height="44" width="44">
                  <circle cx="22" cy="22" r="20" fill="none" stroke="#ececec" strokeWidth="3" strokeLinecap="round" />
                  <circle
                    className="demo2"
                    cx="22"
                    cy="22"
                    r="20"
                    fill="none"
                    stroke="#fd9840"
                    strokeWidth="3"
                  />
                </svg>
                <span className="text"><span>P</span>{parseInt(item.vip_level.slice(1), 10)}</span>
              </div>
              <div className="center">
                <div className="data">{item.power} ph/s</div>
                <div className="rate">預計收益率{item.rate}/天，{item.days}天</div>
              </div>
              <div className="price">{item.price}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ product }) {
  return {
    list: product.products,
    canBuy: product.canBuy,
  };
}

export default connect(mapStateToProps)(Buy);
