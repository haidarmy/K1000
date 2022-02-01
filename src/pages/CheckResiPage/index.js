import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import WebView from 'react-native-webview';
import {Header} from '../../components';
import { colors } from '../../utils';

const CheckResiPage = ({navigation, route}) => {
  return (
    <View style={styles.page}>
      <Header label="Lacak Pesanan" onPress={() => navigation.goBack()} />
      <WebView
        source={{uri: `${route.params.web}`}}
        renderLoading={() => <Loading />}
      />
    </View>
  );
};

export default CheckResiPage;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    // backgroundColor: colors.white
  },
});
