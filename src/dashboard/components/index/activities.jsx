import React from 'react';

import baseImg from '../../../assets/base_shine.svg';

export default function Activities(props) {
  const { data } = props;
  const list = data.slice(0, 10);
  return (
    <div id="activities">
      {list.map(item => (
        <div className="activity" key={item.id} style={{ top: item.position.top * 100 + '%', left: item.position.left * 100 + '%', animationDelay: item.animationDelay }}>
          <div className="content">
            <div><img src={baseImg} alt="" /></div>
            <div>{parseFloat(item.amount).toFixed(2)}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
