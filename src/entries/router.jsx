/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import {
  Router, Route, Switch, Redirect,
} from 'dva/router';
import { connect } from 'dva';
// import ReactPullToRefresh from 'react-pull2refresh';
import { Spin } from 'antd';
import Main from '../dashboard/layout/main'; // 主视图
import Header from '../dashboard/layout/header'; // 主视图
import Upgrade from '../dashboard/layout/upgrade'; // 主视图
import Loading from '../dashboard/layout/loading'; // 主视图
import Footer from '../dashboard/layout/footer'; // 主视图
import PullRefresh from '../dashboard/layout/pullRefresh'; // 主视图
import Login from '../dashboard/components/login';
import Signup from '../dashboard/components/signup';
import ForgetPassword from '../dashboard/components/forgetPassword';
import Index from '../dashboard/components/index';
import Power from '../dashboard/components/power';
import Buy from '../dashboard/components/buy';
import Wallet from '../dashboard/components/wallet';
import Me from '../dashboard/components/me';
import Notice from '../dashboard/components/notice';
import Activities from '../dashboard/components/activities';
import Invite from '../dashboard/components/invite';
import Miners from '../dashboard/components/miners';
import Subuser from '../dashboard/components/subuser';
import Deposit from '../dashboard/components/deposit';
import Withdraw from '../dashboard/components/withdraw';
// import NoMatchPage from '../dashboard/components/noMatchPage';

function PrivateRoute({ component: C, ...rest }) {
  // TODO: 获取用户
  const currentUser = localStorage.getItem('member_id');
  let render;
  if (currentUser === '__EMPTY__' && window._APP_) {
    // 没登录，跳转到登录页
    render = props => <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
  }
  render = ({ match, ...restProps }) => <Main match={match}><C {...restProps} /></Main>;
  return (
    <Route {...rest}>
      {render}
    </Route>
  );
}

class MyRouter extends Component {
  handleRefresh = (resolve) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'utils/refreshPage',
      onSuccess: resolve,
    });
  }

  render() {
    const { props } = this;
    return (
      <Router {...props}>
        <div id="app">
          <Header />
          <PullRefresh onRefresh={this.handleRefresh} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/forgetPassword" exact component={ForgetPassword} />
          <PrivateRoute path="/" exact component={Index} />
          <PrivateRoute path="/power" exact component={Power} />
          <PrivateRoute path="/buy" exact component={Buy} />
          <PrivateRoute path="/wallet" exact component={Wallet} />
          <PrivateRoute path="/me" exact component={Me} />
          <PrivateRoute path="/notice" exact component={Notice} />
          <PrivateRoute path="/activities" exact component={Activities} />
          <PrivateRoute path="/invite" exact component={Invite} />
          <PrivateRoute path="/miners" exact component={Miners} />
          <PrivateRoute path="/subuser" exact component={Subuser} />
          <PrivateRoute path="/deposit" exact component={Deposit} />
          <PrivateRoute path="/withdraw" exact component={Withdraw} />
          {/* <Route component={NoMatchPage} /> */}
          <Footer />
          <Upgrade />
          <Loading />
        </div>
      </Router>
    );
  }
}

function mapStateToProps() {
  return {};
}

const MyRouterWrapper = connect(mapStateToProps)(MyRouter);

function RouterConfig({ history }) {
  return (
    <MyRouterWrapper history={history} />
  );
}

export default RouterConfig;
