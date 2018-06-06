import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import 'normalize.css/normalize.css'

class Root extends Component {
    render() {
        const { store, routes, history } = this.props;
        return (
        <Provider store={store}>
          <ConnectedRouter history={history} children={routes} />
        </Provider>
        );
    }
}

// Root.propTypes = {
//   store: PropTypes.function.isRequired
// }

export default Root
