import React, {useEffect, useState} from 'react';
import {colors, getData, useForm} from '../../utils';
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
} from '../../assets';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {useDispatch} from 'react-redux';
import {
  addToWishlist,
  deleteWishlistItem,
  getWishlist,
} from '../../redux/action/WishlistAction';
import {deleteProduct} from '../../redux/action/StoreAction';
import {Gap} from '..';

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
  sold
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
    navigation.navigate('ProductPage', {productData: rest, id, love: love || isFavourite});
  };
  return (
    <TouchableOpacity
      onPress={productDetail}
      style={styles.container}
      activeOpacity={0.7}>
      <Image source={image} style={styles.image} />
      {stock === 0 && (
        <View style={styles.stockLabel}>
          <Text style={styles.textStock('Poppins-SemiBold', 14, colors.white)}>
            Stok Habis
          </Text>
        </View>
      )}
      <View style={{marginHorizontal: 16}}>
        <View style={{marginBottom: 8}}>
          <Text style={styles.text.title}>{name}</Text>
        </View>
        <View style={styles.info}>
          <View style={{flex: 1}}>
            <Text style={styles.text.price}>Rp {price}</Text>
            <Text style={styles.text.weight}>{weight} kg</Text>
          </View>
          {store ? (
            <TouchableOpacity style={styles.loveWrapper} onPress={onNavigate}>
              <IcEdit fill={colors.grey} width={24} height={24} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.loveWrapper}
              onPress={() => sendToWishlist()}>
              {isFavourite ? <IcHeartSolid /> : <IcWishlistInactive />}
            </TouchableOpacity>
          )}
        </View>
        {store && (
          <>
            <Gap height={10} />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={styles.textStock('Poppins-SemiBold', 16, colors.black)}>
                Stok
              </Text>
              <Text
                style={styles.textStock('Poppins-SemiBold', 16, colors.black)}>
                {stock}
              </Text>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={styles.textStock('Poppins-SemiBold', 16, colors.black)}>
                Terjual
              </Text>
              <Text
                style={styles.textStock('Poppins-SemiBold', 16, colors.black)}>
                {sold}
              </Text>
            </View>
          </>
        )}
      </View>
      {store && (
        <TouchableOpacity
          activeOpacity={0.8}
          style={{position: 'absolute', top: -8, right: -8}}>
          <IcCloseSolid
            fill={'#FF605C'}
            height={32}
            width={32}
            onPress={delProduct}
          />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = {
  container: {
    backgroundColor: colors.lightgrey,
    minHeight: 296,
    maxHeight:360,
    paddingBottom: 20,
    width: 168,
    marginBottom: 16,
    borderRadius: 10,
  },
  image: {
    resizeMode: 'cover',
    height: 160,
    width: 168,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 8,
  },
  info: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    title: {
      fontSize: 20,
      fontFamily: 'Poppins-SemiBold',
      color: colors.black,
    },
    price: {
      fontSize: 16,
      color: colors.default,
      fontFamily: 'Poppins-SemiBold',
    },
    weight: {
      fontSize: 12,
      color: colors.grey,
      fontFamily: 'Poppins-SemiBold',
    },
  },
  loveWrapper: {
    width: 40,
    height: 40,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStock: (
    fontFamily = 'Poppins-Regular',
    fontSize = 16,
    color = colors.black,
  ) => ({
    fontFamily: fontFamily,
    fontSize: fontSize,
    color: color,
  }),
  stockLabel: {
    backgroundColor: 'rgba(33,33,33,0.6)',
    width: 90,
    height: 28,
    borderRadius: 5,
    position: 'absolute',
    top: 125,
    left: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default ProductCard;
