import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  IllEmptyWishlist,
  IllEmptyAddress,
  IllEmptyCart,
  IllEmptyProduct,
} from '../../assets';
import {colors} from '../../utils';
import Gap from '../Gap';

const EmptyPage = ({illustration, text}) => {
  return (
    <View style={styles.container}>
      <View style={styles.illustrationWrapper}>
        {illustration === 'EmptyWishlist' ? (
          <IllEmptyWishlist fill={colors.default} />
        ) : illustration === 'EmptyAddress' ? (
          <IllEmptyAddress fill={colors.default} />
        ) : illustration === 'EmptyCart' ? (
          <IllEmptyCart fill={colors.default} />
        ) : illustration === 'EmptyProduct' ? (
          <IllEmptyProduct fill={colors.default} />
        ) : null}

        <Gap height={32} />
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
};

export default EmptyPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: colors.black,
    textAlign: 'center',
  },
  illustrationWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
