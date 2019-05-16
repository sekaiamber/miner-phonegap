/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import { connect } from 'dva';

import './style.scss';

class MyHeader extends Component {
  render() {
    const { currentPathConfig } = this.props;

    return (
      <header>
        <div className="title">{currentPathConfig.title}</div>
      </header>
    );
  }
}

function mapStateToProps({ utils }) {
  return {
    currentPath: utils.currentPath,
    currentPathConfig: utils.currentPathConfig,
  };
}

export default connect(mapStateToProps)(MyHeader);
