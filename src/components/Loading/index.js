import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {GifLoading} from '../../assets';
import {colors} from '../../utils';

const Loading = () => {
  return (
    <View style={styles.container}>
      <Image source={GifLoading} style={styles.gifWrapper} />
    </View>
  );
};

export default Loading;

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
  gifWrapper: {
    width: 50,
    height: 50,
  },
});
