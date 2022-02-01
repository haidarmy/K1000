import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {color} from 'react-native-reanimated';
import {IllEmptySearch} from '../../assets';
import {colors, colorsDark} from '../../utils';
import {s, vs, ms, mvs} from 'react-native-size-matters';
import { useSelector } from 'react-redux';

const EmptySearchResult = () => {
  const theme = useSelector(state => state.DarkModeReducer.isDarkMode)
  const styles = getStyles(theme);
  return (
    <View style={styles.page}>
      <IllEmptySearch width={ms(300)} height={mvs(300)}/>
      <View style={{width: '80%'}}>
        <Text style={styles.text('Poppins-SemiBold', ms(20))}>
          Maaf, item yang Anda cari tidak ditemukan
        </Text>
        <Text style={styles.text('Poppins-Regular', ms(18), colors.grey)}>
          Silakan periksa kata pencarian Anda
        </Text>
      </View>
    </View>
  );
};

export default EmptySearchResult;

const getStyles = theme => StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: theme ? colorsDark.white : color.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: (
    fontFamily = 'Poppins-Regular',
    fontSize = ms(16),
    color = theme ? colorsDark.black : colors.black,
  ) => ({
    fontFamily: fontFamily,
    fontSize: fontSize,
    color: color,
    textAlign: 'center',
  }),
});
