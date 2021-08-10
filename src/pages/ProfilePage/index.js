import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Gap} from '../../components';
import {AvatarDummy, IcCartActive, IcChevronRight, IcMap, IcProfileActive, IcWishlistActive} from '../../assets';
import {colors} from '../../utils';

const Menu = ({label, icon, onPress}) => {
  switch (icon) {
    case 'Profile':
      return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.menuWrapper}>
          <IcProfileActive fill={colors.black} style={{marginRight: 32}} />
          <Text style={styles.menuLabel}>{label}</Text>
          <IcChevronRight />
        </TouchableOpacity>
      );
    case 'Store':
      return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.menuWrapper}>
          <IcCartActive fill={colors.black} style={{marginRight: 32}} />
          <Text style={styles.menuLabel}>{label}</Text>
          <IcChevronRight />
        </TouchableOpacity>
      );
    case 'Address':
      return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.menuWrapper}>
          <IcMap fill={colors.black} style={{marginRight: 32}} />
          <Text style={styles.menuLabel}>{label}</Text>
          <IcChevronRight />
        </TouchableOpacity>
      );
    case 'Favourite':
      return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.menuWrapper}>
          <IcWishlistActive fill={colors.black} style={{marginRight: 32}} />
          <Text style={styles.menuLabel}>{label}</Text>
          <IcChevronRight />
        </TouchableOpacity>
      );
    default:
      break;
  }
};

const ProfilePage = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Gap height={64} />
      <View style={styles.profileContainer}>
        <Image source={AvatarDummy} style={styles.image} />
        <Text style={styles.name}>Guy Hawkins</Text>
      </View>
      <View>
        <Menu label="Profil Saya" icon={"Profile"} onPress={() => navigation.navigate('ProfileDetailPage')}/>
        <Menu label="Toko Saya" icon={"Store"} onPress={() => navigation.navigate('StorePage')}/>
        <Menu label="Alamat" icon={"Address"} onPress={() => navigation.navigate('AddressPage')}/>
        <Menu label="Favorit" icon={"Favourite"} onPress={() => navigation.navigate('AddressPage')}/>
      </View>
    </View>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  image: {
    height: 151,
    width: 151,
    marginBottom: 40,
  },
  name: {
    fontFamily: 'Poppins-Medium',
    fontSize: 24,
    color: colors.black,
  },
  menuWrapper: {
    flexDirection: 'row',
    marginHorizontal: 20,
    alignItems: 'center',
    marginBottom: 33,
  },
  menuLabel: {
    flex: 1,
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: colors.black,
  },
});
