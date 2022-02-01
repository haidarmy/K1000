import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {GifLoading} from '../../assets';
import {colors, colorsDark} from '../../utils';
import {s, vs, ms, mvs} from 'react-native-size-matters';
import { useSelector } from 'react-redux';

const FloatingLoading = () => {
  const theme = useSelector(state => state.DarkModeReducer.isDarkMode);
  const styles = getStyles(theme);
  return (
    <View style={styles.container}>
      <View style={styles.loadingWrapper}>
        <Image source={GifLoading} style={styles.gifWrapper} />
      </View>
    </View>
  );
};

export default FloatingLoading;

const getStyles = theme => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme ? colorsDark.loading : colors.loading,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  loadingWrapper: {
    backgroundColor: theme ? colorsDark.white : colors.white,
    width: ms(120),
    height: mvs(80),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: ms(15),
  },
  gifWrapper: {
    width: ms(50),
    height: mvs(50),
  },
});
