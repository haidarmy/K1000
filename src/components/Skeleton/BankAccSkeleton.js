import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Gap} from '..';
import {colors} from '../../utils';

const Account = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
      }}>
      <SkeletonPlaceholder backgroundColor={'#DDDDDD'} speed={1200}>
        <View style={styles.iconWrapper} />
      </SkeletonPlaceholder>
      <Gap width={15} />
      <View>
        <SkeletonPlaceholder backgroundColor={'#DDDDDD'} speed={1200}>
          <View
            style={{backgroundColor: colors.grey, width: 180, height: 20}}
          />
        </SkeletonPlaceholder>
        <Gap height={5} />
        <SkeletonPlaceholder backgroundColor={'#DDDDDD'} speed={1200}>
          <View
            style={{backgroundColor: colors.grey, width: 120, height: 20}}
          />
        </SkeletonPlaceholder>
      </View>
    </View>
  );
};

const BankAccSkeleton = () => {
  return (
    <>
      <Account />
      <Account />
      <Account />
      <Account />
      <Account />
      <Account />
      <Account />
    </>
  );
};

export default BankAccSkeleton;

const styles = StyleSheet.create({
  iconWrapper: {
    backgroundColor: colors.grey,
    width: 42,
    height: 42,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
