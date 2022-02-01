import React, { useEffect } from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {padding} from 'styled-system';
import {IllSuccessWD} from '../../assets';
import {Gap, SubmitButton} from '../../components';
import {colors, colorsDark} from '../../utils';
import {s, vs, ms, mvs} from 'react-native-size-matters';
import { useSelector } from 'react-redux';

const SuccessWithdrawPage = ({navigation}) => {
  const theme = useSelector(state => state.DarkModeReducer.isDarkMode);
  const styles = getStyles(theme);
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('StoreDrawer')
    }, 2000)
    
  }, [])
  return (
    <View style={styles.container}>
      <StatusBar barStyle={theme ? 'light-content' : 'dark-content'} backgroundColor={theme ? colorsDark.white : colors.white} />
      <View style={styles.illustration}>
        <IllSuccessWD height={320} width={320} />
        <Text style={styles.text()}>Penarikan Dana</Text>
        <Text style={styles.text()}>Diajukan</Text>
        <Text style={styles.text('Poppins-Medium', 16, colors.grey)}>Dana akan diproses maksimal 2 x 24 jam kerja</Text>
      </View>
    </View>
  );
};

export default SuccessWithdrawPage;

const getStyles = theme => StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: theme ? colorsDark.white : colors.white,
    padding: mvs(48),
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
