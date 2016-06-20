import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';

import eventReducer from './reducers/eventReducer';
import routes from './routes';

let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const RootReducer = combineReducers({
  events: eventReducer
});
// **NOTE: We don't really need combineReducers since there's only one, but I stuck it here
// just in case we wanted to add functionality later.

const store = createStoreWithMiddleware(RootReducer, window.__INITIAL_STATE__, autoRehydrate());
persistStore(store); // Add persistence so we can store RSVP info client-side

// **NOTE: I am assuming it's okay to only store RSVP info on the client.

ReactDOM.render(
  <div>
    <Provider store={ store }>
      <div>
        <Router
          routes={ routes }
          history={ browserHistory }
        />
      </div>
    </Provider>
  </div>,
  document.getElementById('app')
);
