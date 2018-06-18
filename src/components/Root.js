import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import 'normalize.css/normalize.css'
import { hot } from 'react-hot-loader'

class Root extends Component {
  render() {
    const { store, routes, history } = this.props;
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          {routes}
        </ConnectedRouter>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  routes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

// export default Root
export default hot(module)(Root)
