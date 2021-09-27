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
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import { useDispatch } from 'react-redux';
import { addToWishlist, deleteWishlistItem, getWishlist } from '../../redux/action/WishlistAction';

const ProductCard = ({image, name, price, weight, store, onNavigate, rest, love, id}) => {
  const dispatch = useDispatch()
  const navigation = useNavigation();
  const [isFavourite, setIsFavourite] = useState(false);
  const [form, setForm] = useForm({
    product: rest,
    images: image,
    amount: 1,
    uid: '',
  });
  
  useEffect(() => {
    if(love){
      setIsFavourite(love)
    }
    getData('user').then(res => {
      if (res) {
        setForm('uid', res.uid);
      }
    });
  }, []);


  const sendToWishlist = () => {
    if(isFavourite){
      setIsFavourite(toggle => !toggle)
      dispatch(deleteWishlistItem(form, id));
      dispatch(getWishlist(form.uid))
    }else {
      setIsFavourite(toggle => !toggle)
      dispatch(addToWishlist(form, id));
      dispatch(getWishlist(form.uid))
    }
  };
  return (
    <TouchableOpacity
      onPress={onNavigate}
      style={styles.container}
      activeOpacity={0.7}>
      <Image source={image} style={styles.image} />
      <View style={{marginHorizontal: 16}}>
        <View style={{height: 64, marginBottom: 8}}>
          <Text style={styles.text.title}>{name}</Text>
        </View>
        <View style={styles.info}>
          <View style={{flex: 1}}>
            <Text style={styles.text.price}>Rp {price}</Text>
            <Text style={styles.text.weight}>{weight} kg</Text>
          </View>
          {store ? (
            <TouchableOpacity
              style={styles.loveWrapper}
              onPress={() => navigation.navigate('AddProductPage')}>
              <IcEdit fill={colors.black} width={24} height={24} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.loveWrapper}
              onPress={() => sendToWishlist()}>
              {(isFavourite) ? <IcHeartSolid /> : <IcWishlistInactive />}
            </TouchableOpacity>
          )}
        </View>
      </View>
      {store && (
        <TouchableOpacity
          activeOpacity={0.8}
          style={{position: 'absolute', top: -8, right: -8}}>
          <IcCloseSolid fill={'#FF605C'} height={32} width={32} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = {
  container: {
    backgroundColor: colors.lightgrey,
    height: 296,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default ProductCard;
