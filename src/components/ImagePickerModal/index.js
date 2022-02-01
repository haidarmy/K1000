import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IcCamera, IcGallery} from '../../assets';
import Gap from '../Gap';
import {colors, colorsDark, showError, showWarning} from '../../utils';
import ImagePicker from 'react-native-image-crop-picker';
import {s, vs, ms, mvs} from 'react-native-size-matters';
import { useSelector } from 'react-redux';

const ImagePickerModal = ({
  multiple = false,
  frontCamera = false,
  circleOverlay = false,
  hideBottomControls = false,
  setImageToParent,
  imageAmount,
  closeModal
}) => {
  const theme = useSelector(state => state.DarkModeReducer.isDarkMode);
  const styles = getStyles(theme);
  const  cameraPicker = () => {
    closeModal()
    ImagePicker.openCamera({
      width: ms(375),
      height: mvs(375),
      cropping: true,
      cropperToolbarColor: theme ? colorsDark.white : colors.white,
      cropperToolbarWidgetColor: colors.default,
      cropperStatusBarColor: theme ? colorsDark.white : colors.white,
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
        setImageToParent([image], image.data);
      })
      .catch(error => {
        setImageToParent(false, false, error.message);
      })
  }
  const galleryPicker = () => {
    closeModal()
    setTimeout(() => {
      ImagePicker.openPicker({
        width: ms(375),
        height: mvs(375),
        multiple: multiple,
        cropping: true,
        mediaType: 'photo',
        cropperToolbarColor: theme ? colorsDark.white : colors.white,
        cropperToolbarWidgetColor: colors.default,
        cropperStatusBarColor: theme ? colorsDark.white : colors.white,
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
            console.log('jumlah gambar', imageAmount)
             imageAmount.length + Object.values(image).length <= 5
            ? setImageToParent(Object.values(image), image.data)
            : showError('Maksimal gambar yang bisa dipilih adalah 5');
          }else{
            setImageToParent(image, image.data);
          }
        })
        .catch(error => {
          setImageToParent(false, false,error.message);
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
            <IcCamera fill={colors.default} width={ms(24)} height={mvs(24)} />
            <Text style={styles.text}>Ambil dari Camera</Text>
          </TouchableOpacity>
          <Gap height={mvs(24)} />
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.menuWrapper}
            onPress={() => galleryPicker()}>
            <IcGallery fill={colors.default} width={ms(24)} height={mvs(24)} />
            <Text style={styles.text}>Pilih dari Galeri</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ImagePickerModal;

const getStyles = theme => StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: mvs(32),
    backgroundColor: theme ? colorsDark.white : colors.white,
    width: '90%',
    height: 'auto',
  },
  text: {
    fontSize: ms(18),
    fontFamily: 'Poppins-Medium',
    color: colors.grey,
    paddingLeft: ms(10),
  },
  menuWrapper: {
    flexDirection: 'row',
  },
});
