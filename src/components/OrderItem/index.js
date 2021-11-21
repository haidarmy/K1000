import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {ScrollView} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import {useDispatch} from 'react-redux';
import {SubmitButton} from '..';
import {
  IcChevronRight,
  IcShipping,
  IcShowLess,
  IcShowMore,
  IcStore,
} from '../../assets';
import {
  completeStatusOrder,
  updateProductStock,
  updateStatusOrder,
} from '../../redux/action/OrderAction';
import {calculateShippingCost} from '../../redux/action/RajaOngkir';
import {colors, fullAddressToCityId, usePrevious} from '../../utils';
import Gap from '../Gap';
import Item from './Item';
import ShippingModal from './ShippingModal';

const OrderItem = ({
  isFound,
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

  const labelButton = (type, status) => {
    if (type === 'selling' && status === 'packed') {
      return (
        <View style={{width: '40%'}}>
          <SubmitButton
            label="Kirim"
            height={45}
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
            height={45}
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
            height={45}
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
        onPress={() =>
          navigation.navigate('OrderDetailPage', {data, type, url})
        }
        style={styles.itemContainer}>
        <View style={{flexDirection: 'row'}}>
          <IcStore fill={colors.default} />
          <Gap width={5} />
          <View style={{flex: 1}}>
            <Text style={styles.text('Poppins-SemiBold')}>
              {type === 'selling' ? user.name : toko}
            </Text>
          </View>
          {type !== 'order detail' && type !== 'selling detail' && (
            <Text style={styles.text('Poppins-SemiBold')}>{date}</Text>
          )}
        </View>
        <Gap height={10} />
        <View style={{marginHorizontal: -20}}>
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
                        18,
                        colors.default,
                      )}>
                      {selectedExpedition.exp}
                    </Text>
                    <Text style={styles.text('Poppins-SemiBold', 16)}>
                      {selectedExpedition.service}
                    </Text>
                    <Text style={styles.text()}>{selectedExpedition.etd}</Text>
                  </View>
                ) : (
                  <>
                    <IcShipping fill={colors.default} />
                    <Gap width={20} />
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
                  margin: 0,
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
                <Text style={styles.text('Poppins-SemiBold')}>
                  {shippingCost.priceByStore + selectedExpedition.cost}
                </Text>
              </View>
            </>
          )}
          {subTotal && type !== 'order detail' && type !== 'selling detail' && (
            <>
              <Gap height={20} />
              <TouchableOpacity
                onPress={() => setIsCollapsed(!isCollapsed)}
                activeOpacity={0.7}
                style={{
                  marginBottom: 25,
                  marginTop: -25,
                  alignItems: 'center',
                }}>
                {items.length !== 1 &&
                  (isCollapsed ? <IcShowMore /> : <IcShowLess />)}
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingBottom: 20,
                  marginTop: -20,
                  alignItems: 'center',
                }}>
                <View
                  style={
                    priceContainer(type, status) && {
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }
                  }>
                  <Text style={styles.text('Poppins-Regular', 18)}>
                    Total Pesanan
                  </Text>
                  <Text style={styles.text('Poppins-SemiBold')}>
                    Rp {subTotal}
                  </Text>
                </View>
                {labelButton(type, status)}
              </View>
              <View
                style={{
                  backgroundColor: colors.lightgrey,
                }}>
                <Gap height={5} />
              </View>
            </>
          )}
        </>
      </TouchableOpacity>
    );
  } else {
    return <></>;
  }
};

export default OrderItem;

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: colors.white,
    padding: 20,
  },
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
  selectedShippingWrapper: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.grey,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 20,
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
});
