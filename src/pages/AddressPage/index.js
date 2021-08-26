import React, { useEffect, useState } from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import { connect } from 'react-redux';
import {EmptyPage, Header, SubmitButton} from '../../components';
import { updateAddress } from '../../redux/action/ProfileAction';
import {colors, getData} from '../../utils';

const AddressPage = ({navigation, updateAddressResult}) => {
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
  }, [updateAddressResult])
  return (
    <View style={styles.container}>
      <Header
        label="Alamat Saya"
        onPress={() => navigation.goBack('ProfilePage')}
      />
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    justifyContent: 'space-between',
    flex: 1,
    paddingBottom: 20,
    padding: 20,
  },
  addresWrapper: {
    height: '30%',
    backgroundColor: '#E5D9FF',
    padding: 20,
    borderRadius: 5,
    borderColor: colors.default,
    borderWidth: 2,
  },
  textName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
});
