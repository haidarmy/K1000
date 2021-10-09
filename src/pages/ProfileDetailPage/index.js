import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import Modal from 'react-native-modal';
import {AvatarDummy, IllDefaultAvatar, ProductDummy1} from '../../assets';
import {Gap, Header, SubmitButton, ImagePickerModal} from '../../components';
import {
  colors,
  getData,
  months,
  showError,
  showSucces,
  stringToDate,
  useForm,
  usePrevious,
} from '../../utils';
import ProfileField from './ProfileField';
import DateTimePicker from '@react-native-community/datetimepicker';
import GenderModal from './GenderModal';
import {connect, useDispatch} from 'react-redux';
import {updateProfile} from '../../redux/action/ProfileAction';
const ProfileDetailPage = ({navigation, updateProfileResult}) => {
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
      showError(error)
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
      setEditName(false);
      setEditPhone(false);
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
    console.log('Jalan bos');
    getUserData();
  }, []);

  useEffect(() => {
    if (profile.dateOfBirth) {
      stringToDate(profile.dateOfBirth, setDateToParent);
    }
  }, [profile.dateOfBirth]);
  return (
    <View style={styles.container}>
      <Header
        label="Profil Saya"
        onPress={() => navigation.goBack('ProfilePage')}
      />
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <View style={styles.content}>
        <View style={styles.profileContainer}>
          <Image
            source={profile.avatar ? {uri: 'data:image/png;base64,' + profile.avatar} : IllDefaultAvatar}
            style={{height: 120, width: 120, borderRadius: 60}}
          />
          <Gap height={12} />
          <TouchableOpacity activeOpacity={0.7} onPress={toggleModalPhoto}>
            {profile.avatar ? (
              <Text style={styles.imageInput}>Ubah Foto</Text>
            ) : (
              <Text style={styles.imageInput}>Tambah Foto</Text>
            )}
          </TouchableOpacity>
        </View>
        <Gap height={34} />
        <View style={{flex: 1}}>
          <ProfileField
            label="Nama"
            value="1"
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
              maximumDate={new Date(2021, 10, 20)}
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
    </View>
  );
};

const mapStateToProps = state => ({
  updateProfileLoading: state.ProfileReducer.updateProfileLoading,
  updateProfileResult: state.ProfileReducer.updateProfileResult,
  updateProfileError: state.ProfileReducer.updateProfileError,
});

export default connect(mapStateToProps, null)(ProfileDetailPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    flex: 1,
  },
  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageInput: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: colors.black,
  },
});
