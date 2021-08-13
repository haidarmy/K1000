import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar
} from 'react-native';
import Modal from 'react-native-modal';
import {AvatarDummy, ProductDummy1} from '../../assets';
import {Gap, Header, SubmitButton, ImagePickerModal} from '../../components';
import {colors} from '../../utils';
import ProfileField from './ProfileField';
import DateTimePicker from '@react-native-community/datetimepicker';
import GenderModal from './GenderModal';

const ProfileDetailPage = ({navigation}) => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Okt',
    'Nov',
    'Des',
  ];
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [textDate, setTextDate] = useState('');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShowDate(false);

    let tempDate = new Date(currentDate);
    let fDate = `${tempDate.getDate()} ${
      months[tempDate.getMonth()]
    } ${tempDate.getFullYear()}`;
    setTextDate(fDate);
  };

  const [editName, setEditName] = useState(false);
  const [editPhone, setEditPhone] = useState(false);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [isModalVisibleGender, setModalVisibleGender] = useState(false);
  const [isModalVisiblePhoto, setModalVisiblePhoto] = useState(false);
  const toggleModalGender = () => {
    setModalVisibleGender(!isModalVisibleGender);
  };
  const toggleModalPhoto = () => {
    setModalVisiblePhoto(!isModalVisiblePhoto);
  };

  const [gender, setGender] = useState('')
  const childToParent = (childdata) => {
    setGender(childdata)
    toggleModalGender()
    console.log(childdata)
  }
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
            source={AvatarDummy}
            style={{height: 120, width: 120, borderRadius: 60}}
          />
          <Gap height={12} />
          <TouchableOpacity activeOpacity={0.7} onPress={toggleModalPhoto}>
            <Text style={styles.imageInput}>Ganti Foto</Text>
          </TouchableOpacity>
        </View>
        <Gap height={34} />
        <View style={{flex: 1}}>
          <ProfileField
            label="Nama"
            value="1"
            onPress={() => setEditName(toggle => !toggle)}
            edit={editName}
            option={editName}
            value={name}
            onChangeText={value => setName(value)}
            placeholder={editName ? 'Masukkan Nama Anda' : null}
            maxLength={32}
          />
          <ProfileField
            label="Tanggal Lahir"
            value={textDate}
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
          <ProfileField label="Jenis Kelamin" value={gender} onPress={toggleModalGender}/>
          <Modal
            deviceHeight={Dimensions.get('screen').height}
            statusBarTranslucent
            isVisible={isModalVisibleGender}
            onBackdropPress={() => setModalVisibleGender(false)}
            onBackButtonPress={() => setModalVisibleGender(false)}>
            <GenderModal childToParent={childToParent}/>
          </Modal>
          <Modal
            deviceHeight={Dimensions.get('screen').height}
            statusBarTranslucent
            isVisible={isModalVisiblePhoto}
            onBackdropPress={() => setModalVisiblePhoto(false)}
            onBackButtonPress={() => setModalVisiblePhoto(false)}>
            <ImagePickerModal/>
          </Modal>
          <ProfileField label="Email" value="tanya.hill@example.com" disable />
          <ProfileField
            label="No. Telepon"
            value="081293302744"
            onPress={() => setEditPhone(toggle => !toggle)}
            edit={editPhone}
            option={editPhone}
            keyboardType={'numeric'}
            value={number}
            onChangeText={value => setNumber(value)}
            placeholder={editPhone ? 'contoh: 08123456789' : null}
            maxLength={12}
          />
        </View>
        <SubmitButton
          label="Ubah Profil"
          onPress={() => navigation.goBack('ProfilePage')}
        />
      </View>
    </View>
  );
};

export default ProfileDetailPage;

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
