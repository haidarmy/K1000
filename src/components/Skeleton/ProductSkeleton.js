import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, colorsDark} from '../../utils';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Gap} from '../../components';
import {s, vs, ms, mvs} from 'react-native-size-matters';
import {useSelector} from 'react-redux';

const Product = () => {
  const theme = useSelector(state => state.DarkModeReducer.isDarkMode);
  const styles = getStyles(theme);
  return (
    <View style={styles.product}>
      <SkeletonPlaceholder
        backgroundColor={theme ? colorsDark.grey : '#DDDDDD'}
        highlightColor={theme ? colors.grey : '#F2F8FC'}
        speed={1200}>
        <View style={styles.image} />
      </SkeletonPlaceholder>
      <View style={{paddingHorizontal: mvs(10), paddingVertical: mvs(5)}}>
        <SkeletonPlaceholder
          backgroundColor={theme ? colorsDark.grey : '#DDDDDD'}
          highlightColor={theme ? colors.grey : '#F2F8FC'}
          speed={1200}>
          <View
            style={{
              height: vs(30),
              width: s(100),
              borderRadius: mvs(5),
            }}></View>
        </SkeletonPlaceholder>
        <Gap height={vs(15)} />
        <SkeletonPlaceholder
          backgroundColor={theme ? colorsDark.grey : '#DDDDDD'}
          highlightColor={theme ? colors.grey : '#F2F8FC'}
          speed={1200}>
          <View
            style={{
              height: vs(30),
              width: s(130),
              borderRadius: mvs(5),
            }}></View>
        </SkeletonPlaceholder>
        <Gap height={vs(10)} />
        <SkeletonPlaceholder
          backgroundColor={theme ? colorsDark.grey : '#DDDDDD'}
          highlightColor={theme ? colors.grey : '#F2F8FC'}
          speed={1200}>
          <View
            style={{height: vs(20), width: s(50), borderRadius: mvs(5)}}></View>
        </SkeletonPlaceholder>
      </View>
    </View>
  );
};

const ProductSkeleton = () => {
  const theme = useSelector(state => state.DarkModeReducer.isDarkMode);
  const styles = getStyles(theme);
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

const getStyles = theme =>
  StyleSheet.create({
    container: {
      // paddingVertical: 10,
      // paddingHorizontal: 28,
      // backgroundColor: colors.white,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    product: {
      backgroundColor: theme ? colorsDark.lightgrey : colors.lightgrey,
      minHeight: vs(280),
      maxHeight: vs(320),
      paddingBottom: mvs(20),
      width: s(150),
      marginBottom: mvs(16),
      borderRadius: mvs(10),
    },
    image: {
      // resizeMode: 'cover',
      // backgroundColor: 'yellow',
      height: vs(160),
      width: s(150),
      borderTopLeftRadius: mvs(10),
      borderTopRightRadius: mvs(10),
      marginBottom: mvs(8),
    },
  });
