import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {roundToNearestPixel} from 'react-native/Libraries/Utilities/PixelRatio';
import {connect, useDispatch, useSelector} from 'react-redux';
import {
  IcHomeActive,
  IcHomeInactive,
  IcCartInactive,
  IcWishlistInactive,
  IcProfileInactive,
  IcCartActive,
  IcWishlistActive,
  IcProfileActive,
  IcHomeActiveDark,
  IcCartActiveDark,
} from '../../assets';
import {deleteParamaterProduct} from '../../redux/action/ProductAction';
import {colors, colorsDark} from '../../utils';
import Gap from '../Gap';
import {s, vs, ms, mvs} from 'react-native-size-matters';

const Icon = ({label, focus, theme}) => {
  switch (label) {
    case 'HomePage':
      return focus ? (
        theme ? <IcHomeActiveDark fill={colors.default} /> : <IcHomeActive fill={colors.default} />
      ) : (
        <IcHomeInactive />
      );
    case 'CartPage':
      return focus ? (
        theme ? <IcCartActiveDark fill={colors.default} /> : <IcCartActive fill={colors.default} />
      ) : (
        <IcCartInactive />
      );
    case 'WishlistPage':
      return focus ? (
        <IcWishlistActive fill={colors.default} />
      ) : (
        <IcWishlistInactive />
      );
    case 'ProfilePage':
      return focus ? (
        <IcProfileActive fill={colors.default} />
      ) : (
        <IcProfileInactive />
      );
    default:
      return <IcHomeInactive />;
  }
};

const Title = ({label, focus}) => {
  switch (label) {
    case 'HomePage':
      return focus ? (
        <Text
          style={{
            color: colors.default,
            fontFamily: 'Poppins-SemiBold',
            fontSize: ms(14),
          }}>
          Beranda
        </Text>
      ) : (
        <Text
          style={{
            color: colors.grey,
            fontFamily: 'Poppins-SemiBold',
            fontSize: ms(14),
          }}>
          Beranda
        </Text>
      );
    case 'CartPage':
      return focus ? (
        <Text
          style={{
            color: colors.default,
            fontFamily: 'Poppins-SemiBold',
            fontSize: ms(14),
          }}>
          Keranjang
        </Text>
      ) : (
        <Text
          style={{
            color: colors.grey,
            fontFamily: 'Poppins-SemiBold',
            fontSize: ms(14),
          }}>
          Keranjang
        </Text>
      );
    case 'WishlistPage':
      return focus ? (
        <Text
          style={{
            color: colors.default,
            fontFamily: 'Poppins-SemiBold',
            fontSize: ms(14),
          }}>
          Favorit
        </Text>
      ) : (
        <Text
          style={{
            color: colors.grey,
            fontFamily: 'Poppins-SemiBold',
            fontSize: ms(14),
          }}>
          Favorit
        </Text>
      );
    case 'ProfilePage':
      return focus ? (
        <Text
          style={{
            color: colors.default,
            fontFamily: 'Poppins-SemiBold',
            fontSize: ms(14),
          }}>
          Profil
        </Text>
      ) : (
        <Text
          style={{
            color: colors.grey,
            fontFamily: 'Poppins-SemiBold',
            fontSize: ms(14),
          }}>
          Profil
        </Text>
      );
    default:
      return focus ? (
        <Text
          style={{
            color: colors.default,
            fontFamily: 'Poppins-SemiBold',
            fontSize: ms(14),
          }}>
          Home
        </Text>
      ) : (
        <Text style={{color: colors.grey}}>Home</Text>
      );
  }
};

const BottomNavigation = ({navigation, state, descriptors}) => {
  const dispatch = useDispatch();
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }
  const theme = useSelector(state => state.DarkModeReducer.isDarkMode)
  const styles = getStyles(theme);
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
          if (route.name !== 'HomePage') {
            dispatch(deleteParamaterProduct());
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
            <Icon label={label} focus={isFocused} theme={theme}/>
            <Gap height={3} />
            <Title label={label} focus={isFocused} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const getStyles = theme => StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: ms(24),
    paddingVertical: vs(12),
    justifyContent: 'space-between',
    backgroundColor: theme ? colorsDark.white : colors.white,
    elevation: 12,
  },
});

export default connect()(BottomNavigation);
