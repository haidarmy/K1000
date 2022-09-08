import {useNavigation} from '@react-navigation/core';
import React, {useCallback, useEffect, useState} from 'react';
import {RefreshControl, ScrollView, Text} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {connect, useDispatch} from 'react-redux';
import {EmptyPage, ProductCard, ProductSkeleton} from '../../components';
import EmptySearchResult from '../../components/EmptySearchResult';
import {updateProductViewCountExpenditure} from '../../redux/action/ExpenditureReportAction';
import {getListProduct} from '../../redux/action/ProductAction';
import {updateProductViewCount} from '../../redux/action/SalesReportAction';
import {colors, colorsDark, getData} from '../../utils';

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
  const [userId, setUserId] = useState();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getListProduct());
    if (!getListProductLoading) {
      setRefreshing(false);
    }
  }, [dispatch, getListProductLoading]);
  useEffect(() => {
    getData('user').then(res => {
      setUserId(res.uid);
    });
  }, []);

  const handleUpdateViewCount = useCallback(
    storeId => {
      dispatch(updateProductViewCount(storeId));
      dispatch(updateProductViewCountExpenditure(userId));
    },
    [dispatch, userId],
  );

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
              onViewCount={handleUpdateViewCount}
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
                navigation.navigate('ProductPage', {
                  productData,
                  id: key,
                  love: Object.keys(
                    getWishlistResult?.productList ?? {},
                    productData.productId,
                  ),
                })
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
