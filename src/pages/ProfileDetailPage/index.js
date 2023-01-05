import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator, Dimensions, Image, ScrollView, StatusBar, StyleSheet,
  Text, TouchableOpacity, View
} from 'react-native';
import Modal from 'react-native-modal';
import { ms, mvs } from 'react-native-size-matters';
import { connect, useDispatch, useSelector } from 'react-redux';
import { IllDefaultAvatar } from '../../assets';
import { Gap, Header, ImagePickerModal, SubmitButton } from '../../components';
import { updateProfile } from '../../redux/action/ProfileAction';
import {
  colors,
  colorsDark,
  getData,
  months,
  showError,
  showSucces,
  storeData,
  stringToDate, usePrevious
} from '../../utils';
import GenderModal from './GenderModal';
import ProfileField from './ProfileField';

const ProfileDetailPage = ({navigation, updateProfileResult, route}) => {
  const theme = useSelector(state => state.DarkModeReducer.isDarkMode);
  const styles = getStyles(theme);
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDate(false);
    console.log(date);

    let tempDate = new Date(currentDate);
    let fDate = `${tempDate.getDate()} ${
      months[tempDate.getMonth()]
    } ${tempDate.getFullYear()}`;
    setProfile({...profile, dateOfBirth: fDate});
  };

  const [editName, setEditName] = useState(false);
  const [editPhone, setEditPhone] = useState(false);
  const [isModalVisibleGender, setModalVisibleGender] = useState(false);
  const [isModalVisiblePhoto, setModalVisiblePhoto] = useState(false);
  const [loading, setLoading] = useState(true);

  const toggleModalGender = () => {
    setModalVisibleGender(!isModalVisibleGender);
  };
  const toggleModalPhoto = () => {
    setModalVisiblePhoto(!isModalVisiblePhoto);
  };

  const childToParent = childdata => {
    setProfile({...profile, gender: childdata});
    toggleModalGender();
    console.log(childdata);
  };

  const setImageToParent = (image, imageForDB, error) => {
    if (error) {
      showError(error);
      toggleModalPhoto();
    } else {
      setProfile({...profile, avatar: imageForDB});
      toggleModalPhoto();
    }
  };

  const setDateToParent = childdata => {
    setDate(childdata);
    console.log(childdata);
  };

  const [profile, setProfile] = useState({
    uid: '',
    avatar: '',
    balance: 0,
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
        balance: res?.balance ?? 0,
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

  const onSubmit = () => {
    if (
      !(
        profile.name &&
        profile.number &&
        profile.dateOfBirth &&
        profile.gender &&
        profile.number
      )
    ) {
      showError('Pastikan semua kolom terisi!');
    } else if (
      profile.name ||
      profile.number ||
      profile.dateOfBirth ||
      profile.gender ||
      profile.number ||
      profile.avatar
    ) {
      dispatch(updateProfile(profile));
      storeData('user', profile);
      setEditName(false);
      setEditPhone(false);
      if (route?.params?.isNoAddress) {
        navigation.replace('AddAddressPage', {
          originPage: route?.params?.originPage,
          getCartResult: route?.params?.getCartResult,
        });
      }
    } else {
      showError('Harap isi kolom terlebih dahulu!');
    }
  };
  const prevUpdateProfileResult = usePrevious(updateProfileResult);
  useEffect(() => {
    if (
      updateProfileResult !== false &&
      updateProfileResult !== prevUpdateProfileResult
    ) {
      showSucces('Berhasil update profile');
    }
  }, [updateProfileResult]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
    getUserData();
  }, []);

  useEffect(() => {
    if (profile.dateOfBirth) {
      stringToDate(profile.dateOfBirth, setDateToParent);
    }
  }, [profile.dateOfBirth]);
  return (
    <>
      <View style={styles.page}>
        <Header
          label="Profil Saya"
          onPress={() => navigation.goBack('ProfilePage')}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <StatusBar
          barStyle={theme ? 'light-content' : 'dark-content'}
          backgroundColor={theme ? colorsDark.white : colors.white}
        />
        {loading && (
          <View style={styles.loadingWrapper}>
            <ActivityIndicator size={ms(32)} color={colors.default} />
          </View>
        )}
        <View style={styles.content}>
          <View style={styles.profileContainer}>
            <TouchableOpacity activeOpacity={0.7} onPress={toggleModalPhoto}>
              {profile.avatar ? (
                <Image
                  source={{uri: 'data:image/png;base64,' + profile.avatar}}
                  style={styles.imageWrapper}
                />
              ) : (
                <IllDefaultAvatar width={ms(120)} height={mvs(120)}/>
              )}
            </TouchableOpacity>
            <Gap height={mvs(12)} />
            <TouchableOpacity activeOpacity={0.7} onPress={toggleModalPhoto}>
              {profile.avatar ? (
                <Text style={styles.imageInput}>Ubah Foto</Text>
              ) : (
                <Text style={styles.imageInput}>Tambah Foto</Text>
              )}
            </TouchableOpacity>
          </View>
          <Gap height={mvs(34)} />
          <View style={{flex: 1, marginBottom: mvs(20)}}>
            <ProfileField
              label="Nama"
              onPress={() => setEditName(toggle => !toggle)}
              edit={editName}
              value={profile.name}
              onChangeText={value => setProfile({...profile, name: value})}
              placeholder={editName ? 'Masukkan Nama Anda' : null}
              maxLength={32}
            />
            <ProfileField
              label="Tanggal Lahir"
              value={profile.dateOfBirth}
              placeholder={`${date.getDate()} ${
                months[date.getMonth()]
              } ${date.getFullYear()}`}
              onPress={() => setShowDate(true)}
            />
            {showDate && (
              <DateTimePicker
                value={date}
                onChange={onChange}
                dateFormat="shortdate"
                maximumDate={Date.now()}
              />
            )}
            <ProfileField
              label="Jenis Kelamin"
              value={profile.gender}
              onPress={toggleModalGender}
            />
            <Modal
              deviceHeight={Dimensions.get('screen').height}
              statusBarTranslucent
              isVisible={isModalVisibleGender}
              onBackdropPress={() => setModalVisibleGender(false)}
              onBackButtonPress={() => setModalVisibleGender(false)}>
              <GenderModal childToParent={childToParent} />
            </Modal>
            <Modal
              deviceHeight={Dimensions.get('screen').height}
              statusBarTranslucent
              isVisible={isModalVisiblePhoto}
              onBackdropPress={() => setModalVisiblePhoto(false)}
              onBackButtonPress={() => setModalVisiblePhoto(false)}>
              <ImagePickerModal
                setImageToParent={setImageToParent}
                frontCamera
                circleOverlay
                hideBottomControls
                closeModal={() => setModalVisiblePhoto(false)}
              />
            </Modal>
            <ProfileField label="Email" value={profile.email} disable />
            <ProfileField
              label="No. Telepon"
              onPress={() => setEditPhone(toggle => !toggle)}
              edit={editPhone}
              keyboardType={'numeric'}
              value={profile.number}
              onChangeText={({}, extracted) =>
                setProfile({...profile, number: extracted})
              }
              placeholder={editPhone ? '+62 8XX XXX XXXX' : null}
              maxLength={12}
              textInputMask
            />
          </View>
          <SubmitButton label="Simpan" onPress={onSubmit} />
        </View>
      </ScrollView>
    </>
  );
};

const mapStateToProps = state => ({
  updateProfileLoading: state.ProfileReducer.updateProfileLoading,
  updateProfileResult: state.ProfileReducer.updateProfileResult,
  updateProfileError: state.ProfileReducer.updateProfileError,
});

export default connect(mapStateToProps, null)(ProfileDetailPage);

const getStyles = theme =>
  StyleSheet.create({
    page: {
      backgroundColor: theme ? colorsDark.white : colors.white,
      paddingBottom: mvs(10),
      paddingTop: StatusBar.currentHeight,
    },
    container: {
      flex: 1,
      backgroundColor: theme ? colorsDark.white : colors.white,
      // paddingBottom: 30,
    },
    content: {
      paddingHorizontal: ms(24),
      paddingBottom: mvs(20),
      flex: 1,
    },
    profileContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageInput: {
      fontFamily: 'Poppins-Medium',
      fontSize: ms(20),
      color: colors.default,
    },
    imageWrapper: {height: mvs(120), width: ms(120), borderRadius: ms(60)},
    loadingWrapper: {
      zIndex: 1,
      position: 'absolute',
      top: mvs(20),
      alignSelf: 'center',
      backgroundColor: theme ? colorsDark.white : colors.white,
      padding: mvs(8),
      borderRadius: ms(36),
    },
  });
