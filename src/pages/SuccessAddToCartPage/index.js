import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {IllSuccess} from '../../assets';
import {Gap, SubmitButton} from '../../components';
import {colors} from '../../utils';

const SuccessAddToCartPage = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <View style={styles.illustration}>
      <IllSuccess />
      <Text style={styles.text}>Produk Berhasil</Text>
      <Text style={styles.text}>Ditambahkan</Text>
      </View>
     
      <SubmitButton label="Lihat Produk Lainnya" onPress={() => navigation.replace('MainApp', {screen:"HomePage"})}/>
      <Gap height={32}/>
      <SubmitButton label="Lihat Keranjang Saya" onPress={() => navigation.replace('MainApp', {screen:"CartPage"})} buttonColor={colors.white} labelColor={colors.default}/>
    </View>
  );
};

export default SuccessAddToCartPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 48,
  },
  text: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: colors.black,
    textAlign: 'center'
  },
  illustration: {
      flex: 1,
      justifyContent: 'center'
  }
});
