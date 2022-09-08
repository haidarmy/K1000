import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, colorsDark} from '../../utils';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Gap} from '../../components';
import {s, vs, ms, mvs} from 'react-native-size-matters';
import {useSelector} from 'react-redux';

const SalesReport = ({
  infoItemStyle,
  rulerSeparatorStyle,
  disableRulerSeperator,
}) => {
  const theme = useSelector(state => state.DarkModeReducer.isDarkMode);
  const styles = getStyles(theme);
  return (
    <>
      <View style={{...infoItemStyle, marginVertical: 1}}>
        <SkeletonPlaceholder
          backgroundColor={theme ? colorsDark.grey : '#DDDDDD'}
          highlightColor={theme ? colors.grey : '#F2F8FC'}
          speed={1200}>
          <View style={styles.itemLabel} />
        </SkeletonPlaceholder>
        <Gap height={5} />
        <SkeletonPlaceholder
          backgroundColor={theme ? colorsDark.grey : '#DDDDDD'}
          highlightColor={theme ? colors.grey : '#F2F8FC'}
          speed={1200}>
          <View style={styles.itemValue} />
        </SkeletonPlaceholder>
      </View>
      {!disableRulerSeperator && <View style={rulerSeparatorStyle} />}
    </>
  );
};

const SalesReportSkeleton = ({
  containerStyle,
  infoItemStyle,
  rulerSeparatorStyle,
}) => {
  return (
    <View style={containerStyle}>
      <SalesReport
        infoItemStyle={infoItemStyle}
        rulerSeparatorStyle={rulerSeparatorStyle}
      />
      <SalesReport
        infoItemStyle={infoItemStyle}
        rulerSeparatorStyle={rulerSeparatorStyle}
      />
      <SalesReport
        infoItemStyle={infoItemStyle}
        rulerSeparatorStyle={rulerSeparatorStyle}
        disableRulerSeperator
      />
    </View>
  );
};

export default SalesReportSkeleton;

const getStyles = theme =>
  StyleSheet.create({
    itemLabel: {
      backgroundColor: 'white',
      height: mvs(20),
      width: ms(65),
      borderRadius: mvs(5),
    },
    itemValue: {
      backgroundColor: 'white',
      height: mvs(25),
      width: ms(65),
      borderRadius: mvs(5),
    },
  });
