import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {
  IllEmptyWishlist,
  IllEmptyAddress,
  IllEmptyCart,
  IllEmptyProduct,
  IllEmptyOrder,
  IllEmptyAccount,
} from '../../assets';
import {colors, colorsDark} from '../../utils';
import Gap from '../Gap';
import {s, vs, ms, mvs} from 'react-native-size-matters';
import { useSelector } from 'react-redux';

const EmptyPage = ({illustration, text}) => {
  const theme = useSelector(state => state.DarkModeReducer.isDarkMode)
  const styles = getStyles(theme);
  return (
    <View style={styles.container}>
      <View style={styles.illustrationWrapper}>
        {illustration === 'EmptyWishlist' ? (
          <IllEmptyWishlist fill={colors.default} width={ms(340)} height={mvs(320)}/>
        ) : illustration === 'EmptyAddress' ? (
          <IllEmptyAddress fill={colors.default} />
        ) : illustration === 'EmptyCart' ? (
          <IllEmptyCart fill={colors.default} />
        ) : illustration === 'EmptyProduct' ? (
          <IllEmptyProduct fill={colors.default} />
        ) : illustration === 'EmptyOrder' ? (
          <IllEmptyOrder fill={colors.default} width={ms(320)} height={mvs(300)}/>
        ) : illustration === 'EmptyAccount' ? (
          <IllEmptyAccount fill={colors.default} width={ms(240)} height={mvs(320)}/>
        ) : null}

        <Gap height={mvs(32)} />
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
};

export default EmptyPage;

const getStyles = theme => StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: theme ? colorsDark.white : colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: ms(24),
    color: theme ? colorsDark.black : colors.black,
    textAlign: 'center',
  },
  illustrationWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
