import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {padding} from 'styled-system';
import {Gap} from '..';
import {colors, colorsDark} from '../../utils';
import {s, vs, ms, mvs} from 'react-native-size-matters';
import {useSelector} from 'react-redux';

const Item = () => {
  const theme = useSelector(state => state.DarkModeReducer.isDarkMode);
  const styles = getStyles(theme);
  return (
    <View style={{marginBottom: mvs(10)}}>
      <SkeletonPlaceholder
        backgroundColor={theme ? colorsDark.grey : '#DDDDDD'}
        highlightColor={theme ? colors.grey : '#F2F8FC'}
        speed={1200}>
        <View
          style={[styles.fragment(mvs(30), ms(100)), {marginBottom: mvs(10)}]}
        />
      </SkeletonPlaceholder>
      <View style={styles.item}>
        <View style={styles.content}>
          <SkeletonPlaceholder
            backgroundColor={theme ? colorsDark.grey : '#DDDDDD'}
            highlightColor={theme ? colors.grey : '#F2F8FC'}
            speed={1200}>
            <View style={styles.image} />
          </SkeletonPlaceholder>
          <View style={styles.descContainer}>
            <SkeletonPlaceholder
              backgroundColor={theme ? colorsDark.grey : '#DDDDDD'}
              highlightColor={theme ? colors.grey : '#F2F8FC'}
              speed={1200}>
              <View style={styles.fragment(mvs(30), ms(120))} />
            </SkeletonPlaceholder>
            <Gap height={mvs(10)} />
            <SkeletonPlaceholder
              backgroundColor={theme ? colorsDark.grey : '#DDDDDD'}
              highlightColor={theme ? colors.grey : '#F2F8FC'}
              speed={1200}>
              <View style={styles.fragment(mvs(30), ms(180))} />
            </SkeletonPlaceholder>
            <Gap height={mvs(10)} />
            <SkeletonPlaceholder
              backgroundColor={theme ? colorsDark.grey : '#DDDDDD'}
              highlightColor={theme ? colors.grey : '#F2F8FC'}
              speed={1200}>
              <View style={styles.fragment(mvs(30), ms(60))} />
            </SkeletonPlaceholder>
          </View>
        </View>
        <View style={styles.space}>
          <SkeletonPlaceholder
            backgroundColor={theme ? colorsDark.grey : '#DDDDDD'}
            highlightColor={theme ? colors.grey : '#F2F8FC'}
            speed={1200}>
            <View style={styles.fragment(mvs(30), ms(120))} />
          </SkeletonPlaceholder>

          <SkeletonPlaceholder
            backgroundColor={theme ? colorsDark.grey : '#DDDDDD'}
            highlightColor={theme ? colors.grey : '#F2F8FC'}
            speed={1200}>
            <View style={styles.fragment(mvs(30), ms(120))} />
          </SkeletonPlaceholder>
        </View>
      </View>
    </View>
  );
};

const ItemSkeleton = () => {
  const theme = useSelector(state => state.DarkModeReducer.isDarkMode);
  const styles = getStyles(theme);
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <Item />
      <Item />
      <Item />
    </ScrollView>
  );
};

export default ItemSkeleton;

const getStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: vs(20),
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: mvs(16),
    },
    fragment: (height, width) => ({
      height,
      width,
      backgroundColor: theme ? colorsDark.grey : colors.grey,
      borderRadius: ms(5),
    }),
    item: {
      paddingHorizontal: ms(20),
      marginTop: mvs(5),
      marginBottom: mvs(16),
      // padding: 16,
      backgroundColor: theme ? colorsDark.lightgrey : colors.lightgrey,
      borderRadius: ms(20),
      flexDirection: 'column',
      alignItems: 'center',
      height: mvs(200),
    },
    descContainer: {
      // backgroundColor: 'green',
      marginLeft: ms(24),
      flex: 1,
      paddingLeft: ms(16),
      justifyContent: 'center',
    },
    image: {
      width: ms(70),
      height: mvs(70),
      borderRadius: s(16),
      backgroundColor: theme ? colorsDark.grey : colors.grey,
    },
    space: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
  });
