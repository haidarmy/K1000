import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {ICTrashSolid} from '../../assets';
import {colors} from '../../utils';

const CartItem = ({item, price, image}) => {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <View style={styles.descContainer}>
        <Text style={{...styles.text, color: colors.black}}>{item}</Text>
        <Text style={{...styles.text, color: colors.default}}>{price}</Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.counterWrapper.plus}>
            <Text style={styles.counterText}>-</Text>
          </TouchableOpacity>
          <View style={styles.counterWrapper.value}>
            <Text style={styles.counterText}>1</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.counterWrapper.minus}>
            <Text style={styles.counterText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity activeOpacity={0.7}>
        <ICTrashSolid />
      </TouchableOpacity>
    </View>
  );
};

export default CartItem;

const styles = {
  container: {
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 16,
    backgroundColor: colors.lightgrey,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    height: 144,
  },
  descContainer: {
    marginLeft: 24,
    flex: 1,
    paddingLeft: 16,
    justifyContent: 'center',
  },
  image: {
    width: 76,
    height: 76,
    borderRadius: 14,
    resizeMode: 'cover',
  },
  text: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    marginBottom: 8,
  },
  counterWrapper: {
    plus: {
      width: 32,
      height: 32,
      backgroundColor: colors.white,
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    value: {
      width: 32,
      height: 32,
      backgroundColor: colors.lightgrey,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: colors.white,
    },
    minus: {
      width: 32,
      height: 32,
      backgroundColor: colors.white,
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  counterText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: colors.black,
  },
};
