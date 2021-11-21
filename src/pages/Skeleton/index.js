import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { colors } from '../../utils';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const Skeleton = () => {
  return (
    <View style={styles.container}>
     <View style={styles.product}></View>
     <View style={styles.product}></View>
     <View style={styles.product}></View>
     <View style={styles.product}></View>
    </View>
  );
};

export default Skeleton;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 28,
    backgroundColor: colors.white,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  product: {
    backgroundColor: colors.lightgrey,
    minHeight: 296,
    maxHeight:360,
    paddingBottom: 20,
    width: 168,
    marginBottom: 16,
    borderRadius: 10,
  }
});
