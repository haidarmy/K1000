import React, { useEffect, useState } from 'react';
import {
  StatusBar, StyleSheet,
  Text, TouchableOpacity, View
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ms, mvs, s, vs } from 'react-native-size-matters';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { connect, useDispatch, useSelector } from 'react-redux';
import {
  EmptyPage,
  Gap,
  Header,
  ItemSkeleton,
  Number,
  OrderItem,
  SubmitButton
} from '../../components';
import { getCartList } from '../../redux/action/CartAction';
import { colors, colorsDark, getData, usePrevious } from '../../utils';

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
  const theme = useSelector(state => state.DarkModeReducer.isDarkMode);
  const styles = getStyles(theme);
  const [uid, setUid] = useState('');
  useEffect(() => {
    getData('user').then(res => {
      if (res) {
        dispatch(getCartList(res.uid));
        setUid(res.uid);
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
      <StatusBar barStyle={theme ? 'light-content' : 'dark-content'} backgroundColor={theme ? colorsDark.white : colors.white} />
      <View style={{backgroundColor: theme ? colorsDark.white : colors.white}}>
        <Header label="Keranjang Saya" />
      </View>
      {getCartResult ? (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{flex: 1, paddingHorizontal: mvs(20)}}>
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
                    <View style={{backgroundColor: theme ? colorsDark.lightgrey : colors.lightgrey}}>
                      <Gap height={7} />
                    </View>
                  )}
                </View>
              );
            })}
          </ScrollView>
        </>
      ) : getCartLoading ? (
        <ItemSkeleton />
      ) : getCartError ? (
        <Text>{getCartError}</Text>
      ) : uid ? (
        <EmptyPage illustration="EmptyCart" text="Keranjang Anda Kosong" />
      ) : null}
      {getCartResult ? (
        <View style={styles.totalContainer}>
          <Number
            number={getCartResult !== null ? getCartResult.totalPrice : 0}
            textStyle={styles.totalPrice}
          />
          <TouchableOpacity activeOpacity={0.7} style={{width: '50%'}}>
            <SubmitButton
              height={mvs(50)}
              label="Check Out"
              onPress={() => {
                getData('user').then(res => {
                  if (!res?.number || !res?.address) {
                    navigation.replace('FillIdentityCautionPage', {
                      originPage: 'CheckoutPage',
                      getCartResult,
                    });
                  } else {
                    navigation.navigate('CheckoutPage', {getCartResult});
                  }
                });
              }}
            />
          </TouchableOpacity>
        </View>
      ) : getCartLoading ? (
        <View style={styles.totalContainer}>
          <SkeletonPlaceholder
            backgroundColor={theme ? colorsDark.grey : '#DDDDDD'}
            highlightColor={theme ? colors.grey : '#F2F8FC'}
            speed={1200}>
            <View
              style={{width: ms(120), height: mvs(30), borderRadius: ms(5)}}
            />
          </SkeletonPlaceholder>
          <SkeletonPlaceholder
            backgroundColor={theme ? colorsDark.grey : '#DDDDDD'}
            highlightColor={theme ? colors.grey : '#F2F8FC'}
            speed={1200}>
            <View
              style={{width: ms(180), height: mvs(50), borderRadius: ms(10)}}
            />
          </SkeletonPlaceholder>
        </View>
      ) : null}
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

const getStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
      backgroundColor: theme ? colorsDark.white : colors.white,
      // padding: mvs(20),
    },
    totalContainer: {
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme ? colorsDark.lightgrey : colors.lightgrey,
      flexDirection: 'row',
      paddingTop: vs(12),
      paddingBottom: vs(12),
      paddingHorizontal: ms(12),
    },
    totalLabel: {
      fontSize: ms(20),
      fontFamily: 'Poppins-SemiBold',
      color: theme ? colorsDark.black : colors.black,
      paddingLeft: ms(11),
    },
    totalPrice: {
      fontSize: s(22),
      fontFamily: 'Poppins-SemiBold',
      color: colors.default,
    },
  });
