import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Gap} from '../../components';
import {
  AvatarDummy,
  IcCartActive,
  IcChevronRight,
  IcLogout,
  IcMap,
  IcProfileActive,
  IcWishlistActive,
  IllDefaultAvatar,
} from '../../assets';
import {clearStorage, colors, getData, showError} from '../../utils';
import FIREBASE from '../../config/FIREBASE';
import profile from '../../redux/reducer/profile';

const Menu = ({label, icon, onPress}) => {
  switch (icon) {
    case 'Profile':
      return (
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.7}
          style={styles.menuWrapper}>
          <IcProfileActive fill={colors.black} style={{marginRight: 32}} />
          <Text style={styles.menuLabel}>{label}</Text>
          <IcChevronRight />
        </TouchableOpacity>
      );
    case 'Store':
      return (
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.7}
          style={styles.menuWrapper}>
          <IcCartActive fill={colors.black} style={{marginRight: 32}} />
          <Text style={styles.menuLabel}>{label}</Text>
          <IcChevronRight />
        </TouchableOpacity>
      );
    case 'Address':
      return (
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.7}
          style={styles.menuWrapper}>
          <IcMap fill={colors.black} style={{marginRight: 32}} />
          <Text style={styles.menuLabel}>{label}</Text>
          <IcChevronRight />
        </TouchableOpacity>
      );
    case 'Logout':
      return (
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.7}
          style={styles.menuWrapper}>
          <IcLogout
            fill={colors.black}
            width={24}
            height={24}
            style={{marginRight: 32}}
          />
          <Text style={styles.menuLabel}>{label}</Text>
          <IcChevronRight />
        </TouchableOpacity>
      );
    default:
      break;
  }
};

const ProfilePage = ({navigation}) => {
  const [profile, setProfile] = useState({
    uid: '',
    avatar: '',
    // updateAvatar: false,
    // oldAvatar: '',
    name: '',
    email: '',
    dateOfBirth: '',
    gender: '',
    number: '',
  });

  const getUserData = () => {
    getData('user').then(res => {
      console.log(res);
      setProfile({
        ...profile,
        uid: res.uid,
        avatar: res.avatar,
        name: res.name ? res.name : '',
        email: res.email,
        dateOfBirth: res.dateOfBirth ? res.dateOfBirth : '',
        gender: res.gender ? res.gender : '',
        number: res.number ? res.number : '',
      });
      // setProfile(res);
      // setForm('dateOfBirth', res.dateOfBirth)
      // setForm('number', res.number)
    });
  };
  
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
     getUserData()
    });
    return unsubscribe;
  }, [navigation]);
  const onLogout = () => {
    Alert.alert(
      'Alert',
      'Apakah yakin anda ingin keluar?',
      [
        {
          text: 'Batal',
          onPress: () => {},
        },
        {
          text: 'Ya',
          onPress: () => {
            FIREBASE.auth()
              .signOut()
              .then(() => {
                clearStorage();
                navigation.replace('WelcomePage');
              })
              .catch(error => {
                showError(error);
              });
          },
        },
      ],
      {
        cancelable: true,
      },
    );
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <Gap height={64} />
      <View style={styles.profileContainer}>
        <Image
          source={profile.avatar ? {uri: profile.avatar} : IllDefaultAvatar}
          style={styles.image}
        />
        <Text style={styles.name}>{profile.name}</Text>
      </View>
      <View>
        <Menu
          label="Profil Saya"
          icon={'Profile'}
          onPress={() => navigation.navigate('ProfileDetailPage')}
        />
        <Menu
          label="Toko Saya"
          icon={'Store'}
          onPress={() => navigation.navigate('StorePage')}
        />
        <Menu
          label="Alamat"
          icon={'Address'}
          onPress={() => navigation.navigate('AddressPage')}
        />
        <Menu label="Logout" icon={'Logout'} onPress={onLogout} />
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
    height: 150,
    width: 150,
    marginBottom: 20,
    borderRadius: 75
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
