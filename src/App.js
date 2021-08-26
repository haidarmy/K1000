import React from 'react';
//import type {Node} from 'react';
import {
  StatusBar,
  StyleSheet,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import Router from './router';
import FlashMessage from 'react-native-flash-message';
import store from './redux/store';
import {Provider, useSelector} from 'react-redux';
import {Loading} from './components';
import { colors } from './utils';

const MainApp = () => {
  const loading = useSelector(state => state.AuthReducer.registerLoading || state.AuthReducer.loginLoading)
  console.log("--------------------------------------",loading)
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={loading ? colors.loading :colors.white}/>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      <FlashMessage position="top" />
      {loading && <Loading />}
    </>
  );
};
const App = () => {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
