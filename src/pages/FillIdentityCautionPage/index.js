import React, {useEffect} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {padding} from 'styled-system';
import {IllFillForm, IllSuccessWD} from '../../assets';
import {Gap, SubmitButton} from '../../components';
import {colors, colorsDark, getData} from '../../utils';
import {s, vs, ms, mvs} from 'react-native-size-matters';
import {useSelector} from 'react-redux';

const FillIdentityCautionPage = ({navigation, route}) => {
  const theme = useSelector(state => state.DarkModeReducer.isDarkMode);
  const styles = getStyles(theme);
  useEffect(() => {
    setTimeout(() => {
      getData('user').then(res => {
        if (!res?.number) {
          navigation.replace('ProfileDetailPage', {
            isNoAddress: true,
            originPage: route?.params?.originPage,
            getCartResult: route?.params?.getCartResult,
          });
        } else if (res?.number && !res?.address) {
          navigation.replace('AddAddressPage', {
            originPage: route?.params?.originPage,
            getCartResult: route?.params?.getCartResult,
          });
        }
      });
    }, 1000);
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={theme ? 'light-content' : 'dark-content'}
        backgroundColor={theme ? colorsDark.white : colors.white}
      />
      <View style={styles.illustration}>
        <IllFillForm height={320} width={320} />
        <Text
          style={styles.text(
            'Poppins-Medium',
            20,
            theme ? colorsDark.black : colors.black,
          )}>
          Harap isi identitas diri dan alamat terlebih dahulu!
        </Text>
      </View>
    </View>
  );
};

export default FillIdentityCautionPage;

const getStyles = theme =>
  StyleSheet.create({
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
