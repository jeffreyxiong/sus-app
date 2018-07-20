
import React, {Component} from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import app from './src/reducer';
import { RootStack } from './src/router';

const store = createStore(app, applyMiddleware(logger));

export default class App extends Component {

  render() {
      return (
    <Provider store = { store }>
        <RootStack />
    </Provider>
    );
}

}