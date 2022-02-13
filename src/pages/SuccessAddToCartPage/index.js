import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {IllSuccess} from '../../assets';
import {Gap, SubmitButton} from '../../components';
import {colors, colorsDark} from '../../utils';
import {s, vs, ms, mvs} from 'react-native-size-matters';
import {useSelector} from 'react-redux';

const SuccessAddToCartPage = ({navigation}) => {
  const theme = useSelector(state => state.DarkModeReducer.isDarkMode);
  const styles = getStyles(theme);
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={theme ? 'light-content' : 'dark-content'}
        backgroundColor={theme ? colorsDark.white : colors.white}
      />
      <View style={styles.illustration}>
        <IllSuccess fill={ theme ? colorsDark.white : colors.white}/>
        <Text style={styles.text}>Produk Berhasil</Text>
        <Text style={styles.text}>Ditambahkan</Text>
      </View>

      <SubmitButton
        label="Lihat Produk Lainnya"
        onPress={() => navigation.replace('MainApp', {screen: 'HomePage'})}
      />
      <Gap height={mvs(28)} />
      <SubmitButton
        label="Lihat Keranjang Saya"
        onPress={() => navigation.replace('MainApp', {screen: 'CartPage'})}
        buttonColor={theme ? colorsDark.white : colors.white}
        labelColor={colors.default}
      />
    </View>
  );
};

export default SuccessAddToCartPage;

const getStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
      backgroundColor: theme ? colorsDark.white : colors.white,
      padding: mvs(48),
    },
    text: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: ms(24),
      color: theme ? colorsDark.black : colors.black,
      textAlign: 'center',
    },
    illustration: {
      flex: 1,
      justifyContent: 'center',
    },
  });
