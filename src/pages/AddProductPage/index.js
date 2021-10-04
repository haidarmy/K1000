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
import FIREBASE from '../../config/FIREBASE';
import {uploadProduct} from '../../redux/action/StoreAction';
import {colors, fullAddressToCityId, getData} from '../../utils';

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

const AddProductPage = ({navigation, route, getCategoryResult}) => {
  const dispatch = useDispatch();
  const [singleImage, setSingleImage] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [categoryModal, setCategoryModal] = useState(false);
  const [form, setForm] = useState({
    uid: '',
    name: '',
    price: '',
    weight: '',
    desc: '',
    image: [],
    store: '',
    stock: '',
    category: '',
    categoryName: '',
    storeLocation: '',
  });

  useEffect(() => {
    getData('user').then(res => {
      console.log(res);
      setForm({
        ...form,
        store: res.name,
        storeLocation: fullAddressToCityId(res.address),
        uid: res.uid
      });
    });

    if (route.params) {
      setForm({
        ...form,
        name: route.params.productData.name,
        price: route.params.productData.price,
        weight: route.params.productData.weight,
        desc: route.params.productData.description,
        image: route.params.productData.image,
      });
    }
  }, []);

  const selectCategory = () => {
    setCategoryModal(!categoryModal);
  };
  const setSelectedCategory = ({categoryName, categoryId}) => {
    setCategoryModal(!categoryModal);
    setForm({...form, category: categoryId, categoryName: categoryName});
  };

  const setImageToParent = (imageResult, imageForDB) => {
    console.log('gambreng', imageResult);
    setSingleImage(imageResult[0]);
    if (imageResult) {
      let image = [...form.image];
      imageResult.map(img => image.push(img.path));
      setForm({...form, image});
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
    console.log('siap kirim', form.image[0]);
    dispatch(uploadProduct(form));
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
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
          onChangeText={value => setForm({...form, name: value})}
          value={form.name}
          placeholder="Nama Produk"
          label="Nama Produk"
        />
        <InputField
          onChangeText={value => setForm({...form, price: value})}
          value={form.price}
          placeholder="Harga Produk dalam (Rp)"
          label="Harga"
          keyboard="numeric"
        />
        <InputField
          onChangeText={value => setForm({...form, weight: value})}
          value={form.weight}
          placeholder="Berat Produk dalam (Kg)"
          label="Berat"
          keyboard="numeric"
        />
        <InputField
          onChangeText={value => setForm({...form, stock: value})}
          value={form.stock}
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
            value={form.categoryName}
            placeholder="Pilih Category"
            label="Category"
            disabled
          />
          <View style={{position: 'absolute', right: 20, top: 60}}>
            <IcDropdown height={32} width={32} />
          </View>
        </TouchableOpacity>
        <InputField
          onChangeText={value => setForm({...form, desc: value})}
          value={form.desc}
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
              : null}
            {form.image.length < 5 ? (
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
        <SubmitButton label="Tambah" onPress={() => addProductToDB()} />
        <Gap height={64} />
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => ({
  getCategoryLoading: state.CategoryReducer.getCategoryLoading,
  getCategoryResult: state.CategoryReducer.getCategoryResult,
  getCategoryError: state.CategoryReducer.getCategoryError,
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
