import React, {useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import {useState} from 'react/cjs/react.development';
import {
  getListProduct,
  getProductByCategory,
  getProductBySort,
} from '../../redux/action/ProductAction';
import {getStoreProduct, getStoreProductByCategory} from '../../redux/action/StoreAction';
import {colors} from '../../utils/';
import {s, vs, ms, mvs} from 'react-native-size-matters';

const Categories = ({
  label,
  id,
  setBackgroundSliderToParent,
  sliderState,
  onPress,
  type,
}) => {
  const dispatch = useDispatch();
  const onSelect = () => {
    if (type === 'Home') {
      if (sliderState === id) {
        dispatch(getListProduct());
        setBackgroundSliderToParent('');
      } else {
        dispatch(getProductByCategory(id));
        setBackgroundSliderToParent(id);
      }
    } else if (type === 'Store') {
      if (sliderState === id) {
        dispatch(getStoreProduct());
        setBackgroundSliderToParent('');
      } else {
        dispatch(getStoreProductByCategory(id));
        setBackgroundSliderToParent(id);
      }
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.wrapper(sliderState, id)}
        activeOpacity={0.7}
        onPress={onPress ? onPress : onSelect}>
        <Text style={styles.text(sliderState, id)}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: (sliderState, id) => ({
    borderRadius: ms(10),
    padding: mvs(4),
    paddingHorizontal: ms(12),
    // marginRight: 24,
    maxWidth: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: sliderState === id ? 'rgba(53, 104, 255,0.15)' : null,
  }),
  text: (sliderState, id) => ({
    color: sliderState === id ? colors.default : colors.grey,
    fontSize: ms(18),
    fontFamily: 'Poppins-SemiBold',
  }),
});

export default connect()(Categories);
