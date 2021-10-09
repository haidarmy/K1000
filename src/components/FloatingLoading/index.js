import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {GifLoading} from '../../assets';
import {colors} from '../../utils';

const FloatingLoading = () => {
  return (
    <View style={styles.container}>
      <View style={styles.loadingWrapper}>
        <Image source={GifLoading} style={styles.gifWrapper} />
      </View>
    </View>
  );
};

export default FloatingLoading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.loading,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  loadingWrapper: {
    backgroundColor: 'white',
    width: 150,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  gifWrapper: {
    width: 50,
    height: 50,
  },
});
