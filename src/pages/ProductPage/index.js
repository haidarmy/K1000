import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
  Dimensions,
  StatusBar,
  Alert,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import ImageViewer from 'react-native-image-zoom-viewer';
import {connect, useDispatch} from 'react-redux';
import {height, width} from 'styled-system';
import {
  IcCartInactive,
  IcWishlistInactive,
  IcBack,
  IcHeartRed,
  IcClose,
  ProductDummy1,
  IcStore,
  IcTrash,
} from '../../assets';
import {SubmitButton, Gap} from '../../components';
import {addToCart, getCartList} from '../../redux/action/CartAction';
import {deleteProduct} from '../../redux/action/StoreAction';
import {
  addToWishlist,
  deleteWishlistItem,
} from '../../redux/action/WishlistAction';
import {colors, getData, showWarning, useForm, usePrevious} from '../../utils';

const ProductPage = ({navigation, route, setCartResult, getCartResult}) => {
  const dispatch = useDispatch();

  const [isFavourite, setIsFavourite] = useState(false);
  const [dialog, setDialog] = useState(null);
  const [isActive, setIsActive] = useState(0);
  const {productData, id, love} = route.params;
  const {image, name, price, weight, description, store, stock} = productData;

  const images = image.map(img => {
    return {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height / 2,
      url: `${img}`,
      freeHeight: false,
    };
  });

  const [form, setForm] = useForm({
    product: {...productData, productId: id},
    images: image,
    amount: 1,
    uid: '',
  });

  const prevCartResult = usePrevious(setCartResult);
  useEffect(() => {
    console.log('product Data', stock);
    if (setCartResult !== false && setCartResult !== prevCartResult) {
      navigation.replace('SuccessAddToCartPage');
    }
  }, [setCartResult]);

  useEffect(() => {
    if (love) {
      setIsFavourite(love);
    }
    setForm('form.amount', route.params.orderAmount);
    getData('user').then(res => {
      if (res) {
        setForm('uid', res.uid);
        dispatch(getCartList(res.uid))
      }
    });
  }, [form.uid]);

  const sendToCart = () => {
    dispatch(addToCart(form));
  };

  const onDelete = () => {
    Alert.alert(
      'Alert',
      'Apakah yakin anda ingin menghapus product?',
      [
        {
          text: 'Batal',
          onPress: () => {},
        },
        {
          text: 'Ya',
          onPress: () => {
            dispatch(
              deleteProduct(
                route.params.productData.image,
                route.params.id,
                route.params.store,
              ),
            );
            navigation.replace('StorePage');
          },
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  const sendToWishlist = () => {
    if (isFavourite) {
      setIsFavourite(toggle => !toggle);
      console.log('ID if', id);
      console.log('ID if', form.uid);
      dispatch(deleteWishlistItem(form, id));
    } else {
      setIsFavourite(toggle => !toggle);
      console.log('ID else', id);
      dispatch(addToWishlist(form, id));
    }
  };

  const plusFunc = () => {
    if (form.amount < stock && form.amount < 99) {
      setForm('amount', form.amount + 1);
    } else {
      if (stock < 99) {
        showWarning(`Maksimal item yang dapat ditambahkan adalah ${stock}`);
      } else {
        showWarning('Maksimal item yang dapat ditambahkan adalah 99');
      }
    }
  };

  const minusFunc = () => {
    if (form.amount > 0) {
      setForm('amount', form.amount - 1);
    }
  };

  let change = ({nativeEvent}) => {
    const slide = Math.round(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
    );
    if (slide !== isActive) {
      setIsActive(slide);
    }
  };

  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
  const toggleNumberOfLines = () => {
    //To toggle the show text or hide it
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length >= 4); //to check the text is more than 4 lines or not
    // console.log(e.nativeEvent);
  }, []);

  return (
    <View style={styles.page}>
      <StatusBar
        barStyle="dark-content"
        // translucent
        backgroundColor="rgba(0,0,0,0)"
        animated
      />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setDialog(true)}
          style={[styles.imageContainer, {position: 'relative'}]}>
          {stock === 0 && (
            <View style={styles.outOfStock}>
              <Text
                style={styles.text(
                  'Poppins-Regular',
                  24,
                  colors.white,
                )}>{`Produk\nHabis`}</Text>
            </View>
          )}
          <ScrollView
            pagingEnabled
            horizontal
            onScroll={change}
            showsHorizontalScrollIndicator={false}>
            {images.map((image, index) => (
              <Image
                key={index}
                source={{uri: image.url}}
                style={styles.image}
              />
            ))}
          </ScrollView>
          <View style={styles.pagination}>
            {images.map((image, index) => (
              <Text
                key={index}
                style={
                  index == isActive
                    ? styles.pagingActiveText
                    : styles.pagingText
                }>
                ⬤
              </Text>
            ))}
          </View>
          <View
            style={{
              width: Dimensions.get('window').width,
              justifyContent: 'space-between',
              flexDirection: 'row',
              position: 'absolute',
              paddingTop: 40,
              paddingHorizontal: 20,
            }}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('HomePage')}
              style={styles.backButton}>
              <IcBack width={30} height={30} />
            </TouchableOpacity>
            {!route.params.store && (
              <TouchableOpacity
                style={styles.loveButton}
                onPress={() => sendToWishlist()}
                activeOpacity={0.7}>
                {isFavourite ? <IcHeartRed /> : <IcWishlistInactive />}
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
        <Modal
          onRequestClose={() => setDialog(false)}
          visible={dialog}
          transparent={true}
          style={styles.imageContainer}>
          <View style={{flex: 1}}>
            <StatusBar barStyle="dark-content" backgroundColor="rgb(0,0,0)" />
            <ImageViewer
              style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height / 2,
              }}
              index={isActive}
              onCancel={() => setDialog(false)}
              menus={() => null}
              enableSwipeDown={true}
              imageUrls={images}></ImageViewer>
            <View
              style={{
                flexDirection: 'row-reverse',
                position: 'absolute',
                top: 15,
                right: 15,
              }}>
              <IcClose
                width={30}
                height={30}
                onPress={() => setDialog(false)}
              />
            </View>
          </View>
        </Modal>
        <View style={styles.content}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.price}>Rp {price}</Text>
              <Text style={styles.weight}>{weight} kg</Text>
            </View>
            {!route.params.store ? (
              <View style={{flexDirection: 'row', paddingTop: 5}}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => minusFunc()}
                  style={styles.counterWrapper.minus}>
                  <Text style={styles.counterText}>-</Text>
                </TouchableOpacity>
                <TextInput
                  style={(styles.counterText, styles.counterWrapper.value)}
                  defaultValue="1"
                  value={`${
                    route.params.orderAmount
                      ? route.params.orderAmount
                      : form.amount
                      ? form.amount
                      : 1
                  }`}
                  textAlign="center"
                  keyboardType="numeric"
                  maxLength={2}
                  onChangeText={value =>
                    form.amount < 99
                      ? setForm('amount', parseInt(value))
                      : setForm('amount', 1)
                  }
                />
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => plusFunc()}
                  style={styles.counterWrapper.plus}>
                  <Text style={styles.counterText}>+</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: -15,
              paddingVertical: 10,
            }}>
            <IcStore fill={colors.default} />
            <Gap width={5} />
            <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 16}}>
              {store}
            </Text>
          </View>
          <View>
            <Text style={styles.desc}>Deskripsi</Text>
            <Text
              onTextLayout={onTextLayout}
              numberOfLines={textShown ? undefined : 4}
              style={styles.detail}>
              {description}
            </Text>
            {lengthMore ? (
              <Text
                onPress={toggleNumberOfLines}
                style={{
                  lineHeight: 21,
                  marginTop: 10,
                  color: colors.default,
                  fontFamily: 'Poppins-Bold',
                }}>
                {textShown ? 'Baca lebih sedikit...' : 'Baca selengkapnya...'}
              </Text>
            ) : null}
            <Gap height={20} />
          </View>
        </View>
      </ScrollView>
      {stock !== 0 && (
        <View style={styles.footer}>
          <View style={styles.footerWrapper}>
            <TouchableOpacity activeOpacity={0.7} style={styles.cart}>
              {route.params.store ? (
                <IcTrash width={24} height={24} onPress={onDelete} />
              ) : (
                <IcCartInactive
                  width={24}
                  height={24}
                  onPress={() => navigation.navigate('CartPage')}
                />
              )}
              {getCartResult ? (
                !route.params.store ? (
                  <View style={styles.badge}>
                    <Text
                      style={styles.text('Poppins-SemiBold', 10, colors.white)}>
                      {Object.keys(getCartResult.orders).length < 99
                        ? Object.keys(getCartResult.orders).length
                        : '99+'}
                    </Text>
                  </View>
                ) : null
              ) : null}
            </TouchableOpacity>
            <View style={styles.button}>
              <SubmitButton
                label={
                  route.params.store ? 'Edit Produk' : 'Tambah ke Keranjang'
                }
                onPress={
                  route.params.store
                    ? () =>
                        navigation.navigate('AddProductPage', {
                          productData: route.params.productData,
                          id: route.params.id,
                        })
                    : sendToCart
                }
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = {
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  container: {
    flex: 1,
  },
  imageContainer: {
    width: undefined,
    height: 375,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loveButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 35,
  },
  infoContainer: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    color: colors.black,
    fontFamily: 'Poppins-SemiBold',
  },
  price: {
    fontSize: 24,
    color: colors.default,
    fontFamily: 'Poppins-SemiBold',
  },
  weight: {
    marginTop: -5,
    fontSize: 14,
    color: colors.grey,
    fontFamily: 'Poppins-SemiBold',
  },
  desc: {
    fontSize: 20,
    color: colors.black,
    fontFamily: 'Poppins-Medium',
  },
  detail: {
    fontSize: 16,
    color: colors.grey,
    fontFamily: 'Poppins-Regular',
    lineHeight: 21,
    textAlign: 'justify',
  },
  footer: {
    height: 122,
    backgroundColor: colors.lightgrey,
  },
  footerWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 32,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  cart: {
    width: 58,
    height: 58,
    backgroundColor: colors.white,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 58,
    width: 280,
  },
  image: {
    width: Dimensions.get('window').width,
    height: 375,
    resizeMode: 'cover',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    marginBottom: 15,
  },
  pagingText: {
    color: colors.black,
  },
  pagingActiveText: {
    color: colors.lightgrey,
  },
  counterText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: colors.black,
  },
  counterWrapper: {
    plus: {
      width: 32,
      height: 32,
      backgroundColor: colors.white,
      borderWidth: 2,
      borderColor: colors.lightgrey,
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    value: {
      width: 32,
      height: 32,
      padding: 0,
      backgroundColor: colors.lightgrey,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: colors.lightgrey,
    },
    minus: {
      width: 32,
      height: 32,
      backgroundColor: colors.white,
      borderColor: colors.lightgrey,
      borderWidth: 2,
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  text: (
    fontFamily = 'Poppins-Regular',
    fontSize = 16,
    color = colors.black,
  ) => ({
    textAlign: 'center',
    fontFamily: fontFamily,
    fontSize: fontSize,
    color: color,
  }),
  outOfStock: {
    backgroundColor: 'rgba(0,0,0,0.75)',
    width: 160,
    height: 160,
    borderRadius: 80,
    position: 'absolute',
    top: 107.5,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  badge: {
    backgroundColor: colors.red,
    width: 24,
    height: 24,
    borderRadius: 12,
    position: 'absolute',
    top: 6,
    right: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const mapStateToProps = state => ({
  setCartLoading: state.CartReducer.setCartLoading,
  setCartResult: state.CartReducer.setCartResult,
  setCartError: state.CartReducer.setCartError,

  getCartResult: state.CartReducer.getCartResult,
});

export default connect(mapStateToProps, null)(ProductPage);
