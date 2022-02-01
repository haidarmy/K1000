import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Gap} from '..';
import {colors, colorsDark} from '../../utils';
import {s, vs, ms, mvs} from 'react-native-size-matters';
import {borderRadius} from 'styled-system';
import {useSelector} from 'react-redux';

const Account = () => {
  const theme = useSelector(state => state.DarkModeReducer.isDarkMode);
  const styles = getStyles(theme);
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: mvs(20),
      }}>
      <SkeletonPlaceholder
        backgroundColor={theme ? colorsDark.grey : '#DDDDDD'}
        highlightColor={theme ? colors.grey : '#F2F8FC'}
        speed={1200}>
        <View style={styles.iconWrapper} />
      </SkeletonPlaceholder>
      <Gap width={ms(15)} />
      <View>
        <SkeletonPlaceholder
          backgroundColor={theme ? colorsDark.grey : '#DDDDDD'}
          highlightColor={theme ? colors.grey : '#F2F8FC'}
          speed={1200}>
          <View
            style={{
              backgroundColor: theme ? colorsDark.grey : colors.grey,
              width: ms(180),
              height: mvs(20),
              borderRadius: ms(5),
            }}
          />
        </SkeletonPlaceholder>
        <Gap height={mvs(5)} />
        <SkeletonPlaceholder
          backgroundColor={theme ? colorsDark.grey : '#DDDDDD'}
          highlightColor={theme ? colors.grey : '#F2F8FC'}
          speed={1200}>
          <View
            style={{
              backgroundColor: theme ? colorsDark.grey : colors.grey,
              width: ms(120),
              height: mvs(20),
              borderRadius: ms(5),
            }}
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

const getStyles = theme =>
  StyleSheet.create({
    iconWrapper: {
      backgroundColor: theme ? colorsDark.grey : colors.grey,
      width: ms(42),
      height: mvs(42),
      borderRadius: ms(8),
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
