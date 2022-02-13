import React, {useEffect, useState} from 'react';
import {colors, colorsDark, getData, useForm} from '../../utils';
import {
  Home,
  Bag,
  IcWishlistInactive,
  User,
  Search,
  Filter,
  Swiper,
  IcHeartSolid,
  IcCloseSolid,
  IcEdit,
  IcHeartRed,
} from '../../assets';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  ImageBackground,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {useDispatch, useSelector} from 'react-redux';
import {
  addToWishlist,
  deleteWishlistItem,
  getWishlist,
} from '../../redux/action/WishlistAction';
import {deleteProduct} from '../../redux/action/StoreAction';
import {s, vs, ms, mvs} from 'react-native-size-matters';
import {Gap, Number} from '..';

const ProductCard = ({
  stock,
  images,
  image,
  name,
  price,
  weight,
  store,
  onNavigate,
  rest,
  love,
  id,
  sold,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isFavourite, setIsFavourite] = useState(false);
  const [form, setForm] = useForm({
    product: rest,
    images: image,
    amount: 1,
    uid: '',
  });

  useEffect(() => {
    if (love) {
      setIsFavourite(love);
    }
    getData('user').then(res => {
      if (res) {
        setForm('uid', res.uid);
      }
    });
  }, []);

  const sendToWishlist = () => {
    if (isFavourite) {
      setIsFavourite(toggle => !toggle);
      dispatch(deleteWishlistItem(form, id));
      dispatch(getWishlist(form.uid));
    } else {
      setIsFavourite(toggle => !toggle);
      dispatch(addToWishlist(form, id));
      dispatch(getWishlist(form.uid));
    }
  };

  const delProduct = () => {
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
            dispatch(deleteProduct(images, id, rest.store));
          },
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  const productDetail = () => {
    navigation.navigate('ProductPage', {
      productData: rest,
      id,
      love: love || isFavourite,
      store,
    });
  };
  const theme = useSelector(state => state.DarkModeReducer.isDarkMode);
  const styles = getStyles(theme);
  return (
    <TouchableOpacity
      onPress={productDetail}
      style={styles.container}
      activeOpacity={0.7}>
      <ImageBackground
        source={image}
        imageStyle={{
          borderTopLeftRadius: ms(10),
          borderTopRightRadius: ms(10),
        }}
        style={styles.image}>
        {store ? (
          <TouchableOpacity
            style={styles.loveWrapper('marginLeft', 'flex-start')}
            onPress={onNavigate}>
            <IcEdit fill={colors.grey} width={ms(24)} height={mvs(24)} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.loveWrapper('marginRight', 'flex-end')}
            onPress={() => sendToWishlist()}>
            {isFavourite ? <IcHeartRed /> : <IcWishlistInactive />}
          </TouchableOpacity>
        )}
        {stock === 0 && (
          <View style={styles.stockLabel}>
            <Text
              style={styles.textStock(
                'Poppins-SemiBold',
                ms(14),
                colors.white,
              )}>
              Stok Habis
            </Text>
          </View>
        )}
      </ImageBackground>
      <View style={{marginHorizontal: ms(16), paddingBottom: mvs(10)}}>
        <View style={{marginBottom: mvs(8)}}>
          {stock <= 10 && !store ? (
            <Text style={styles.text.stock}>Sisa {stock}</Text>
          ) : null}
          <Text style={styles.text.title}>{name}</Text>
        </View>
        <View style={styles.info}>
          <View style={{flex: 1}}>
            <Number number={price} textStyle={styles.text.price} />
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.text.weight}>{weight} kg</Text>
              {sold && !store ? (
                <Text style={styles.text.weight}> | Terjual {sold} </Text>
              ) : null}
            </View>
          </View>
        </View>
        {store && (
          <>
            <Gap height={mvs(10)} />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={styles.textStock(
                  'Poppins-SemiBold',
                  ms(16),
                  theme ? colorsDark.black : colors.black,
                )}>
                Stok
              </Text>
              <Text
                style={styles.textStock(
                  'Poppins-SemiBold',
                  ms(16),
                  theme ? colorsDark.black : colors.black,
                )}>
                {stock}
              </Text>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={styles.textStock(
                  'Poppins-SemiBold',
                  ms(16),
                  theme ? colorsDark.black : colors.black,
                )}>
                Terjual
              </Text>
              <Text
                style={styles.textStock(
                  'Poppins-SemiBold',
                  ms(16),
                  theme ? colorsDark.black : colors.black,
                )}>
                {sold}
              </Text>
            </View>
          </>
        )}
      </View>
      {store && (
        <TouchableOpacity activeOpacity={0.8} style={styles.delete}>
          <IcCloseSolid
            fill={'#FF605C'}
            height={mvs(32)}
            width={ms(32)}
            onPress={delProduct}
          />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const getStyles = theme => ({
  container: {
    backgroundColor: theme ? colorsDark.lightgrey : colors.lightgrey,
    minHeight: vs(280),
    // maxHeight: vs(320),
    paddingBottom: mvs(20),
    width: s(150),
    marginBottom: mvs(16),
    borderRadius: 10,
    elevation: 8,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    height: mvs(175),
    width: '100%',
    borderTopLeftRadius: ms(10),
    borderTopRightRadius: ms(10),
    marginBottom: mvs(8),
  },
  info: {
    flexDirection: 'row',
    height: vs(40),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    title: {
      fontSize: ms(20),
      fontFamily: 'Poppins-SemiBold',
      color: theme ? colorsDark.black : colors.black,
    },
    price: {
      fontSize: ms(16),
      color: colors.default,
      fontFamily: 'Poppins-SemiBold',
    },
    weight: {
      fontSize: ms(12),
      color: colors.grey,
      fontFamily: 'Poppins-SemiBold',
    },
    stock: {
      fontSize: ms(14),
      color: colors.red,
      fontFamily: 'Poppins-SemiBold',
    },
  },
  loveWrapper: (marginPosition, flexPosition) => ({
    width: s(32),
    height: vs(32),
    borderRadius: ms(18),
    backgroundColor: theme
      ? colorsDark.whiteTranslucent
      : colors.whiteTranslucent,
    justifyContent: 'center',
    alignItems: 'center',
    [`${marginPosition}`]: s(10),
    marginTop: vs(10),
    alignSelf: `${flexPosition}`,
  }),
  textStock: (
    fontFamily = 'Poppins-Regular',
    fontSize = ms(16),
    color = theme ? colorsDark.black : colors.black,
  ) => ({
    fontFamily: fontFamily,
    fontSize: fontSize,
    color: color,
  }),
  stockLabel: {
    backgroundColor: 'rgba(33,33,33,0.6)',
    width: s(90),
    height: vs(28),
    borderRadius: ms(5),
    position: 'absolute',
    top: vs(125),
    left: s(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  delete: {position: 'absolute', top: mvs(-8), right: ms(-8)},
});

export default ProductCard;
