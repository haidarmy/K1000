import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IcCamera, IcGallery} from '../../assets';
import Gap from '../Gap';
import {colors, showError, showWarning} from '../../utils';
import ImagePicker from 'react-native-image-crop-picker';

const ImagePickerModal = ({
  multiple = false,
  frontCamera = false,
  circleOverlay = false,
  hideBottomControls = false,
  setImageToParent,
  imageAmount,
  closeModal
}) => {
  const  cameraPicker = () => {
    closeModal()
    ImagePicker.openCamera({
      width: 375,
      height: 375,
      cropping: true,
      cropperToolbarColor: colors.white,
      cropperToolbarWidgetColor: colors.default,
      cropperStatusBarColor: colors.white,
      cropperActiveWidgetColor: colors.default,
      cropperCircleOverlay: circleOverlay,
      useFrontCamera: frontCamera,
      showCropGuidelines: false,
      showCropFrame: false,
      hideBottomControls: hideBottomControls,
      includeBase64: true,
      compressImageQuality: 0.5,
    })
      .then(image => {
        console.log('ngopi napa', [image])
        setImageToParent([image], image.data);
      })
      .catch(error => {
        setImageToParent(error.message);
      })
  }
  const galleryPicker = () => {
    closeModal()
    setTimeout(() => {
      ImagePicker.openPicker({
        width: 375,
        height: 375,
        multiple: multiple,
        cropping: true,
        mediaType: 'photo',
        cropperToolbarColor: colors.white,
        cropperToolbarWidgetColor: colors.default,
        cropperStatusBarColor: colors.white,
        cropperActiveWidgetColor: colors.default,
        cropperCircleOverlay: circleOverlay,
        showCropGuidelines: false,
        showCropFrame: false,
        hideBottomControls: hideBottomControls,
        includeBase64: true,
        compressImageQuality: 0.5,
      })
        .then(image => {
          if(multiple){
            Object.values(image).length + imageAmount.length <= 5
            ? setImageToParent(Object.values(image), image.data)
            : showError('Maksimal gambar yang bisa dipilih adalah 5');
          }else{
            setImageToParent(image, image.data);
          }
        })
        .catch(error => {
          setImageToParent(error.message);
        })
    }, 300)
  }
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.menuWrapper}
            onPress={() => cameraPicker()}>
            <IcCamera fill={colors.default} width={24} height={24} />
            <Text style={styles.text}>Ambil dari Camera</Text>
          </TouchableOpacity>
          <Gap height={24} />
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.menuWrapper}
            onPress={() => galleryPicker()}>
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
