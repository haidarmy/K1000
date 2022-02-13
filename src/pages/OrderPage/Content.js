import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {connect, useDispatch, useSelector} from 'react-redux';
import {IcShowLess, IcShowMore} from '../../assets';
import {
  EmptyPage,
  Gap,
  ItemSkeleton,
  OrderItem,
  SubmitButton,
} from '../../components';
import {getListOrder} from '../../redux/action/OrderAction';
import {colors, colorsDark, getData} from '../../utils';
import {s, vs, ms, mvs} from 'react-native-size-matters';
import EmptySearchResult from '../../components/EmptySearchResult';

const Content = ({
  getListOrderLoading,
  getListOrderResult,
  getListOrderError,
  status,
  jumpTo,
  keyword,
  route,
}) => {
  const [uid, setUid] = useState(false);
  const [foundOnChild, setFoundOnChild] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    if (route?.params ?? null !== 'payment') {
      jumpTo('pending');
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

  const isFoundOnChild = param => {
   if(keyword.length){
    setFoundOnChild(param);
   }
  };

  useEffect(() => {
    if(keyword.length === 0){
      setFoundOnChild(true)
    }
  }, [keyword]);

  const filteredOrder = (key, e) => {
    if (keyword.includes('k1000')) {
      return (
        getListOrderResult[key].orderDetails[e].status === status &&
        getListOrderResult[key].orderDetails[e].orderId.toLowerCase() ===
          keyword
      );
    } else {
      return getListOrderResult[key].orderDetails[e].status === status;
    }
  };
  
 const isFoundOnParent = () => {
  if(keyword.includes('k1000')){
    return Object.values(getListOrderResult).every(e => e.order_id.toLowerCase() !== keyword)
  }
 }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{flex: 1, marginHorizontal: ms(-20)}}>
      {getListOrderResult ? (
        !foundOnChild && keyword.length || isFoundOnParent() ? (
          <EmptySearchResult />
        ) : (
          Object.keys(getListOrderResult).map(key => {
            return Object.keys(getListOrderResult[key].orderDetails)
              .filter(e => filteredOrder(key, e))
              .map(index => {
                const orderDetail = getListOrderResult[key].orderDetails[index];
                return (
                  <View key={index} style={{paddingHorizontal: ms(20)}}>
                    <OrderItem
                      isFoundOnChild={isFoundOnChild}
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
              });
          })
        )
      ) : getListOrderLoading ? (
        <ItemSkeleton />
      ) : uid ? (
        <EmptyPage illustration="EmptyOrder" text="Pesanan Anda Kosong" />
      ) : null}
    </ScrollView>
  );
};

const mapStateToProps = state => ({
  getListOrderLoading: state.OrdersReducer.getListOrderLoading,
  getListOrderResult: state.OrdersReducer.getListOrderResult,
  getListOrderError: state.OrdersReducer.getListOrderError,
});

export default connect(mapStateToProps, null)(Content);

// const getStyles = StyleSheet.create({
//   text: (
//     fontFamily = 'Poppins-Regular',
//     fontSize = ms(16),
//     color = colors.black,
//   ) => ({
//     fontFamily: fontFamily,
//     fontSize: fontSize,
//     color: color,
//   }),
// });
