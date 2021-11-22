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
import {Gap, ItemSkeleton, OrderItem, SubmitButton} from '../../components';
import {getListOrder} from '../../redux/action/OrderAction';
import {colors, getData} from '../../utils';

const Content = ({
  getListOrderLoading,
  getListOrderResult,
  getListOrderError,
  status,
  jumpTo,
  keyword,
  route
}) => {
  const [uid, setUid] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
   if(route.params !== 'payment'){
    jumpTo('finished')
   }
    getData('user').then(res => {
      if (res) {
        setUid(res.uid);
        dispatch(getListOrder(res.uid));
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

  const filteredOrder = (key, e) => {
    if (keyword.includes('k1000')) {
      return (
        getListOrderResult[key].orderDetails[e].status === status &&
        getListOrderResult[key].orderDetails[e].orderId.toLowerCase() ===
          keyword
      );
    }
    else {
      return getListOrderResult[key].orderDetails[e].status === status;
    }
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
      {getListOrderResult ? (
        Object.keys(getListOrderResult).map(key => {
          return (
            Object.keys(getListOrderResult[key].orderDetails)
              .filter(e => filteredOrder(key, e))
              .map(index => {
                const orderDetail = getListOrderResult[key].orderDetails[index];
                return (
                  <View key={index}>
                    <OrderItem
                      isFound={isFound()}
                      keyword={keyword}
                      jumpTo={jumpTo}
                      url={getListOrderResult[key].url}
                      data={orderDetail}
                      applyOnPress
                      toko={orderDetail.store.storeName}
                      tokoId={orderDetail.store.storeId}
                      items={Object.values(orderDetail.order)}
                      subTotal={orderDetail.subTotal}
                      type="order"
                      status={status}
                      date={orderDetail.date}
                    />
                  </View>
                );
              })
          );
        })
      ) : getListOrderLoading ? (
        <ItemSkeleton/>
      ) : (
        <Text>Data kosong</Text>
      )}
    </ScrollView>
  );
};

const mapStateToProps = state => ({
  getListOrderLoading: state.OrdersReducer.getListOrderLoading,
  getListOrderResult: state.OrdersReducer.getListOrderResult,
  getListOrderError: state.OrdersReducer.getListOrderError,
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
