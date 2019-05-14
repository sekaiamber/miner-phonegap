import React, { Component } from 'react';
import { connect } from 'dva';

class Index extends Component {
  render() {
    const { test } = this.props;

    return (
      <div>{test}</div>
    );
  }
}

function mapStateToProps({ utils }) {
  return {
    test: utils.test,
  };
}

export default connect(mapStateToProps)(Index);
