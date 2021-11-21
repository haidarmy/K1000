import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import {connect, useDispatch} from 'react-redux';
import {IcCloseSolid, IcDropdown, IcFloatButton} from '../../assets';
import {
  Gap,
  Header,
  ImagePickerModal,
  InputField,
  SubmitButton,
} from '../../components';
import {editProduct, uploadProduct} from '../../redux/action/StoreAction';
import {
  colors,
  fullAddressToCityId,
  getData,
  showError,
  showSucces,
  usePrevious,
} from '../../utils';

const CategorySelector = ({
  toggleCategoryModal,
  categoryData,
  setSelectedCategory,
}) => {
  return (
    <Modal
      deviceHeight={Dimensions.get('screen').height}
      statusBarTranslucent
      isVisible={true}
      onBackdropPress={toggleCategoryModal}
      onBackButtonPress={toggleCategoryModal}>
      <View style={styles.categorySelector.page}>
        <View style={styles.categorySelector.container}>
          <Text style={{...styles.categorySelector.text, color: colors.grey}}>
            Pilih Category...
          </Text>
          {categoryData
            ? Object.keys(categoryData).map(key => {
                return (
                  <TouchableOpacity
                    key={key}
                    id={key}
                    activeOpacity={0.7}
                    onPress={() =>
                      setSelectedCategory({
                        categoryName: categoryData[key].namecategory,
                        categoryId: key,
                      })
                    }>
                    <Text style={styles.categorySelector.text}>
                      {categoryData[key].namecategory}
                    </Text>
                  </TouchableOpacity>
                );
              })
            : null}
        </View>
      </View>
    </Modal>
  );
};

const AddProductPage = ({
  navigation,
  route,
  getCategoryResult,
  uploadStoreProductLoading,
  uploadStoreProductResult,
  editStoreProductLoading,
  editStoreProductResult
}) => {
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const [categoryModal, setCategoryModal] = useState(false);
  const [form, setForm] = useState({
    uid: '',
    name: '',
    price: ' ',
    weight: ' ',
    description: '',
    image: [],
    store: '',
    stock: ' ',
    category: '',
    categoryName: '',
    storeLocation: '',
    date: '',
    sold: 0,
  });

  useEffect(() => {
    console.log('hadeeh', route.params);
    getData('user').then(res => {
      console.log(res);
      if (route.params) {
        setForm({
          ...form,
          store: res.name,
          storeLocation: fullAddressToCityId(res.address),
          uid: res.uid,
          name: route.params.productData.name,
          price: route.params.productData.price,
          stock: route.params.productData.stock,
          weight: route.params.productData.weight,
          description: route.params.productData.description,
          image: route.params.productData.image,
          category: route.params.productData.category,
          categoryName: route.params.productData.categoryName,
        });
      } else {
        setForm({
          ...form,
          date: Date.now(),
          store: res.name,
          storeLocation: fullAddressToCityId(res.address),
          uid: res.uid,
        });
      }
    });
  }, []);

  const selectCategory = () => {
    setCategoryModal(!categoryModal);
  };
  const setSelectedCategory = ({categoryName, categoryId}) => {
    setCategoryModal(!categoryModal);
    setForm({...form, category: categoryId, categoryName: categoryName});
  };

  const setImageToParent = (imageResult, imageForDB, error) => {
    if (imageResult) {
      let image = [...form.image];
      imageResult.map(img => image.push(img.path));
      setForm({...form, image});
    } else if (error) {
      showError(error);
    }
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  const deleteImage = image => {
    let images = [...form.image];
    images = images.filter(img => img !== image);
    setForm({...form, image: images});
  };
  const addProductToDB = () => {
    console.log('form', form);
    if (
      form.name &&
      form.price &&
      form.weight &&
      form.stock &&
      form.category &&
      form.description &&
      form.image &&
      form.uid &&
      form.store &&
      form.storeLocation
    ) {
      if (route.params) {
        const newImage = form.image.filter(
          item => !route.params.productData.image.includes(item),
        );
        const deleteImage = route.params.productData.image.filter(
          item => !form.image.includes(item),
        );
        const oldImage = form.image.filter(item => !newImage.includes(item));
        console.log('new Image', newImage);
        console.log('delete Image', deleteImage);
        dispatch(editProduct({...form, weight: parseFloat(form.weight)}, newImage, deleteImage, oldImage, route.params.id));
      } else {
        dispatch(uploadProduct({...form, weight: parseFloat(form.weight)}));
      }
    } else {
      showError('Pastikan semua kolom terisi!');
    }
  };

  const prevUploadStoreProductResult = usePrevious(uploadStoreProductResult);
  const prevEditStoreProductResult = usePrevious(editStoreProductResult);
  useEffect(() => {
    if(route.params){
      if (
        editStoreProductResult !== false &&
        editStoreProductResult !== prevEditStoreProductResult
      ) {
        navigation.replace('StoreDrawer');
        setTimeout(() => {
          showSucces('Product berhasil diubah!');
        }, 1000);
      }
    }else {
      if (
        uploadStoreProductResult !== false &&
        uploadStoreProductResult !== prevUploadStoreProductResult
      ) {
        navigation.replace('StoreDrawer');
        setTimeout(() => {
          showSucces('Product berhasil ditambahkan!');
        }, 1000);
      }
    }
  }, [uploadStoreProductResult, editStoreProductResult]);
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={
          uploadStoreProductLoading || editStoreProductLoading ? colors.loading : colors.white
        }
      />
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
        <ImagePickerModal
          multiple
          setImageToParent={setImageToParent}
          imageAmount={form.image}
          closeModal={closeModal}
        />
      </Modal>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.inputForm}>
        <InputField
          onChangeText={value =>
            value.length === 0
              ? setForm({...form, name: ''})
              : setForm({...form, name: value})
          }
          value={
            form.name !== false
              ? form.name
              : route.params
              ? route.params.productData.name
              : form.name
          }
          placeholder="Nama Produk"
          label="Nama Produk"
        />
        <InputField
          onChangeText={value =>
            value.length === 0
              ? setForm({...form, price: ''})
              : setForm({...form, price: isNaN(value) ? '' : parseInt(value)})
          }
          value={
            isNaN(form.price)
              ? ''
              : form.price.toString() != ' '
              ? form.price.toString()
              : route.params
              ? route.params.productData.price.toString()
              : ''
          }
          placeholder="Harga Produk dalam (Rp)"
          label="Harga"
          keyboard="numeric"
        />
        <InputField
          onChangeText={value =>
            value.length === 0
              ? setForm({...form, weight: ''})
              : setForm({
                  ...form,
                  weight:
                    isNaN(value) && value !== '.'
                      ? ''
                      : value[0] == '.' ? '0.' : value.includes('.')
                      ? value
                      : parseFloat(value),
                })
          }
          value={
            isNaN(form.weight) && form.weight !== '.'
              ? ''
              : form.weight.toString() != ' '
              ? form.weight.toString()
              : route.params
              ? route.params.productData.weight.toString()
              : ''
          }
          placeholder="Berat Produk dalam (Kg)"
          label="Berat"
          keyboard="numeric"
        />
        <InputField
          onChangeText={value =>
            value.length === 0
              ? setForm({...form, stock: ''})
              : setForm({...form, stock: isNaN(value) ? '' : parseInt(value)})
          }
          value={
            isNaN(form.stock)
              ? ''
              : form.stock.toString() != ' '
              ? form.stock.toString()
              : route.params
              ? route.params.productData.stock.toString()
              : ''
          }
          placeholder="Stok Barang"
          label="Stok"
          keyboard="numeric"
          maxlength={4}
        />
        {categoryModal && (
          <CategorySelector
            toggleCategoryModal={selectCategory}
            categoryData={getCategoryResult}
            setSelectedCategory={setSelectedCategory}
          />
        )}
        <TouchableOpacity
          onPress={selectCategory}
          activeOpacity={1}
          style={{position: 'relative'}}>
          <InputField
            value={
              form.categoryName
                ? form.categoryName
                : route.params
                ? route.params.productData.categoryName
                : form.categoryName
            }
            placeholder="Pilih Category"
            label="Category"
            disabled
          />
          <View style={{position: 'absolute', right: 20, top: 60}}>
            <IcDropdown height={32} width={32} />
          </View>
        </TouchableOpacity>
        <InputField
          onChangeText={value =>
            value.length === 0
              ? setForm({...form, description: ''})
              : setForm({...form, description: value})
          }
          value={
            form.description !== false
              ? form.description
              : route.params
              ? route.params.productData.description
              : form.description
          }
          placeholder="Deskripsi Produk..."
          label="Deskripsi"
          multiline={true}
          numberOfLines={4}
        />
        <View>
          <Text style={styles.textFotoProduct}>Foto Produk</Text>
          <View
            activeOpacity={0.7}
            style={{
              ...styles.containerFotoProduct,
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'flex-start',
              height: 'auto',
              backgroundColor: colors.lightgrey,
              paddingHorizontal: 20,
              paddingVertical: 5,
            }}>
            {form.image
              ? Object.values(form.image).map((image, index) => {
                  return (
                    <ImageBackground
                      key={index}
                      source={{uri: image}}
                      resizeMode="cover"
                      style={{
                        width: 100,
                        height: 120,
                        marginBottom: 20,
                        marginRight: 10,
                      }}
                      imageStyle={{borderRadius: 5}}>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        style={{position: 'absolute', top: -7, right: -7}}>
                        <IcCloseSolid
                          fill={'#FF605C'}
                          height={24}
                          width={24}
                          onPress={() => deleteImage(image)}
                        />
                      </TouchableOpacity>
                    </ImageBackground>
                  );
                })
              : route.params
              ? Object.values(route.params.productData.image).map(
                  (image, index) => {
                    return (
                      <ImageBackground
                        key={index}
                        source={{uri: image}}
                        resizeMode="cover"
                        style={{
                          width: 100,
                          height: 120,
                          marginBottom: 20,
                          marginRight: 10,
                        }}
                        imageStyle={{borderRadius: 5}}>
                        <TouchableOpacity
                          activeOpacity={0.8}
                          style={{position: 'absolute', top: -7, right: -7}}>
                          <IcCloseSolid
                            fill={'#FF605C'}
                            height={24}
                            width={24}
                            onPress={() => deleteImage(image)}
                          />
                        </TouchableOpacity>
                      </ImageBackground>
                    );
                  },
                )
              : null}
            {form.image.length < 5 ||
            form.image === [] ||
            route.params?.productData.image.length < 5 ? (
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={{
                  width: 100,
                  height: 120,
                  marginBottom: 20,
                  borderRadius: 5,
                  borderWidth: 2,
                  borderColor: colors.default,
                  borderStyle: 'dashed',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <IcFloatButton fill={colors.default} width={24} height={24} />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
        <Gap height={96} />
        <SubmitButton
          label={route.params ? 'Simpan Perubahan' : 'Tambah'}
          onPress={() => addProductToDB()}
        />
        <Gap height={64} />
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => ({
  getCategoryLoading: state.CategoryReducer.getCategoryLoading,
  getCategoryResult: state.CategoryReducer.getCategoryResult,
  getCategoryError: state.CategoryReducer.getCategoryError,

  uploadStoreProductLoading: state.StoreReducer.uploadStoreProductLoading,
  uploadStoreProductResult: state.StoreReducer.uploadStoreProductResult,
  uploadStoreProductError: state.StoreReducer.uploadStoreProductError,

  editStoreProductLoading: state.StoreReducer.editStoreProductLoading,
  editStoreProductResult: state.StoreReducer.editStoreProductResult,
  editStoreProductError: state.StoreReducer.editStoreProductError,
});

export default connect(mapStateToProps, null)(AddProductPage);

const styles = {
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
  categorySelector: {
    page: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
      paddingVertical: 32,
      backgroundColor: colors.white,
      width: '80%',
      height: 'auto',
    },
    text: {
      fontSize: 20,
      fontFamily: 'Poppins-Regular',
      color: colors.black,
      paddingLeft: 25,
      marginBottom: 10,
    },
  },
};
