import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {connect, useDispatch} from 'react-redux';
import {IcShowLess, IcShowMore} from '../../assets';
import {Gap, OrderItem, SubmitButton} from '../../components';
import {getListOrder} from '../../redux/action/OrderAction';
import {getListSale} from '../../redux/action/SellingAction';
import {colors, getData} from '../../utils';

const Content = ({
  getListSellingLoading,
  getListSellingResult,
  getListSellingError,
  status,
  jumpTo,
  keyword
}) => {
  const [uid, setUid] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getData('user').then(res => {
      if (res) {
        setUid(res.uid);
        dispatch(getListSale(res.uid));
      }
    });
  }, []);

  const isFound = () => {
    if (keyword.includes('k1000')) {
      return true;
    } else {
      return false;
    }
  };

  const filteredSelling = (key, e) => {
    if (keyword.includes('k1000')) {
      return (
        e === `${uid}` &&
        getListSellingResult[key].orderDetails[e].status === status && e === `${uid}` &&
        getListSellingResult[key].orderDetails[e].orderId.toLowerCase() === keyword

        // getListOrderResult[key].orderDetails[e].status === status &&
        // getListOrderResult[key].orderDetails[e].orderId.toLowerCase() ===
        //   keyword
      );
    } else {
      return (
        e === `${uid}` &&
        getListSellingResult[key].orderDetails[e].status === status
      );
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
      {getListSellingResult ? (
        Object.keys(getListSellingResult).map(key => {
          return Object.keys(getListSellingResult[key].orderDetails)
            .filter(
              e =>
                filteredSelling(key, e)
            )
            .map(index => {
              const orderDetail = getListSellingResult[key].orderDetails[index];
              console.log('index', index);
              return (
                <View key={index}>
                  <OrderItem
                    isFound={isFound()}
                    keyword={keyword}
                    jumpTo={jumpTo}
                    data={orderDetail}
                    applyOnPress
                    toko={orderDetail.store.storeName}
                    tokoId={orderDetail.store.storeId}
                    items={Object.values(orderDetail.order)}
                    subTotal={orderDetail.subTotal}
                    type="selling"
                    status={status}
                    user={orderDetail.user}
                    date={orderDetail.date}
                  />
                </View>
              );
            });
        })
      ) : getListSellingLoading ? (
        <Text>Loading</Text>
      ) : (
        <Text>Data kosong</Text>
      )}
    </ScrollView>
  );
};

const mapStateToProps = state => ({
  getListSellingLoading: state.SellingReducer.getListSellingLoading,
  getListSellingResult: state.SellingReducer.getListSellingResult,
  getListSellingError: state.SellingReducer.getListSellingError,
});

export default connect(mapStateToProps, null)(Content);

const styles = StyleSheet.create({
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
