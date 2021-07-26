import React, {useState} from 'react';
import {colors} from '../../utils';
import {
  Home,
  Bag,
  IcWishlistInactive,
  User,
  Search,
  Filter,
  Swiper,
  IcHeartSolid,
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

const ProductCard = ({image, name, price, weight}) => {
  const navigation = useNavigation();
  const [isFavourite, setIsFavourite] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductPage')}
      style={styles.container}
      activeOpacity={0.7}>
      <Image source={image} style={styles.image} />
      <View style={{marginHorizontal: 16}}>
        <View style={{height: 64, marginBottom: 8}}>
          <Text style={styles.text.title}>{name}</Text>
        </View>
        <View style={styles.info}>
          <View style={{flex: 1}}>
            <Text style={styles.text.price}>{price}</Text>
            <Text style={styles.text.weight}>{weight}</Text>
          </View>
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              setIsFavourite(toggle => !toggle);
            }}>
            {isFavourite ? <IcHeartSolid /> : <IcWishlistInactive />}
          </TouchableOpacity>
        </View>
      </View>
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
};

export default ProductCard;
