import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {colors, colorsDark} from '../../utils';
import {s, vs, ms, mvs} from 'react-native-size-matters';
import {useSelector} from 'react-redux';

const Categories = () => {
  const theme = useSelector(state => state.DarkModeReducer.isDarkMode);
  const styles = getStyles(theme);
  return (
    <View style={{paddingHorizontal: ms(5)}}>
      <SkeletonPlaceholder
        backgroundColor={theme ? colorsDark.grey : '#DDDDDD'}
        highlightColor={theme ? colors.grey : '#F2F8FC'}>
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

const getStyles = theme =>
  StyleSheet.create({
    container: {
      width: ms(100),
      height: mvs(32),
      backgroundColor: theme ? colorsDark.grey : colors.grey,
      borderRadius: ms(5),
    },
  });
