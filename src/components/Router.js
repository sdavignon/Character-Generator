import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, IndexRedirect } from 'react-router';
import App from './App';
import { setRouter } from '../actions/assets';

export default connect()(
  ({ dispatch, history }) => (
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRedirect to="/assets" />
        <Route path="assets" component={App}>
          <IndexRedirect to="/assets/Hairstyles" />
          <Route path=":asset" component={App} onEnter={route => dispatch(setRouter(route.params.asset, null, null))}>
            <Route path=":color" component={App} onEnter={route => dispatch(setRouter(route.params.asset, route.params.color, null))}>
              <Route path=":subColor" component={App} onEnter={route => dispatch(setRouter(route.params.asset, route.params.color, route.params.subColor))}>
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
    </Router>
  )
);