import React, { useEffect, useState } from 'react';
import {
  Dimensions, StyleSheet,
  Text, TouchableOpacity, View
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { useDispatch } from 'react-redux';
import { IcChevronRight, IcShipping, IcStore } from '../../assets';
import { calculateShippingCost } from '../../redux/action/RajaOngkir';
import { cityToCityId, colors, fullAddressToCityId, postalCodeToCityId } from '../../utils';
import Gap from '../Gap';
import Item from './Item';
import ShippingModal from './ShippingModal';

const OrderItem = ({
  toko,
  items,
  shipping,
  mainCart,
  applyOnPress,
  address,
  label,
  setPriceDetailsToParent,
}) => {
  const dispatch = useDispatch();
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
        cityToCityId(items[0].product.storeLocation),
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
    setPriceDetailsToParent(cost);
  };

  useEffect(() => {
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
  return (
    <View style={styles.itemContainer}>
      <View style={{flexDirection: 'row'}}>
        <IcStore fill={colors.default} />
        <Gap width={5} />
        <Text style={styles.text('Poppins-SemiBold')}>{toko}</Text>
      </View>
      <Gap height={10} />
      <View style={{marginHorizontal: -20}}>
        {items.map((item, index) => {
          return (
            <Item
              item={item}
              key={index}
              trash={shipping}
              mainCart={mainCart}
              orders={mainCart.orders}
              applyOnPress={applyOnPress}
            />
          );
        })}
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
                    style={styles.text('Poppins-SemiBold', 18, colors.default)}>
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
              style={{margin: 0, justifyContent: 'flex-end'}}
              isVisible={isModalVisible}
              onBackdropPress={() => setModalVisible(false)}
              onSwipeComplete={() => setModalVisible(false)}
              onBackButtonPress={() => setModalVisible(false)}
              swipeDirection="down"
              deviceHeight={Dimensions.get('screen').height}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <ShippingModal
                  setModalOff={setModalOff}
                  setSubtotalToParent={setSubtotalToParent}
                />
              </ScrollView>
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
      </>
    </View>
  );
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
