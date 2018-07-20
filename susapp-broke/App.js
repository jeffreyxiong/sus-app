import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { RootStack } from './src/router';
import { Provider } from 'react-redux'
import logger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux';
// import StatusBarAlert from 'react-native-statusbar-alert';
import app from './src/model/reducer';

const store = createStore(app, applyMiddleware(logger));

/**  
 * App
 * 
 * Returns the root view of the StackNavigator
 * 
 */

export default class App extends Component {

  	render() {
      	return (
			<Provider store = { store }>
				<View style = {{ flex: 1, }}>
					<RootStack />
				</View>
			</Provider>
      );
  }

}