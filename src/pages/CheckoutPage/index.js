import React, {useEffect, useState} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {connect, useDispatch} from 'react-redux';
import {IcChevronRight, IcShipping, IcStore} from '../../assets';
import {
  EmptyPage,
  Gap,
  Header,
  OrderItem,
  SubmitButton,
} from '../../components';
import {updateAddress} from '../../redux/action/ProfileAction';
import {colors, getData, months, showError, usePrevious} from '../../utils';
import lodash from 'lodash';
import {snapTransactions} from '../../redux/action/PaymentAction';

const CheckoutPage = ({navigation, route, snapTransactionsResult}) => {
  const dispatch = useDispatch();
  const [checkoutItems, setCheckoutItems] = useState('');
  const [priceDetails, setPriceDetails] = useState({
    dataByStore: [],
    totalExpedition: [],
    totalShippingCost: 0,
    totalPayment: 0,
  });
  const getUserData = () => {
    getData('user').then(res => {
      console.log(res);
      setCheckoutItems({
        ...checkoutItems,
        uid: res.uid,
        email: res.email ? res.email : '',
        avatar: res.avatar ? res.avatar : '',
        address: res.address ? res.address : '',
        name: res.name ? res.name : '',
        number: res.number ? res.number : '',
        date: new Date().getTime(),
      });
    });
  };

  const setPriceDetailsToParent = (
    totalShippingCost,
    exp,
    service,
    etd,
    store,
    subTotalByStore,
    items,
    tokoId,
  ) => {
    setPriceDetails({
      ...priceDetails,
      dataByStore: {
        ...priceDetails.dataByStore,
        [`${tokoId}`]: {
          store: {storeName: store, storeId: tokoId},
          order: items,
          shipping: {expedition: exp, service: service, estimate: etd, cost: parseInt(priceDetails.totalShippingCost) + parseInt(totalShippingCost)},
          subTotal: subTotalByStore,
          orderId: `K1000-${checkoutItems.date}-${checkoutItems.uid}`,
          status: 'pending',
          date: `${new Date().getDate()} ${
            months[new Date().getMonth()]
          } ${new Date().getFullYear()}`,
          user: {
            avatar: checkoutItems.avatar,
            name: checkoutItems.name,
            address: checkoutItems.address,
            uid: checkoutItems.uid,
            number: checkoutItems.number,
          },
        },
      },
      totalExpedition: [...priceDetails.totalExpedition, store],
      totalShippingCost:
        parseInt(priceDetails.totalShippingCost) + parseInt(totalShippingCost),
      totalPayment:
        parseInt(route.params.getCartResult.totalPrice) +
        parseInt(priceDetails.totalShippingCost) +
        parseInt(totalShippingCost),
    });
    console.log(priceDetails.totalExpedition);
  };

  const data = Object.keys(route.params.getCartResult.orders).reduce((r, a) => {
    r[route.params.getCartResult.orders[a].product.store] = [
      ...(r[route.params.getCartResult.orders[a].product.store] || []),
      {...route.params.getCartResult.orders[a], orderId: a},
    ];
    return r;
  }, {});
  useEffect(() => {
    getUserData();
    console.log('Toko', Object.values(data).length);
  }, []);

  const checkout = () => {
    console.log('cekot', priceDetails.dataByStore);
    if (
      Object.values(data).length ==
      [...new Set(priceDetails.totalExpedition)].length
    ) {
      const dataCheckout = {
        transaction_details: {
          order_id: `K1000-${checkoutItems.date}-${checkoutItems.uid}`,
          gross_amount: priceDetails.totalPayment,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          first_name: checkoutItems.name,
          email: checkoutItems.email,
          phone: checkoutItems.number,
        },
      };
      dispatch(snapTransactions(dataCheckout));
    } else {
      showError('Harap pilih jasa ekspedisi tiap order item !');
    }
  };
  const prevSnapTransactionsResult = usePrevious(snapTransactionsResult);
  useEffect(() => {
    if (
      snapTransactionsResult !== false &&
      snapTransactionsResult !== prevSnapTransactionsResult
    ) {
      console.log('berisik ajg')
      const params = {
        user: checkoutItems.uid,
        url: snapTransactionsResult.redirect_url,
        orderDetails: priceDetails.dataByStore,
        // orderDetails: [
        //   ...new Map(
        //     priceDetails.dataByStore.map(item => [item.store, item]),
        //   ).values(),
        // ],
        order_id: `K1000-${checkoutItems.date}-${checkoutItems.uid}`,
      };
      navigation.navigate('PaymentPage', params);
    }
  }, [snapTransactionsResult]);
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <View style={{backgroundColor: colors.white}}>
        <Header
          label="Ringkasan pesanan"
          onPress={() => navigation.goBack('ProfilePage')}
        />
      </View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.itemContainer}>
            <Text style={styles.text('Poppins-SemiBold')}>
              Alamat Pengiriman
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.text()}>{checkoutItems.name}</Text>
              <Text style={styles.text()}> (0{checkoutItems.number})</Text>
            </View>
            <Text style={styles.text()}>{checkoutItems.address}</Text>
          </View>
          {!data ? (
            <Text>LOADING.....</Text>
          ) : (
            Object.keys(data).map(key => {
              return (
                <View key={key}>
                  <OrderItem
                    label="CheckoutPage"
                    key={key}
                    toko={key}
                    tokoId={data[key][0].product.uid}
                    items={data[key]}
                    shipping={true}
                    address={checkoutItems.address}
                    mainCart={route.params.getCartResult}
                    setPriceDetailsToParent={setPriceDetailsToParent}
                  />
                  <View style={{backgroundColor: colors.lightgrey}}>
                    <Gap height={7} />
                  </View>
                </View>
              );
            })
          )}
          <View style={{...styles.itemContainer, marginBottom: -20}}>
            <Text style={styles.text('Poppins-SemiBold')}>
              Ringkasan Belanja
            </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.text()}>Total Harga</Text>
              <Text style={styles.text('Poppins-SemiBold')}>
                Rp{' '}
                {route.params.getCartResult !== null
                  ? route.params.getCartResult.totalPrice
                  : 0}
              </Text>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.text()}>Total Ongkir</Text>
              <Text style={styles.text('Poppins-SemiBold')}>
                Rp {priceDetails.totalShippingCost}
              </Text>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.text('Poppins-SemiBold', 20)}>
                Total Pembayaran
              </Text>
              <Text style={styles.text('Poppins-Bold', 20, colors.default)}>
                Rp {priceDetails.totalPayment}
              </Text>
            </View>
          </View>
          <View style={{backgroundColor: colors.white, padding: 20}}>
            <SubmitButton label={'Bayar sekarang'} onPress={checkout} />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

// '#E5D9FF'
const mapStateToProps = state => ({
  updateAddressLoading: state.ProfileReducer.updateAddressLoading,
  updateAddressResult: state.ProfileReducer.updateAddressResult,
  updateAddressError: state.ProfileReducer.updateAddressError,

  snapTransactionsResult: state.PaymentReducer.snapTransactionsResult,
  snapTransactionsLoading: state.PaymentReducer.snapTransactionsLoading,
});

export default connect(mapStateToProps, null)(CheckoutPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightgrey,
  },
  content: {
    flex: 1,
    // paddingBottom: 20,
  },
  itemContainer: {
    backgroundColor: colors.white,
    padding: 20,
    marginBottom: 7,
  },
  text: (
    fontFamily = 'Poppins-Regular',
    fontSize = 16,
    color = colors.black,
  ) => ({
    fontFamily: fontFamily,
    fontSize: fontSize,
    color: color,
  }),
  shippingWrapper: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.grey,
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
});
