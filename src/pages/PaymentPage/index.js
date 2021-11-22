import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {WebView} from 'react-native-webview';
import {useDispatch} from 'react-redux';
import {Loading} from '../../components';
import {updateOrder} from '../../redux/action/OrderAction';

const PaymentPage = ({route, navigation}) => {
  const dispatch = useDispatch();
  console.log('route', route);
  useEffect(() => {
    if (route.params.order_id) {
      console.log('cek midtrans');
      dispatch(updateOrder(route.params));
    }
  }, []);

  const onMessage = (data) => {
      if(data.nativeEvent.data === 'done'){
        navigation.replace('OrderPage', 'payment')
      }
  }
  return (
    <WebView
      source={{uri: `${route.params.url}`}}
      renderLoading={() => <Loading />}
      onMessage={onMessage}
    />
  );
};

export default PaymentPage;

const styles = StyleSheet.create({});
