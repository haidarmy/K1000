import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import ImageViewer from 'react-native-image-zoom-viewer';
import {ms, mvs, s, vs} from 'react-native-size-matters';
import {connect, useDispatch, useSelector} from 'react-redux';
import {
  IcBackGrey,
  IcCartInactive,
  IcClose,
  IcHeartRed,
  IcStore,
  IcTrash,
  IcWishlistInactive,
} from '../../assets';
import {Gap, Number, SubmitButton} from '../../components';
import {addToCart, getCartList} from '../../redux/action/CartAction';
import {deleteProduct} from '../../redux/action/StoreAction';
import {
  addToWishlist,
  deleteWishlistItem,
} from '../../redux/action/WishlistAction';
import {
  colors,
  colorsDark,
  getData,
  showWarning,
  useForm,
  usePrevious,
} from '../../utils';

const ProductPage = ({navigation, route, setCartResult, getCartResult}) => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.DarkModeReducer.isDarkMode);
  const styles = getStyles(theme);
  const [isFavourite, setIsFavourite] = useState(false);
  const [dialog, setDialog] = useState(null);
  const [isActive, setIsActive] = useState(0);
  const {productData, id, love, onViewCount} = route.params;
  const {
    image,
    name,
    price,
    weight,
    description,
    store,
    stock,
    sold,
    uid: storeId,
  } = productData;

  useEffect(() => {
    onViewCount && onViewCount(storeId);
  }, [dispatch, storeId, onViewCount]);

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
        dispatch(getCartList(res.uid));
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
                  ms(18),
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
          <View style={styles.navWrapper}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.goBack()}
              style={styles.backButton}>
              <IcBackGrey width={ms(24)} height={mvs(24)} />
            </TouchableOpacity>
            {!route.params.store && (
              <TouchableOpacity
                style={styles.loveButton}
                onPress={() => sendToWishlist()}
                activeOpacity={0.7}>
                {isFavourite ? (
                  <IcHeartRed width={ms(24)} height={mvs(24)} />
                ) : (
                  <IcWishlistInactive width={ms(24)} height={mvs(24)} />
                )}
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
            <View style={styles.closeWrapper}>
              <IcClose
                width={ms(30)}
                height={mvs(30)}
                onPress={() => setDialog(false)}
              />
            </View>
          </View>
        </Modal>
        <View style={styles.content}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{name}</Text>
              <Number number={price} textStyle={styles.price} />
              <Text style={styles.weight}>{weight} kg</Text>
              <Text
                style={[
                  styles.text(
                    'Poppins-Medium',
                    16,
                    theme ? colorsDark.black : colors.black,
                  ),
                  {textAlign: 'left'},
                ]}>
                Terjual {sold}
              </Text>
              {route.params.store && (
                <Text
                  style={[
                    styles.text(
                      'Poppins-Medium',
                      16,
                      theme ? colorsDark.black : colors.black,
                    ),
                    {textAlign: 'left'},
                  ]}>
                  Stok {stock}
                </Text>
              )}
            </View>
            {!route.params.store ? (
              <View style={{alignItems: 'center'}}>
                <View style={styles.counterContainer}>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => minusFunc()}
                    style={styles.counterWrapper.minus}>
                    <Text style={styles.counterText}>-</Text>
                  </TouchableOpacity>
                  <TextInput
                    style={[
                      styles.text('Poppins-Medium'),
                      styles.counterWrapper.value,
                    ]}
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
                <Gap height={5} />
                <Text
                  style={styles.text(
                    'Poppins-Medium',
                    16,
                    theme ? colorsDark.black : colors.black,
                  )}>
                  Stok {stock}
                </Text>
              </View>
            ) : null}
          </View>
          <View style={styles.storeWrapper}>
            <IcStore fill={colors.default} />
            <Gap width={ms(5)} />
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                fontSize: ms(16),
                color: theme ? colorsDark.black : colors.black,
              }}>
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
              <Text onPress={toggleNumberOfLines} style={styles.showMore}>
                {textShown ? 'Baca lebih sedikit...' : 'Baca selengkapnya...'}
              </Text>
            ) : null}
            <Gap height={mvs(20)} />
          </View>
        </View>
      </ScrollView>
      {stock !== 0 && (
        <View style={styles.footer}>
          <View style={styles.footerWrapper}>
            <TouchableOpacity activeOpacity={0.7} style={styles.cart}>
              {route.params.store ? (
                <IcTrash width={ms(24)} height={mvs(24)} onPress={onDelete} />
              ) : (
                <IcCartInactive
                  width={ms(24)}
                  height={mvs(24)}
                  onPress={() => navigation.navigate('CartPage')}
                />
              )}
              {getCartResult ? (
                !route.params.store ? (
                  <View style={styles.badge}>
                    <Text
                      style={styles.text(
                        'Poppins-SemiBold',
                        ms(10),
                        colors.white,
                      )}>
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

const getStyles = theme => ({
  page: {
    backgroundColor: theme ? colorsDark.white : colors.white,
    flex: 1,
  },
  container: {
    flex: 1,
  },
  imageContainer: {
    height: '50%',
  },
  backButton: {
    width: ms(32),
    height: mvs(32),
    borderRadius: ms(16),
    backgroundColor: theme
      ? colorsDark.whiteTranslucent
      : colors.whiteTranslucent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loveButton: {
    width: ms(32),
    height: mvs(32),
    borderRadius: ms(16),
    backgroundColor: theme
      ? colorsDark.whiteTranslucent
      : colors.whiteTranslucent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: ms(20),
    paddingTop: mvs(30),
  },
  infoContainer: {
    marginBottom: mvs(20),
    flex: 1,
  },
  name: {
    fontSize: mvs(24),
    color: theme ? colorsDark.black : colors.black,
    fontFamily: 'Poppins-SemiBold',
  },
  price: {
    fontSize: mvs(24),
    color: colors.default,
    fontFamily: 'Poppins-SemiBold',
  },
  weight: {
    marginTop: mvs(-5),
    fontSize: mvs(14),
    color: colors.grey,
    fontFamily: 'Poppins-SemiBold',
  },
  desc: {
    fontSize: mvs(20),
    color: theme ? colorsDark.black : colors.black,
    fontFamily: 'Poppins-Medium',
  },
  detail: {
    fontSize: mvs(16),
    color: colors.grey,
    fontFamily: 'Poppins-Regular',
    lineHeight: mvs(21),
    textAlign: 'justify',
  },
  footer: {
    // height: 122,
    backgroundColor: theme ? colorsDark.lightgrey : colors.lightgrey,
  },
  footerWrapper: {
    paddingVertical: vs(20),
    paddingHorizontal: s(15),
    justifyContent: 'space-between',
    flexDirection: 'row',
    // backgroundColor: colors.red
  },
  cart: {
    width: ms(58),
    height: mvs(58),
    backgroundColor: theme ? colorsDark.white : colors.white,
    borderRadius: ms(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: mvs(58),
    width: '75%',
    // width: ms(280),
    // padding: 20
  },
  image: {
    width: Dimensions.get('window').width,
    height: mvs(375),
    resizeMode: 'cover',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    marginBottom: mvs(15),
  },
  pagingText: {
    color: colors.black,
  },
  pagingActiveText: {
    color: colors.lightgrey,
  },
  counterText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: ms(16),
    color: theme ? colorsDark.black : colors.black,
  },
  counterContainer: {flexDirection: 'row', paddingTop: mvs(5)},
  counterWrapper: {
    plus: {
      width: ms(32),
      height: mvs(32),
      backgroundColor: theme ? colorsDark.white : colors.white,
      borderWidth: ms(2),
      borderColor: theme ? colorsDark.lightgrey : colors.lightgrey,
      borderTopRightRadius: ms(8),
      borderBottomRightRadius: ms(8),
      justifyContent: 'center',
      alignItems: 'center',
    },
    value: {
      color: theme ? colorsDark.black : colors.black,
      width: ms(32),
      height: mvs(32),
      padding: 0,
      backgroundColor: theme ? colorsDark.lightgrey : colors.lightgrey,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: ms(2),
      borderColor: theme ? colorsDark.lightgrey : colors.lightgrey,
    },
    minus: {
      width: ms(32),
      height: mvs(32),
      backgroundColor: theme ? colorsDark.white : colors.white,
      borderColor: theme ? colorsDark.lightgrey : colors.lightgrey,
      borderWidth: ms(2),
      borderTopLeftRadius: ms(8),
      borderBottomLeftRadius: ms(8),
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  text: (
    fontFamily = 'Poppins-Regular',
    fontSize = ms(16),
    color = theme ? colorsDark.black : colors.black,
  ) => ({
    textAlign: 'center',
    fontFamily: fontFamily,
    fontSize: fontSize,
    color: color,
  }),
  outOfStock: {
    backgroundColor: 'rgba(0,0,0,0.75)',
    width: ms(120),
    height: mvs(120),
    borderRadius: ms(80),
    position: 'absolute',
    top: mvs(107.5),
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  badge: {
    backgroundColor: colors.red,
    width: ms(24),
    height: mvs(24),
    borderRadius: ms(12),
    position: 'absolute',
    top: mvs(6),
    right: ms(6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  navWrapper: {
    width: Dimensions.get('window').width,
    justifyContent: 'space-between',
    flexDirection: 'row',
    position: 'absolute',
    padding: mvs(20),
    paddingTop: StatusBar.currentHeight + mvs(10),
  },
  closeWrapper: {
    flexDirection: 'row-reverse',
    position: 'absolute',
    top: mvs(15),
    right: ms(15),
  },
  storeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: mvs(-15),
    paddingVertical: mvs(10),
  },
  showMore: {
    lineHeight: mvs(21),
    marginTop: mvs(10),
    color: colors.default,
    fontFamily: 'Poppins-Bold',
  },
});

const mapStateToProps = state => ({
  setCartLoading: state.CartReducer.setCartLoading,
  setCartResult: state.CartReducer.setCartResult,
  setCartError: state.CartReducer.setCartError,

  getCartResult: state.CartReducer.getCartResult,
});

export default connect(mapStateToProps, null)(ProductPage);
