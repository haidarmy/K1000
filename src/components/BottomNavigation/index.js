import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {
  IcHomeActive,
  IcHomeInacctive,
  IcCartInactive,
  IcWishlistInactive,
  IcProfileInacctive,
  IcCartActive,
  IcWishlistActive,
  IcProfileActive,
} from '../../assets';
import {colors} from '../../utils';
import Gap from '../Gap';

const Icon = ({label, focus}) => {
  switch (label) {
    case 'HomePage':
      return focus ? <IcHomeActive /> : <IcHomeInacctive />;
    case 'CartPage':
      return focus ? <IcCartActive /> : <IcCartInactive />;
    case 'WishlistPage':
      return focus ? <IcWishlistActive /> : <IcWishlistInactive />;
    case 'ProfilePage':
      return focus ? <IcProfileActive /> : <IcProfileInacctive />;
    default:
      return <IcHomeInacctive />;
  }
};

const Title = ({label, focus}) => {
  switch (label) {
    case 'HomePage':
      return focus ? (
        <Text style={{color: colors.default, fontFamily: 'Poppins-SemiBold', fontSize: 14}}>Beranda</Text>
      ) : (
        <Text style={{color: colors.grey, fontFamily: 'Poppins-SemiBold', fontSize: 14}}>Beranda</Text>
      );
    case 'CartPage':
      return focus ? (
        <Text style={{color: colors.default, fontFamily: 'Poppins-SemiBold', fontSize: 14}}>Keranjang</Text>
      ) : (
        <Text style={{color: colors.grey, fontFamily: 'Poppins-SemiBold', fontSize: 14}}>Keranjang</Text>
      );
    case 'WishlistPage':
      return focus ? (
        <Text style={{color: colors.default, fontFamily: 'Poppins-SemiBold', fontSize: 14}}>Favorit</Text>
      ) : (
        <Text style={{color: colors.grey, fontFamily: 'Poppins-SemiBold', fontSize: 14}}>Favorit</Text>
      );
    case 'ProfilePage':
      return focus ? (
        <Text style={{color: colors.default, fontFamily: 'Poppins-SemiBold', fontSize: 14}}>Profil</Text>
      ) : (
        <Text style={{color: colors.grey, fontFamily: 'Poppins-SemiBold', fontSize: 14}}>Profil</Text>
      );
    default:
      return focus ? (
        <Text style={{color: colors.default, fontFamily: 'Poppins-SemiBold', fontSize: 14}}>Home</Text>
      ) : (
        <Text style={{color: colors.grey}}>Home</Text>
      );
  }
};

const BottomNavigation = ({navigation, state, descriptors}) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            activeOpacity={0.7}
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{alignItems: 'center'}}>
            <Icon label={label} focus={isFocused} />
            <Gap height={3} />
            <Title label={label} focus={isFocused} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 32,
    paddingVertical: 16,
    justifyContent: 'space-between',
    backgroundColor: colors.white,
  },
});

export default BottomNavigation;
