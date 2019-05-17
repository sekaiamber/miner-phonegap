/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
  Router, Route, Switch, Redirect,
} from 'dva/router';
import Main from '../dashboard/layout/main'; // 主视图
import Login from '../dashboard/components/login';
import Index from '../dashboard/components/index';
import Power from '../dashboard/components/power';
import NoMatchPage from '../dashboard/components/noMatchPage';

function PrivateRoute({ component: Component, ...rest }) {
  // TODO: 获取用户
  const currentUser = localStorage.getItem('member_id');
  let render;
  if (!currentUser) {
    // 没登录，跳转到登录页
    render = props => <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
  } else {
    render = props => <Main><Component {...props} /></Main>;
  }
  return (
    <Route
      {...rest}
      render={render}
    />
  );
}

function MyRouter(props) {
  return (
    <Router {...props}>
      <Switch>
        <PrivateRoute path="/" exact component={Index} />
        <PrivateRoute path="/power" exact component={Power} />
        <Route path="/login" exact component={Login} />
        <Route component={NoMatchPage} />
      </Switch>
    </Router>
  );
}

function RouterConfig({ history }) {
  return (
    <MyRouter history={history} />
  );
}

export default RouterConfig;
