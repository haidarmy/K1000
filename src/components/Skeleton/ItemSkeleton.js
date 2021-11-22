import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {padding} from 'styled-system';
import {Gap} from '..';
import {colors} from '../../utils';

const Item = () => {
  return (
    <View style={{marginBottom: 10}}>
      <SkeletonPlaceholder backgroundColor={'#DDDDDD'} speed={1200}>
        <View
          style={{
            backgroundColor: colors.grey,
            height: 30,
            width: 120,
            borderRadius: 5,
          }}
        />
      </SkeletonPlaceholder>
      <View style={styles.item}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 16,
          }}>
          <SkeletonPlaceholder backgroundColor={'#DDDDDD'} speed={1200}>
            <View style={styles.image} />
          </SkeletonPlaceholder>
          <View style={styles.descContainer}>
            <SkeletonPlaceholder backgroundColor={'#DDDDDD'} speed={1200}>
              <View
                style={{
                  height: 30,
                  width: 120,
                  backgroundColor: colors.grey,
                  borderRadius: 5,
                }}
              />
            </SkeletonPlaceholder>
            <Gap height={10} />
            <SkeletonPlaceholder backgroundColor={'#DDDDDD'} speed={1200}>
              <View
                style={{
                  height: 30,
                  width: 180,
                  backgroundColor: colors.grey,
                  borderRadius: 5,
                }}
              />
            </SkeletonPlaceholder>
            <Gap height={10} />
            <SkeletonPlaceholder backgroundColor={'#DDDDDD'} speed={1200}>
              <View
                style={{
                  height: 30,
                  width: 60,
                  backgroundColor: colors.grey,
                  borderRadius: 5,
                }}
              />
            </SkeletonPlaceholder>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <SkeletonPlaceholder backgroundColor={'#DDDDDD'} speed={1200}>
            <View
              style={{
                height: 30,
                width: 120,
                backgroundColor: colors.grey,
                borderRadius: 5,
              }}
            />
          </SkeletonPlaceholder>

          <SkeletonPlaceholder backgroundColor={'#DDDDDD'} speed={1200}>
            <View
              style={{
                height: 30,
                width: 120,
                backgroundColor: colors.grey,
                borderRadius: 5,
              }}
            />
          </SkeletonPlaceholder>
        </View>
      </View>
    </View>
  );
};

const ItemSkeleton = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <Item />
      <Item />
    </ScrollView>
  );
};

export default ItemSkeleton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    paddingHorizontal: 20,
    marginTop: 5,
    marginBottom: 16,
    // padding: 16,
    backgroundColor: colors.lightgrey,
    borderRadius: 20,
    flexDirection: 'column',
    alignItems: 'center',
    height: 200,
  },
  descContainer: {
    // backgroundColor: 'green',
    marginLeft: 24,
    flex: 1,
    paddingLeft: 16,
    justifyContent: 'center',
  },
  image: {
    width: 76,
    height: 76,
    borderRadius: 14,
    backgroundColor: colors.grey,
  },
});
