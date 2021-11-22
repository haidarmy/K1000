import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, Text, View } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { ProductCard, ProductSkeleton } from '../../components';
import { getStoreProduct } from '../../redux/action/StoreAction';
import { colors, getData } from '../../utils';

const Content = ({
  getStoreProductResult,
  getStoreProductLoading,
  getStoreProductError,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getData('user').then(res => {
        console.clear()
        if (res) {
        dispatch(getStoreProduct());
      }
    });
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getStoreProduct())
    if(!getStoreProductLoading){
     setRefreshing(false)
    }
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.default]}/>}
      contentContainerStyle={styles.container}>
      {getStoreProductResult ? (
        Object.keys(getStoreProductResult).filter(key => getStoreProductResult[key].uid === 'AkrMPrVhlmZxGNYzfFHVbOMIgsj1').map(key => {
          const productData = getStoreProductResult[key]
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
              id={key}
              onNavigate={() =>
                navigation.navigate('AddProductPage', {productData, id: key})
              }
              store
            />
          );
        })
      ) : getStoreProductLoading ? (
        <ProductSkeleton/>
      ) : getStoreProductError ? (
        <Text>{getStoreProductError}</Text>
      ) : null}
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
  getStoreProductLoading: state.StoreReducer.getStoreProductLoading,
  getStoreProductResult: state.StoreReducer.getStoreProductResult,
  getStoreProductError: state.StoreReducer.getStoreProductError,
});

export default connect(mapStateToProps, null)(Content);
