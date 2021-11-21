import React, {useEffect, useState} from 'react';
import {colors, getData} from '../../utils';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {ProductCard} from '../../components';
import {connect, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/core';
import { getListProduct } from '../../redux/action/ProductAction';

const Content = ({
  getListProductResult,
  getListProductLoading,
  getListProductError,
  getWishlistResult,
  getWishlistLoading,
  getWishlistError,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const [refreshing, setRefreshing] = useState(false);
  
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getListProduct())
    if(!getListProductLoading){
     setRefreshing(false)
    }
  }, []);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.default]}/>}
      contentContainerStyle={styles.container}>
      {getListProductResult || getWishlistResult ? (
        Object.keys(getListProductResult).map(key => {
          const productData = getListProductResult[key];
          // let love = [...(Object.keys(getWishlistResult?.productList))].includes(key)
          // console.log(`🚀 → file: Content.js → line 39 → Object.keys → getWishlistResult`, [...(Object.keys(getWishlistResult?.productList))].includes(key))
          // const love = false;
          return (
            <ProductCard
              sold={productData.sold}
              stock={productData.stock}
              image={{uri: productData.image[0]}}
              name={productData.name}
              price={productData.price}
              weight={productData.weight}
              rest={productData}
              key={key}
              id={key}
              onNavigate={() =>
                navigation.navigate('ProductPage', {productData, id: key, love})
              }
              love={(Object.keys(getWishlistResult?.productList ?? {})).includes(key)}
            />
          );
        })
      ) : getListProductLoading ? (
        <View>
          <Text>Loading</Text>
        </View>
      ) : getListProductError ? (
        <Text>{getWishlistError}</Text>
      ) : (
        <Text>Data kosong</Text>
      )}
    </ScrollView>
  );
};

const styles = {
  container: {
    // height:698,
    paddingVertical: 10,
    paddingHorizontal: 28,
    backgroundColor: colors.white,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
};

const mapStateToProps = state => ({
  getListProductLoading: state.ProductReducer.getListProductLoading,
  getListProductResult: state.ProductReducer.getListProductResult,
  getListProductError: state.ProductReducer.getListProductError,

  getWishlistResult: state.WishlistReducer.getWishlistResult,
  getWishlistLoading: state.WishlistReducer.getWishlistLoading,
  getWishlistError: state.WishlistReducer.getWishlistError,
});

export default connect(mapStateToProps, null)(Content);
