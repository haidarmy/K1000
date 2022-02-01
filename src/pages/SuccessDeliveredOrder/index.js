import React, {useEffect} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {padding} from 'styled-system';
import {IllOrderDelivered, IllSuccessWD} from '../../assets';
import {Gap, SubmitButton} from '../../components';
import {colors, colorsDark} from '../../utils';
import {s, vs, ms, mvs} from 'react-native-size-matters';
import { useSelector } from 'react-redux';

const SuccessDeliveredOrder = ({navigation, route}) => {
  const theme = useSelector(state => state.DarkModeReducer.isDarkMode);
  const styles = getStyles(theme);
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('OrderDetailPage', {
        data: route?.params?.data,
        type: route?.params?.type,
        barcode: route?.params?.barcode,
      });
    }, 2000);
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar barStyle={theme ? 'light-content' : 'dark-content'} backgroundColor={theme ? colorsDark.white : colors.white} />
      <View style={styles.illustration}>
        <IllOrderDelivered height={320} width={320} />
        <Text style={styles.text('Poppins-Medium')}>
          Pesanan berhasil dikirim
        </Text>
      </View>
    </View>
  );
};

export default SuccessDeliveredOrder;

const getStyles = theme => StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: theme ? colorsDark.white : colors.white,
    padding: mvs(32),
  },
  text: (
    fontFamily = 'Poppins-SemiBold',
    fontSize = ms(24),
    color = theme ? colorsDark.black : colors.black,
  ) => ({
    fontFamily: fontFamily,
    fontSize: fontSize,
    color: color,
    textAlign: 'center',
  }),
  illustration: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: mvs(50),
  },
});
