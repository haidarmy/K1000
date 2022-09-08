import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {
  LogBox,
  StatusBar,
  StyleSheet, useColorScheme
} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { Loading } from './components';
import FloatingLoading from './components/FloatingLoading';
import { setDarkMode } from './redux/action/DarkModeAction';
import store from './redux/store';
import Router from './router';
import { colors, colorsDark } from './utils';

const MainApp = () => {
  const dispatch = useDispatch();
  const colorScheme = useColorScheme();
  useEffect(() => {
    console.log(`🚀 → file: App.js → line 22 → useEffect → colorScheme`, colorScheme)
    LogBox.ignoreAllLogs(true)
    dispatch(setDarkMode(colorScheme));
  }, [colorScheme]);
  const loading = useSelector(
    state =>
      state.AuthReducer.registerLoading || state.AuthReducer.loginLoading,
  );
  const floatingLoading = useSelector(
    state =>
      state.StoreReducer.uploadStoreProductLoading ||
      state.StoreReducer.editStoreProductLoading,
  );
  const theme = useSelector(state => state.DarkModeReducer.isDarkMode);
  return (
    <>
      <StatusBar
        translucent
        barStyle={theme ? 'light-content' : 'dark-content'}
        backgroundColor={
          loading || floatingLoading
            ? colors.loading
            : theme
            ? colorsDark.white
            : colors.white
        }
      />
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      <FlashMessage position="top" />
      {loading && <Loading />}
      {floatingLoading && <FloatingLoading />}
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
