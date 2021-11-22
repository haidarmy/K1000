import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../utils';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Gap} from '../../components';

const Product = () => {
  return (
    <View style={styles.product}>
      <SkeletonPlaceholder backgroundColor={'#DDDDDD'} speed={1200}>
        <View style={styles.image} />
      </SkeletonPlaceholder>
      <View style={{paddingHorizontal: 10, paddingVertical: 5}}>
        <SkeletonPlaceholder backgroundColor={'#DDDDDD'} speed={1200}>
          <View style={{height: 30, width: 100, borderRadius: 5}}></View>
        </SkeletonPlaceholder>
        <Gap height={15} />
        <SkeletonPlaceholder backgroundColor={'#DDDDDD'} speed={1200}>
          <View style={{height: 30, width: 150, borderRadius: 5}}></View>
        </SkeletonPlaceholder>
        <Gap height={10} />
        <SkeletonPlaceholder backgroundColor={'#DDDDDD'} speed={1200}>
          <View style={{height: 20, width: 50, borderRadius: 5}}></View>
        </SkeletonPlaceholder>
      </View>
    </View>
  );
};

const ProductSkeleton = () => {
  return (
    <View style={styles.container}>
      <Product />
      <Product />
      <Product />
      <Product />
    </View>
  );
};

export default ProductSkeleton;

const styles = StyleSheet.create({
  container: {
    // paddingVertical: 10,
    // paddingHorizontal: 28,
    // backgroundColor: colors.white,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  product: {
    backgroundColor: colors.lightgrey,
    minHeight: 296,
    maxHeight: 360,
    paddingBottom: 20,
    width: 168,
    marginBottom: 16,
    borderRadius: 10,
  },
  image: {
    // resizeMode: 'cover',
    // backgroundColor: 'yellow',
    height: 160,
    width: 168,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 8,
  },
});
