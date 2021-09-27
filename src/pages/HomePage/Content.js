import React, { useEffect } from 'react';
import {colors, getData} from '../../utils';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {ProductCard} from '../../components';
import {connect, useDispatch} from 'react-redux';
import { useNavigation } from '@react-navigation/core';

const Content = ({getListProductResult, getListProductLoading, getListProductError, getWishlistResult, getWishlistLoading, getWishlistError}) => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  useEffect(() => {
    getData('user').then(res => {
      if (res) {
        dispatch(getWishlist(res.uid));
      }
    });
  }, []);
  useEffect(() => {
   console.log('AHAHAH', getWishlistResult);
  }, [getWishlistResult])
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}>
        { getListProductResult || getWishlistResult ? (
        Object.keys(getListProductResult).map(key => {
          const productData = getListProductResult[key];
          // const love = [...(Object.keys(getWishlistResult?.productList))].includes(key)
          const love = false
          return (
            <ProductCard
              image={{uri: productData.image[0]}}
              name={productData.name}
              price={productData.price}
              weight={productData.weight}
              rest={productData}
              key={key}
              id={key}
              onNavigate={() => navigation.navigate('ProductPage', {productData, id: key, love})}
              love={love}
            />
          );
        })
      ) : getListProductLoading ? (
        <View>
          <Text>Loading</Text>
        </View>
      ) : getListProductError ? (
        <Text>{getWishlistError}</Text>
      ) : <Text>Data kosong</Text> }
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
