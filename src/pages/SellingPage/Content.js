import React, {useEffect, useLayoutEffect, useState} from 'react';
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
import {
  EmptyPage,
  Gap,
  ItemSkeleton,
  OrderItem,
  SubmitButton,
} from '../../components';
import {getListOrder} from '../../redux/action/OrderAction';
import {getListSale} from '../../redux/action/SellingAction';
import {colors, getData} from '../../utils';
import {s, vs, ms, mvs} from 'react-native-size-matters';
import EmptySearchResult from '../../components/EmptySearchResult';

const Content = ({
  getListSellingLoading,
  getListSellingResult,
  getListSellingError,
  status,
  jumpTo,
  keyword,
  setTab
}) => {
  const [uid, setUid] = useState(false);
  const [foundOnChild, setFoundOnChild] = useState(true);
  const dispatch = useDispatch();

  // useLayoutEffect(() => {
  // }, []);
  
  useEffect(() => {
    jumpTo(setTab ? setTab : 'packed');
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

  const isFoundOnChild = param => {
    if (keyword.length) {
      setFoundOnChild(param);
    }
  };

  useEffect(() => {
    if (keyword.length === 0) {
      setFoundOnChild(true);
    }
  }, [keyword]);

  const isFoundOnParent = () => {
    if (keyword.includes('k1000')) {
      return Object.values(getListSellingResult).every(
        e => e.order_id.toLowerCase() !== keyword,
      );
    }
  };
  const filteredSelling = (key, e) => {
    if (keyword.includes('k1000')) {
      return (
        e === `${uid}` &&
        getListSellingResult[key].orderDetails[e].status === status &&
        e === `${uid}` &&
        getListSellingResult[key].orderDetails[e].orderId.toLowerCase() ===
          keyword

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
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{flex: 1, marginHorizontal: ms(-20)}}>
      {getListSellingResult ? (
        (!foundOnChild && keyword.length) || isFoundOnParent() ? (
          <EmptySearchResult />
        ) : (
          Object.keys(getListSellingResult).map(key => {
            return Object.keys(getListSellingResult[key].orderDetails)
              .filter(e => filteredSelling(key, e))
              .map(index => {
                const orderDetail =
                  getListSellingResult[key].orderDetails[index];
                return (
                  <View key={index} style={{paddingHorizontal: ms(20)}}>
                    <OrderItem
                      isFoundOnChild={isFoundOnChild}
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
        )
      ) : getListSellingLoading ? (
        <ItemSkeleton />
      ) : uid ? (
        <EmptyPage illustration="EmptyOrder" text="Penjualan Anda Kosong" />
      ) : null}
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
    fontSize = ms(16),
    color = colors.black,
  ) => ({
    fontFamily: fontFamily,
    fontSize: fontSize,
    color: color,
  }),
});
