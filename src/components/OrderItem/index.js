import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {ScrollView} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import {useDispatch, useSelector} from 'react-redux';
import {Number, SubmitButton} from '..';
import {
  IcChevronRight,
  IcShipping,
  IcShowLess,
  IcShowMore,
  IcStore,
  IllDefaultAvatar,
} from '../../assets';
import {
  completeStatusOrder,
  updateProductStock,
  updateStatusOrder,
} from '../../redux/action/OrderAction';
import {calculateShippingCost} from '../../redux/action/RajaOngkir';
import {
  colors,
  colorsDark,
  fullAddressToCityId,
  usePrevious,
} from '../../utils';
import Gap from '../Gap';
import Item from './Item';
import ShippingModal from './ShippingModal';
import {s, vs, ms, mvs} from 'react-native-size-matters';
import EmptySearchResult from '../EmptySearchResult';

const OrderItem = ({
  isFound,
  isFoundOnChild,
  keyword,
  jumpTo,
  url,
  data,
  date,
  type,
  status,
  user,
  toko,
  tokoId,
  items,
  shipping,
  trash,
  mainCart,
  applyOnPress,
  address,
  label,
  subTotal,
  setPriceDetailsToParent,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const theme = useSelector(state => state.DarkModeReducer.isDarkMode);
  const styles = getStyles(theme);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [shippingCost, setShippingCost] = useState({
    priceByStore: 0,
    weightByStore: 0,
  });
  const [selectedExpedition, setSelectedExpedition] = useState({
    exp: '',
    service: '',
    cost: '',
    etd: '',
  });

  const shippingList = () => {
    dispatch(
      calculateShippingCost(
        items[0].product.storeLocation,
        fullAddressToCityId(address),
        shippingCost.weightByStore * 1000,
      ),
    );
    setModalVisible(!isModalVisible);
  };

  const setModalOff = childdata => {
    setModalVisible(childdata);
  };

  const setSubtotalToParent = (exp, service, cost, etd) => {
    setSelectedExpedition({exp, service, cost, etd});
    setPriceDetailsToParent(
      cost,
      exp,
      service,
      etd,
      toko,
      parseInt(shippingCost.priceByStore) + parseInt(cost),
      items,
      tokoId,
    );
  };

  useEffect(() => {
    if (status !== 'packed' && status !== 'shipped' && status !== 'finished') {
      if (data?.orderId) {
        dispatch(updateStatusOrder(data.orderId));
      }
    }
    if (label === 'CheckoutPage' && address) {
      setShippingCost({
        ...shippingCost,
        priceByStore: Object.keys(items).reduce(
          (sum, key) => sum + parseFloat(items[key].totalPrice || 0),
          0,
        ),
        weightByStore: Object.keys(items).reduce(
          (sum, key) => sum + parseFloat(items[key].totalWeight || 0),
          0,
        ),
      });
    }
  }, [address]);

  useEffect(() => {
    if (!((filteredItem && keyword) || !keyword || isFound)) {
      isFoundOnChild(false);
    }
  }, [filteredItem, keyword, isFound]);
  const labelButton = (type, status) => {
    if (type === 'selling' && status === 'packed') {
      return (
        <View style={{width: '40%'}}>
          <SubmitButton
            label="Kirim"
            height={mvs(45)}
            onPress={() =>
              navigation.navigate('InputResiPage', {data, type, jumpTo})
            }
          />
        </View>
      );
    } else if (type === 'order' && status === 'pending') {
      return (
        <View style={{width: '40%'}}>
          <SubmitButton
            label="Bayar"
            height={mvs(45)}
            onPress={() => navigation.navigate('PaymentPage', {url})}
          />
        </View>
      );
    } else if (type === 'order' && status === 'shipped') {
      const completeOrder = async () => {
        dispatch(
          completeStatusOrder(data.orderId, data.store.storeId, subTotal),
        );
        dispatch(updateProductStock(data.order));
      };
      return (
        <View style={{width: '40%'}}>
          <SubmitButton
            label="Diterima"
            height={mvs(45)}
            onPress={() => {
              Alert.alert(
                `Melepaskan Rp ${subTotal} ke Penjual `,
                'Pastikan produk sesuai dan dalam kondisi baik',
                [
                  {
                    text: 'Batal',
                    onPress: () => {},
                  },
                  {
                    text: 'Ya',
                    onPress: async () => {
                      await completeOrder();
                      jumpTo('finished');
                    },
                  },
                ],
                {
                  cancelable: true,
                },
              );
            }}
          />
        </View>
      );
    }
  };

  const onPressed = () => {
    if (!mainCart) {
      navigation.navigate('OrderDetailPage', {data, type, url});
    }
  };

  const priceContainer = (type, status) => {
    if (type === 'selling' && status === 'packed') {
      return false;
    } else if (type === 'order' && status === 'pending') {
      return false;
    } else if (type === 'order' && status === 'shipped') {
      return false;
    } else {
      return true;
    }
  };
  const filteredItem =
    !isFound &&
    items.filter(item => item.product.name.toLowerCase().includes(keyword))
      .length !== 0
      ? true
      : items.filter(item => item.product.store.toLowerCase().includes(keyword))
          .length !== 0
      ? true
      : false;
  if ((filteredItem && keyword) || !keyword || isFound) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPressed}
        style={styles.itemContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {type === 'selling' ? (
              <Image
              source={
                user.avatar
                  ? {uri: 'data:image/png;base64,' + user.avatar}
                  : IllDefaultAvatar
              }
              style={styles.image}
            />
          ) : (
            <IcStore fill={colors.default} />
          )}

          <Gap width={ms(5)} />
          <View style={{flex: 1}}>
            <Text style={styles.text('Poppins-SemiBold')}>
              {type === 'selling' ? user.name : toko}
            </Text>
          </View>
          {type !== 'order detail' && type !== 'selling detail' && (
            <Text style={styles.text('Poppins-SemiBold')}>{date}</Text>
          )}
        </View>
        <Gap height={mvs(10)} />
        <View style={{marginHorizontal: ms(-20)}}>
          {subTotal && type !== 'order detail' && type !== 'selling detail' ? (
            <>
              <Item
                type={type}
                item={items[0]}
                trash={trash}
                mainCart={mainCart}
                orders={mainCart?.orders}
                applyOnPress={applyOnPress}
              />
              <Collapsible collapsed={isCollapsed}>
                {items.slice(1).map((item, index) => {
                  return (
                    <Item
                      type={type}
                      item={item}
                      key={index}
                      trash={trash}
                      mainCart={mainCart}
                      orders={mainCart?.orders}
                      applyOnPress={applyOnPress}
                    />
                  );
                })}
              </Collapsible>
            </>
          ) : (
            <>
              {items.map((item, index) => {
                return (
                  <Item
                    type={shipping ? 'checkout' : type}
                    item={item}
                    key={index}
                    trash={trash}
                    mainCart={mainCart}
                    orders={mainCart?.orders}
                    applyOnPress={applyOnPress}
                  />
                );
              })}
            </>
          )}
        </View>
        <>
          {shipping && (
            <>
              <TouchableOpacity
                activeOpacity={0.7}
                style={
                  selectedExpedition
                    ? styles.selectedShippingWrapper
                    : styles.shippingWrapper
                }
                onPress={() => shippingList()}>
                {selectedExpedition.cost ? (
                  <View>
                    <Text
                      style={styles.text(
                        'Poppins-SemiBold',
                        ms(18),
                        colors.default,
                      )}>
                      {selectedExpedition.exp}
                    </Text>
                    {/* <Text style={styles.text('Poppins-SemiBold', ms(16))}>
                      {selectedExpedition.service}
                    </Text>
                    <Text style={styles.text('Poppins-SemiBold', ms(16))}>
                      {selectedExpedition.cost}
                    </Text> */}
                    <Text style={styles.text('Poppins-SemiBold', ms(16))}>
                      {selectedExpedition.service}
                      <Text> (</Text>
                      <Number number={selectedExpedition.cost} />
                      <Text>)</Text>
                    </Text>
                    <Text style={styles.text()}>{selectedExpedition.etd}</Text>
                  </View>
                ) : (
                  <>
                    <IcShipping fill={colors.default} />
                    <Gap width={ms(20)} />
                    <Text style={{...styles.text('Poppins-SemiBold'), flex: 1}}>
                      Pilih Pengiriman
                    </Text>
                  </>
                )}
                <IcChevronRight />
              </TouchableOpacity>
              <Modal
                statusBarTranslucent
                style={{
                  margin: ms(0),
                  justifyContent: 'flex-end',
                  // backgroundColor: colors.white
                }}
                isVisible={isModalVisible}
                onBackdropPress={() => setModalVisible(false)}
                onSwipeComplete={() => setModalVisible(false)}
                onBackButtonPress={() => setModalVisible(false)}
                swipeDirection="down"
                deviceHeight={Dimensions.get('window').height}>
                <ShippingModal
                  setModalOff={setModalOff}
                  setSubtotalToParent={setSubtotalToParent}
                />
              </Modal>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.text()}>Subtotal</Text>
                <Number
                  number={shippingCost.priceByStore + selectedExpedition.cost}
                  textStyle={styles.text('Poppins-SemiBold')}
                />
              </View>
            </>
          )}
          {subTotal && type !== 'order detail' && type !== 'selling detail' && (
            <>
              <Gap height={mvs(20)} />
              <TouchableOpacity
                onPress={() => setIsCollapsed(!isCollapsed)}
                activeOpacity={0.7}
                style={styles.expandToggle}>
                {items.length !== 1 &&
                  (isCollapsed ? <IcShowMore /> : <IcShowLess />)}
              </TouchableOpacity>
              <View style={styles.totalPrice}>
                <View
                  style={
                    priceContainer(type, status) && {
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }
                  }>
                  <Text style={styles.text('Poppins-Regular', ms(18))}>
                    Total Pesanan
                  </Text>
                  <Number
                    number={subTotal}
                    textStyle={styles.text('Poppins-SemiBold')}
                  />
                </View>
                {labelButton(type, status)}
              </View>
              <View
                style={{
                  backgroundColor: colors.lightgrey,
                }}>
                <Gap height={mvs(5)} />
              </View>
            </>
          )}
        </>
      </TouchableOpacity>
    );
  } else {
    return null;
  }
};

export default OrderItem;

const getStyles = theme =>
  StyleSheet.create({
    itemContainer: {
      backgroundColor: theme ? colorsDark.white : colors.white,
      paddingVertical: mvs(20),
      paddingHorizontal: ms(4),
    },
    shippingWrapper: {
      padding: mvs(10),
      borderWidth: ms(1),
      borderRadius: ms(10),
      borderColor: theme ? colorsDark.grey : colors.grey,
      height: mvs(60),
      alignItems: 'center',
      flexDirection: 'row',
      marginBottom: mvs(20),
    },
    selectedShippingWrapper: {
      padding: ms(15),
      borderWidth: ms(1),
      borderRadius: ms(10),
      borderColor: theme ? colorsDark.grey : colors.grey,
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      marginBottom: mvs(20),
    },
    text: (
      fontFamily = 'Poppins-Regular',
      fontSize = ms(16),
      color = theme ? colorsDark.black : colors.black,
    ) => ({
      fontFamily: fontFamily,
      fontSize: fontSize,
      color: color,
    }),
    expandToggle: {
      marginBottom: mvs(25),
      marginTop: mvs(-25),
      alignItems: 'center',
    },
    totalPrice: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: mvs(20),
      marginTop: mvs(-20),
      alignItems: 'center',
    },
    image: {
      height: mvs(36),
      width: ms(36),
      borderRadius: ms(16),
      borderWidth: ms(1),
      borderColor: colors.default,
    },
  });
