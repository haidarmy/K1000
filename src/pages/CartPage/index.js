import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import CartItem from './CartItem';
import {colors, getData, usePrevious} from '../../utils';
import {ScrollView} from 'react-native-gesture-handler';
import {
  ProductDummy1,
  ProductDummy2,
  ProductDummy3,
  ProductDummy4,
} from '../../assets';
import {
  EmptyPage,
  Gap,
  Header,
  OrderItem,
  SubmitButton,
} from '../../components';
import {connect, useDispatch} from 'react-redux';
import {getCartList} from '../../redux/action/CartAction';
import lodash from 'lodash';

const CartPage = ({
  getCartResult,
  getCartLoading,
  getCartError,
  deleteCartError,
  deleteCartLoading,
  deleteCartResult,
  navigation,
}) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  useEffect(() => {
    getData('user').then(res => {
      if (res) {
        dispatch(getCartList(res.uid));
      }
    });
  }, []);
  const prevDeleteCartResult = usePrevious(deleteCartResult);
  useEffect(() => {
    if (
      deleteCartResult !== false &&
      deleteCartResult !== prevDeleteCartResult
    ) {
      getData('user').then(res => {
        if (res) {
          dispatch(getCartList(res.uid));
        }
      });
    }
  }, [deleteCartResult]);
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <View style={{backgroundColor: colors.white}}>
        <Header label="Keranjang Saya" />
      </View>
      {getCartResult ? (
        // (
        //   Object.keys(getCartResult.orders).map(key => {
        //     return (
        //       <CartItem
        //         item={getCartResult.orders[key].product.name}
        //         orders={getCartResult.orders[key]}
        //         mainCart={getCartResult}
        //         id={key}
        //         key={key}
        //         price={getCartResult.orders[key].product.price}
        //         image={getCartResult.orders[key].product.image[0]}
        //       />
        //     );
        //   })
        // )
        <>
          <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
            {Object.keys(
              Object.keys(getCartResult.orders).reduce((r, a) => {
                r[getCartResult.orders[a].product.store] = [
                  ...(r[getCartResult.orders[a].product.store] || []),
                  {...getCartResult.orders[a], orderId: a},
                ];
                return r;
              }, {}),
            ).map(key => {
              return (
                <View key={key}>
                  <OrderItem
                    key={key}
                    toko={key}
                    trash
                    tokoId={
                      Object.keys(getCartResult.orders).reduce((r, a) => {
                        r[getCartResult.orders[a].product.store] = [
                          ...(r[getCartResult.orders[a].product.store] || []),
                          {...getCartResult.orders[a], orderId: a},
                        ];
                        return r;
                      }, {})[key][0].product.uid
                    }
                    items={
                      Object.keys(getCartResult.orders).reduce((r, a) => {
                        r[getCartResult.orders[a].product.store] = [
                          ...(r[getCartResult.orders[a].product.store] || []),
                          {...getCartResult.orders[a], orderId: a},
                        ];
                        return r;
                      }, {})[key]
                    }
                    mainCart={getCartResult}
                    applyOnPress
                  />
                  {Object.keys(
                    Object.keys(getCartResult.orders).reduce((r, a) => {
                      r[getCartResult.orders[a].product.store] = [
                        ...(r[getCartResult.orders[a].product.store] || []),
                        {...getCartResult.orders[a], orderId: a},
                      ];
                      return r;
                    }, {}),
                  ).length !== 1 && (
                    <View style={{backgroundColor: colors.lightgrey}}>
                      <Gap height={7} />
                    </View>
                  )}
                </View>
              );
            })}
          </ScrollView>
          <View style={styles.totalContainer}>
            <Text style={styles.totalPrice}>
              Rp {getCartResult !== null ? getCartResult.totalPrice : 0}
            </Text>
            <TouchableOpacity activeOpacity={0.7} style={{width: '50%'}}>
              <SubmitButton
                label="Check Out"
                onPress={() =>
                  navigation.navigate('CheckoutPage', {getCartResult})
                }
              />
            </TouchableOpacity>
          </View>
        </>
      ) : getCartLoading ? (
        <Text>Loading</Text>
      ) : getCartError ? (
        <Text>{getCartError}</Text>
      ) : (
        <EmptyPage illustration="EmptyCart" text="Keranjang Anda Kosong" />
      )}
    </View>
  );
};

const mapStateToProps = state => ({
  getCartLoading: state.CartReducer.getCartLoading,
  getCartResult: state.CartReducer.getCartResult,
  getCartError: state.CartReducer.getCartError,

  deleteCartLoading: state.CartReducer.deleteCartLoading,
  deleteCartResult: state.CartReducer.deleteCartResult,
  deleteCartError: state.CartReducer.deleteCartError,
});

export default connect(mapStateToProps, null)(CartPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  totalContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.lightgrey,
    flexDirection: 'row',
    paddingTop: 17,
    paddingBottom: 15,
    paddingHorizontal: 14,
  },
  totalLabel: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: colors.black,
    paddingLeft: 11,
  },
  totalPrice: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: colors.default,
  },
});
