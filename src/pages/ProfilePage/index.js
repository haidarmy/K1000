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
  IcCartActiveDark,
  IcChevronRight,
  IcLogout,
  IcMap,
  IcMapDark,
  IcProfileActive,
  IcStoreActive,
  IcWishlistActive,
  IllDefaultAvatar,
} from '../../assets';
import {
  clearStorage,
  colors,
  colorsDark,
  getData,
  showError,
} from '../../utils';
import FIREBASE from '../../config/FIREBASE';
import profile from '../../redux/reducer/profile';
import {s, vs, ms, mvs} from 'react-native-size-matters';
import {useSelector} from 'react-redux';

const Menu = ({label, icon, onPress, theme}) => {
  const styles = getStyles(theme);
  switch (icon) {
    case 'Profile':
      return (
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.7}
          style={styles.menuWrapper}>
          <IcProfileActive fill={colors.grey} style={{marginRight: ms(32)}} />
          <Text style={styles.menuLabel}>{label}</Text>
          <IcChevronRight />
        </TouchableOpacity>
      );
    case 'Store':
      return (
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.7}
          style={[styles.menuWrapper, {marginLeft: ms(18)}]}>
          <IcStoreActive
            width={28}
            height={28}
            fill={colors.grey}
            style={{marginRight: 32}}
          />
          <Text style={styles.menuLabel}>{label}</Text>
          <IcChevronRight />
        </TouchableOpacity>
      );
    case 'Orders':
      return (
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.7}
          style={styles.menuWrapper}>
          {theme ? <IcCartActiveDark fill={colors.grey} style={{marginRight: ms(32)}} /> : <IcCartActive fill={colors.grey} style={{marginRight: ms(32)}} />}
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
          {theme ? <IcMapDark fill={colors.grey} style={{marginRight: ms(32)}} /> : <IcMap fill={colors.grey} style={{marginRight: ms(32)}} />}
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
            fill={colors.grey}
            width={24}
            height={24}
            style={{marginRight: ms(32)}}
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
  const theme = useSelector(state => state.DarkModeReducer.isDarkMode);
  const styles = getStyles(theme);
  const [profile, setProfile] = useState({
    uid: '',
    avatar: '',
    address: '',
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
        address: res.address ? res.address : '',
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
      getUserData();
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
      <StatusBar
        barStyle={theme ? 'light-content' : 'dark-content'}
        backgroundColor={theme ? colorsDark.white : colors.white}
      />
      <Gap height={mvs(64)} />
      <View style={styles.profileContainer}>
        <Image
          source={
            profile.avatar
              ? {uri: 'data:image/png;base64,' + profile.avatar}
              : IllDefaultAvatar
          }
          style={styles.image}
        />
        <Text style={styles.name}>{profile.name}</Text>
      </View>
      <View>
        <Menu
          theme={theme}
          label="Profil Saya"
          icon={'Profile'}
          onPress={() => navigation.navigate('ProfileDetailPage')}
        />
        <Menu
          theme={theme}
          label="Pesanan Saya"
          icon={'Orders'}
          onPress={() => navigation.navigate('OrderPage')}
        />
        <Menu
          theme={theme}
          label="Toko Saya"
          icon={'Store'}
          onPress={() => {
            getData('user').then(res => {
              if (!res?.number || !res?.address) {
                navigation.replace('FillIdentityCautionPage', {
                  originPage: 'StoreDrawer',
                });
              } else {
                navigation.navigate('StoreDrawer');
              }
            });
          }}
        />
        <Menu
          theme={theme}
          label="Alamat"
          icon={'Address'}
          onPress={() => navigation.navigate('AddressPage')}
        />
        <Menu theme={theme} label="Logout" icon={'Logout'} onPress={onLogout} />
      </View>
    </View>
  );
};

export default ProfilePage;

const getStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme ? colorsDark.white : colors.white,
      paddingHorizontal: ms(20),
      // paddingTop: StatusBar.currentHeight
    },
    profileContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    image: {
      height: mvs(150),
      width: ms(150),
      marginBottom: mvs(20),
      borderRadius: ms(75),
      borderWidth: ms(3),
      borderColor: colors.default,
    },
    name: {
      fontFamily: 'Poppins-Medium',
      fontSize: ms(24),
      color: theme ? colorsDark.black : colors.black,
    },
    menuWrapper: {
      flexDirection: 'row',
      marginHorizontal: ms(20),
      alignItems: 'center',
      marginBottom: vs(24),
    },
    menuLabel: {
      flex: 1,
      fontFamily: 'Poppins-Medium',
      fontSize: ms(18),
      color: theme ? colorsDark.black : colors.black,
    },
  });
