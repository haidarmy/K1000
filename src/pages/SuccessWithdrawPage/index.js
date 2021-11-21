import React, { useEffect } from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {padding} from 'styled-system';
import {IllSuccessWD} from '../../assets';
import {Gap, SubmitButton} from '../../components';
import {colors} from '../../utils';

const SuccessWithdrawPage = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('StoreDrawer')
    }, 2000)
    
  }, [])
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 48,
  },
  text: (
    fontFamily = 'Poppins-SemiBold',
    fontSize = 24,
    color = colors.black,
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
    padding: 50,
  },
});
