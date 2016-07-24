import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Helmet from 'react-helmet';
import config from 'config';
import {} from './App.scss';
import { isLoaded as isAuthLoaded, load as loadAuthInstance } from 'redux/modules/auth';
import { asyncConnect } from 'redux-connect';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];
    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuthInstance()));
    }
    return Promise.all(promises, () => {}, () => {});
  }
}])
@connect(
  state => ({
    user: state.auth.user
  }),
  {
    loadAuth: loadAuthInstance,
    pushState: push
  }
)
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object,
    history: PropTypes.object,
    location: PropTypes.object,
    loadAuth: PropTypes.func.isRequired,
    params: PropTypes.object,
    pushState: PropTypes.func.isRequired,
    user: PropTypes.object
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {children} = this.props;
    return (
      <div className="app">
        <Helmet {...config.app.head} />
        {children}
      </div>
    );
  }
}
