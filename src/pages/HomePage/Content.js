import React, {useEffect, useState} from 'react';
import {colors, colorsDark, getData} from '../../utils';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {EmptyPage, ProductCard, ProductSkeleton} from '../../components';
import {connect, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/core';
import {getListProduct} from '../../redux/action/ProductAction';
import {flexDirection} from 'styled-system';
import {ScaledSheet} from 'react-native-size-matters';
import EmptySearchResult from '../../components/EmptySearchResult';

const Content = ({
  getListProductResult,
  getListProductLoading,
  getListProductError,
  getWishlistResult,
  getWishlistLoading,
  getWishlistError,
  theme,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getListProduct());
    if (!getListProductLoading) {
      setRefreshing(false);
    }
  }, []);
  const styles = getStyles(theme);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[colors.default]}
        />
      }
      contentContainerStyle={styles.container}>
      {Object.values(getListProductResult ?? {}).length > 0 ? (
        Object.keys(getListProductResult).map(key => {
          const productData = getListProductResult[key];
          // let love = [...(Object.keys(getWishlistResult?.productList))].includes(key)
          // console.log(
          //   `🚀 → file: Content.js → line 39 → Object.keys → Mumet`,
          //   Object.keys(getWishlistResult.productList).includes(
          //     productData.productId,
          //   ),
          // );
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
              id={getListProductResult[key]?.productId}
              onNavigate={() =>
                navigation.navigate('ProductPage', {productData, id: key, love})
              }
              love={Object.keys(getWishlistResult?.productList ?? {}).includes(
                productData.productId,
              )}
              // love={true}
            />
          );
        })
      ) : getListProductResult?.length === 0 ? (
        <EmptySearchResult />
      ) : getListProductLoading ? (
        <ProductSkeleton />
      ) : getListProductError ? (
        <Text>{getWishlistError}</Text>
      ) : (
        <EmptyPage illustration="EmptyProduct" text="Produk Kosong" />
      )}
    </ScrollView>
  );
};

const getStyles = theme =>
  ScaledSheet.create({
    container: {
      // height:698,
      paddingVertical: '10@vs',
      paddingHorizontal: '18@ms',
      backgroundColor: theme ? colorsDark.white : colors.white,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
  });

const mapStateToProps = state => ({
  getListProductLoading: state.ProductReducer.getListProductLoading,
  getListProductResult: state.ProductReducer.getListProductResult,
  getListProductError: state.ProductReducer.getListProductError,

  getWishlistResult: state.WishlistReducer.getWishlistResult,
  getWishlistLoading: state.WishlistReducer.getWishlistLoading,
  getWishlistError: state.WishlistReducer.getWishlistError,

  theme: state.DarkModeReducer.isDarkMode,
});

export default connect(mapStateToProps, null)(Content);
