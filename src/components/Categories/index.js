import React, {useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import {useState} from 'react/cjs/react.development';
import {
  getProductByCategory,
  getProductBySort,
} from '../../redux/action/ProductAction';
import {colors} from '../../utils/';

const Categories = ({
  label,
  id,
  setBackgroundSliderToParent,
  sliderState,
  onPress,
}) => {
  const dispatch = useDispatch();
  const onSelect = () => {
    dispatch(getProductByCategory(id));

    // setIsBackground(toggle => !toggle)
    // setBackgroundSliderToParent(toggle => !toggle)
  };

  const [isBackground, setIsBackground] = useState(false);
  return (
    <View>
      <TouchableOpacity
        style={styles.wrapper(isBackground, sliderState)}
        activeOpacity={0.7}
        onPress={onPress ? onPress : onSelect}>
        <Text style={styles.text(isBackground, sliderState)}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: (isBackground, sliderState) => ({
    borderRadius: 12,
    padding: 5,
    paddingHorizontal: 6,
    marginRight: 24,
    maxWidth: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: isBackground
      ? isBackground && sliderState
        ? 'rgba(53, 104, 255,0.15)'
        : null
      : null,
  }),
  text: (isBackground, sliderState) => ({
    color: isBackground && sliderState ? colors.default : colors.grey,
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  }),
});

export default connect()(Categories);
