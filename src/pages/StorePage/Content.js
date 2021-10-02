import { useNavigation } from '@react-navigation/core';
import React, { useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { ProductCard } from '../../components';
import { getStoreProduct } from '../../redux/action/StoreAction';
import { colors, getData } from '../../utils';

const Content = ({
  getStoreProductResult,
  getStoreProductLoading,
  getStoreProductError,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    getData('user').then(res => {
        console.clear()
        if (res) {
        dispatch(getStoreProduct(res.name));
      }
    });
  }, []);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      {getStoreProductResult ? (
        Object.keys(getStoreProductResult).map(key => {
          const productData = getStoreProductResult[key]
          return (
            <ProductCard
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
        <View>
          <Text>Loading</Text>
        </View>
      ) : getStoreProductError ? (
        <Text>{getStoreProductError}</Text>
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
  getStoreProductLoading: state.StoreReducer.getStoreProductLoading,
  getStoreProductResult: state.StoreReducer.getStoreProductResult,
  getStoreProductError: state.StoreReducer.getStoreProductError,
});

export default connect(mapStateToProps, null)(Content);
