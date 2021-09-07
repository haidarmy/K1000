import React from 'react';
import {colors} from '../../utils';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {ProductCard} from '../../components';
import {
  ProductDummy1,
  ProductDummy2,
  ProductDummy3,
  ProductDummy4,
  ProductDummy5,
} from '../../assets';
import {connect} from 'react-redux';
import { useNavigation } from '@react-navigation/core';

const Content = ({getListProductResult, getListProductLoading}) => {
  const navigation = useNavigation()
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      {getListProductResult ? (
        Object.keys(getListProductResult).map(key => {
          const productData = getListProductResult[key];
          return (
            <ProductCard
              image={{uri: productData.image[0]}}
              name={productData.name}
              price={productData.price}
              weight={productData.weight}
              key={key}
              onNavigate={() => navigation.navigate('ProductPage', productData)}
            />
          );
        })
      ) : getListProductLoading ? (
        <View>
          <Text>Loading</Text>
        </View>
      ) : (
        <Text>Data Kosong</Text>
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
});

export default connect(mapStateToProps, null)(Content);
