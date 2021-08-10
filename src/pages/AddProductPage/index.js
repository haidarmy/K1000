import React, {useState} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';
import {IcCloseSolid, IcFloatButton, ProductDummy1, ProductDummy2, ProductDummy3, ProductDummy4} from '../../assets';
import Modal from 'react-native-modal';
import {
  Header,
  InputField,
  SubmitButton,
  Gap,
  FilterProduct,
  ImagePickerModal
} from '../../components';
import {colors} from '../../utils';

const AddProductPage = ({navigation}) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <View style={styles.container}>
      <Header
        label="Tambah Produk"
        onPress={() => navigation.navigate('StorePage')}
      />
      <Modal
        deviceHeight={Dimensions.get('screen').height}
        statusBarTranslucent
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}>
        <ImagePickerModal multiple />
      </Modal>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.inputForm}>
        <InputField placeholder="Nama Produk" label="Nama Produk" />
        <InputField
          placeholder="Harga Produk"
          label="Harga"
          keyboard="numeric"
        />
        <InputField
          placeholder="Berat Produk"
          label="Berat"
          keyboard="numeric"
        />
        <InputField
          placeholder="Deskripsi Produk..."
          label="Deskripsi"
          multiline={true}
          numberOfLines={4}
        />
        <View>
          <Text style={styles.textFotoProduct}>Foto Produk</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={toggleModal}
            style={styles.containerFotoProduct}>
            <IcFloatButton fill={colors.default} width={40} height={40} />
            <Gap heigh={30} />
            <Text style={styles.placeholderFotoProduct}>Foto Produk</Text>
          </TouchableOpacity>
          {/* <View
            activeOpacity={0.7}
            style={{...styles.containerFotoProduct, flexDirection: 'row', flexWrap:'wrap', justifyContent:'space-between', height: 'auto', backgroundColor: colors.lightgrey ,paddingHorizontal: 15, paddingVertical: 5}}>
              <ImageBackground source={ProductDummy1} resizeMode='cover' style={{width: 100, height: 120, marginBottom: 20}} imageStyle={{borderRadius: 5}}>
                <TouchableOpacity activeOpacity={0.8} style={{position: 'absolute', top: -7, right: -7}}>
                  <IcCloseSolid fill={'#FF605C'} height={24} width={24}/>
                </TouchableOpacity>
              </ImageBackground>
              <ImageBackground source={ProductDummy2} resizeMode='cover' style={{width: 100, height: 120, marginBottom: 20}} imageStyle={{borderRadius: 5}}>
                <TouchableOpacity activeOpacity={0.8} style={{position: 'absolute', top: -7, right: -7}}>
                  <IcCloseSolid fill={'#FF605C'} height={24} width={24}/>
                </TouchableOpacity>
              </ImageBackground>
              <ImageBackground source={ProductDummy3} resizeMode='cover' style={{width: 100, height: 120, marginBottom: 20}} imageStyle={{borderRadius: 5}}>
                <TouchableOpacity activeOpacity={0.8} style={{position: 'absolute', top: -7, right: -7}}>
                  <IcCloseSolid fill={'#FF605C'} height={24} width={24}/>
                </TouchableOpacity>
              </ImageBackground>
              <ImageBackground source={ProductDummy4} resizeMode='cover' style={{width: 100, height: 120, marginBottom: 20}} imageStyle={{borderRadius: 5}}>
                <TouchableOpacity activeOpacity={0.8} style={{position: 'absolute', top: -7, right: -7}}>
                  <IcCloseSolid fill={'#FF605C'} height={24} width={24}/>
                </TouchableOpacity>
              </ImageBackground>
          </View> */}
        </View>
        <Gap height={96} />
        <SubmitButton label="Tambah" />
        <Gap height={64} />
      </ScrollView>
    </View>
  );
};

export default AddProductPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  inputForm: {
    paddingHorizontal: 20,
    paddingVertical: 32,
  },
  textFotoProduct: {
    fontSize: 18,
    fontWeight: 'normal',
    fontFamily: 'Poppins-Medium',
  },
  containerFotoProduct: {
    backgroundColor: colors.lightgrey,
    borderRadius: 10,
    marginTop: 16,
    marginBottom: 26,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderFotoProduct: {
    fontSize: 18,
    fontWeight: 'normal',
    fontFamily: 'Poppins-Medium',
    color: colors.grey,
  },
});
