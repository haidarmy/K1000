import React, { useEffect } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { useDispatch } from 'react-redux';
import { Loading } from '../../components';
import { getCartList } from '../../redux/action/CartAction';
import { updateOrder } from '../../redux/action/OrderAction';

const PaymentPage = ({route, navigation}) => {
  const dispatch = useDispatch();
  console.log('route', route);
  useEffect(() => {
    if (route.params.order_id) {
      console.log('cek midtrans');
      dispatch(updateOrder(route.params));
    }
  }, []);

  const onMessage = data => {
    if (data.nativeEvent.data === 'done') {
      // navigation.reset({index: 0, route: [name: '']'OrderPage', 'payment'});
      navigation.reset({
        index: 0,
        routes: [
          {name: 'MainApp', screen: 'ProfilePage'},
          {name: 'OrderPage', params: 'payment'},
        ],
      });
      dispatch(getCartList(route.params.user));
    }
  };
  return (
    <WebView
      style={{marginTop: StatusBar.currentHeight}}
      source={{uri: `${route.params.url}`}}
      renderLoading={() => <Loading />}
      onMessage={onMessage}
    />
  );
};

export default PaymentPage;

const styles = StyleSheet.create({});
