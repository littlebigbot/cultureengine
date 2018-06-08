import React from 'react'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware, connectRouter } from 'connected-react-router'
// import createSagaMiddleware from 'redux-saga'
import Root from './components/Root'
import rootReducer from './reducers'
import routes from './routes';
import createHistory from 'history/createHashHistory'
import { createLogger } from 'redux-logger'
import { hot } from 'react-hot-loader'
import './index.css';

const logger = createLogger();
const history = createHistory();
const historyMiddleware = routerMiddleware(history);

// export const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  connectRouter(history)(rootReducer),
  applyMiddleware(logger),
  //applyMiddleware(sagaMiddleware)
  applyMiddleware(thunk),
  applyMiddleware(historyMiddleware),
);

window.store = store;

ReactDOM.render(
  <Root store={store} history={history} routes={routes} />,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
