/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import { connect } from 'dva';

import './style.scss';

class MyHeader extends Component {
  render() {
    return (
      <div className="my-header">
        <div>
          版本：
          {__VERSION__}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ utils }) {
  return {
  };
}

export default connect(mapStateToProps)(MyHeader);
