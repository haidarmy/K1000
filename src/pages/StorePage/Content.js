import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {RefreshControl, ScrollView, Text, View} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import {EmptyPage, ProductCard, ProductSkeleton} from '../../components';
import {getStoreProduct} from '../../redux/action/StoreAction';
import {colors, colorsDark, getData} from '../../utils';
import {ScaledSheet} from 'react-native-size-matters';
import EmptySearchResult from '../../components/EmptySearchResult';

const Content = ({
  getStoreProductResult,
  getStoreProductLoading,
  getStoreProductError,
  theme
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const styles = getStyles(theme);
  const [refreshing, setRefreshing] = useState(false);
  const [uid, setUid] = useState('')

  useEffect(() => {
    getData('user').then(res => {
      if (res) {
        setUid(res.uid)
        dispatch(getStoreProduct());
      }
    });
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getStoreProduct());
    if (!getStoreProductLoading) {
      setRefreshing(false);
    }
  }, []);

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
      {Object.keys(getStoreProductResult ?? {}).some(
        key =>
          getStoreProductResult[key].uid === uid,
      ) ? (
        Object.keys(getStoreProductResult)
          .filter(
            key =>
              getStoreProductResult[key].uid === uid,
          )
          .map(key => {
            const productData = getStoreProductResult[key];
            return (
              <ProductCard
                sold={productData.sold}
                stock={productData.stock}
                images={productData.image}
                image={{uri: productData.image[0]}}
                name={productData.name}
                price={productData.price}
                weight={productData.weight}
                rest={productData}
                key={key}
                id={getStoreProductResult[key]?.productId}
                onNavigate={() =>
                  navigation.navigate('AddProductPage', {productData, id: key})
                }
                store={true}
              />
            );
          })
      ) : getStoreProductResult?.length === 0 ? (
        <EmptySearchResult />
      ) : getStoreProductLoading ? (
        <ProductSkeleton />
      ) : getStoreProductError ? (
        <Text>{getStoreProductError}</Text>
      ) : (
        <EmptyPage illustration="EmptyProduct" text="Toko Anda Kosong" />
      )}
    </ScrollView>
  );
};

const getStyles = theme => ScaledSheet.create({
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
  getStoreProductLoading: state.StoreReducer.getStoreProductLoading,
  getStoreProductResult: state.StoreReducer.getStoreProductResult,
  getStoreProductError: state.StoreReducer.getStoreProductError,
  theme: state.DarkModeReducer.isDarkMode
});

export default connect(mapStateToProps, null)(Content);
