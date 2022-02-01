import React, { useEffect, useState } from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import { connect, useSelector } from 'react-redux';
import {EmptyPage, Header, SubmitButton} from '../../components';
import { updateAddress } from '../../redux/action/ProfileAction';
import {colors, colorsDark, getData} from '../../utils';
import {s, vs, ms, mvs} from 'react-native-size-matters';

const AddressPage = ({navigation, updateAddressResult}) => {
  const theme = useSelector(state => state.DarkModeReducer.isDarkMode);
  const styles = getStyles(theme);
  const [profile, setProfile] = useState('')
  const getUserData = () => {
    getData('user').then(res => {
      console.log(res);
      setProfile({
        ...profile,
        uid: res.uid,
        avatar: res.avatar,
        address: res.address,
        name: res.name ? res.name : '',
        email: res.email,
        dateOfBirth: res.dateOfBirth ? res.dateOfBirth : '',
        gender: res.gender ? res.gender : '',
        number: res.number ? res.number : '',
      });
    });
  };

  useEffect(() => {
    getUserData()
  }, [])
  return (
    <View style={styles.container}>
      <Header
        label="Alamat Saya"
        onPress={() => navigation.goBack('ProfilePage')}
      />
      <StatusBar barStyle={theme ? 'light-content' : 'dark-content'} backgroundColor={theme ? colorsDark.white : colors.white} />
      <View style={styles.content}>
        {profile.address ? <View style={styles.addresWrapper}>
          <Text style={styles.textName}>{profile.name}</Text>
          <Text style={styles.text}>0{profile.number}</Text>
          <Text style={styles.text}>
            {profile.address}
          </Text>
        </View> :  <EmptyPage illustration="EmptyAddress" text="Alamat Tidak Ditemukan" />}
       
        <SubmitButton
          label= {profile.address ? "Ubah Alamat" : "Tambah Alamat"}
          onPress={() => navigation.replace('AddAddressPage')}
        />
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  updateAddressLoading: state.ProfileReducer.updateAddressLoading,
  updateAddressResult: state.ProfileReducer.updateAddressResult,
  updateAddressError: state.ProfileReducer.updateAddressError,
});

export default connect(mapStateToProps, null)(AddressPage);

const getStyles = theme => StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: theme ? colorsDark.white : colors.white,
  },
  content: {
    justifyContent: 'space-between',
    flex: 1,
    paddingBottom: mvs(20),
    padding: mvs(20),
  },
  addresWrapper: {
    // height: '40%',
    backgroundColor: theme ? colorsDark.lightgrey : '#E5D9FF',
    padding: mvs(20),
    paddingBottom: mvs(40),
    borderRadius: ms(5),
    borderColor: colors.default,
    borderWidth: ms(2),
  },
  textName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: ms(20),
    color: theme ? colorsDark.black : colors.black
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: ms(16),
    color: theme ? colorsDark.black : colors.black
  },
});
