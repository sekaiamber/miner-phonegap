/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import { connect } from 'dva';

import './style.scss';

// images
import noticeImg from '../../../assets/header_notice.svg';
import activitiesDoneImg from '../../../assets/header_menu.svg';

const iconMap = {
  notices: noticeImg,
  activitiesDone: activitiesDoneImg,
};

class MyHeader extends Component {
  render() {
    const { config } = this.props;

    return (
      <header style={config.style} className="container">
        <div className="icon-container">
          {config.icon && config.icon.left && (
            <img src={iconMap[config.icon.left]} alt="" />
          )}
        </div>
        <div className="title">{config.title}</div>
        <div className="icon-container">
          {config.icon && config.icon.right && (
            <img src={iconMap[config.icon.right]} alt="" />
          )}
        </div>
      </header>
    );
  }
}

function mapStateToProps({ utils }) {
  return {
    currentPath: utils.currentPath,
    config: utils.currentPathConfig.header || {},
  };
}

export default connect(mapStateToProps)(MyHeader);
