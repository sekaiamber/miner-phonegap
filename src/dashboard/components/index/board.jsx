/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

export default function Board(props) {
  const { data } = props;
  const {
    myPower, myBase, rewardPower, deductionBase,
  } = data;
  return (
    <div id="board">
      <div>
        <div className="item">
          <div className="value">{parseFloat(myPower).toFixed(1)} ph/s</div>
          <div className="name">我的算力</div>
        </div>
        <div className="item">
          <div className="value">{parseFloat(myBase).toFixed(2)}</div>
          <div className="name">我的BASE</div>
        </div>
      </div>
      <div>
        <div className="item">
          <div className="value">{parseFloat(rewardPower).toFixed(1)} ph/s</div>
          <div className="name">獎勵算力</div>
        </div>
        <div className="item">
          <div className="value">{parseFloat(deductionBase).toFixed(2)}</div>
          <div className="name">可抵扣BASE</div>
        </div>
      </div>
    </div>
  );
}
