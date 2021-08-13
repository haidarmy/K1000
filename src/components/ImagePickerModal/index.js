import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IcCamera, IcGallery} from '../../assets';
import {Gap} from '../Gap';
import {colors} from '../../utils';
import ImagePicker from 'react-native-image-crop-picker';

const ImagePickerModal = ({multiple}) => {
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.menuWrapper}
            onPress={() =>
              ImagePicker.openCamera({
                width: 375,
                height: 375,
                cropping: true,
              }).then(image => {
                console.log(image);
              })
            }>
            <IcCamera fill={colors.default} width={24} height={24} />
            <Text style={styles.text}>Ambil dari Camera</Text>
          </TouchableOpacity>
          <Gap height={24} />
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.menuWrapper}
            onPress={() =>
              ImagePicker.openPicker({
                width: 375,
                height: 375,
                multiple: {multiple},
                cropping: true,
              }).then(image => {
                console.log(image);
              })
            }>
            <IcGallery fill={colors.default} width={24} height={24} />
            <Text style={styles.text}>Pilih dari Galeri</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ImagePickerModal;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: colors.white,
    width: '80%',
    height: 'auto',
  },
  text: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: colors.grey,
    paddingLeft: 10,
  },
  menuWrapper: {
    flexDirection: 'row',
  },
});
