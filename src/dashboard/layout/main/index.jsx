/**
 * @name: Main组件
 * @description: 主layout组件
 */

import React, { Component } from 'react';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import Header from '../header';
import Footer from '../footer';

import './style.scss';


class Main extends Component {

  render() {
    const { children } = this.props;
    return (
      <div id="app">
        <Header />
        <div id="main">{children}</div>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps({ utils }) {
  return {
    pathname: utils.pathname,
  };
}

export default withRouter(connect(mapStateToProps)(Main));
