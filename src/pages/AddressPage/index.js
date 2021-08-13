import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {EmptyPage, Header, SubmitButton} from '../../components';
import {colors} from '../../utils';

const AddressPage = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Header
        label="Alamat Saya"
        onPress={() => navigation.goBack('ProfilePage')}
      />
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <View style={styles.content}>
        {/* <EmptyPage illustration="EmptyAddress" text="Alamat Tidak Ditemukan" /> */}
        <View style={styles.addresWrapper}>
          <Text style={styles.textName}>Haidar</Text>
          <Text style={styles.text}>081293302744</Text>
          <Text style={styles.text}>
            Wisma Musikalitas Garden kamar no. 3, Jl. Babakan Lebak 2 no. 5, RT
            2 RW 5, Balumbang Jaya
          </Text>
        </View>
        <SubmitButton
          label="Ubah Alamat"
          onPress={() => navigation.replace('AddAddressPage')}
        />
      </View>
    </View>
  );
};

export default AddressPage;

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
