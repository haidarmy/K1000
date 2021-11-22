import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {colors} from '../../utils';

const Categories = () => {
  return (
    <View style={{paddingHorizontal: 5}}>
      <SkeletonPlaceholder backgroundColor={'#DDDDDD'}>
        <View style={styles.container}>
          <Text></Text>
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};

const CategoriesSkeleton = () => {
  return (
    <>
      <Categories />
      <Categories />
      <Categories />
      <Categories />
    </>
  );
};

export default CategoriesSkeleton;

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 32,
    backgroundColor: colors.grey,
    borderRadius: 5,
  },
});
