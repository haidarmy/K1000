import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  useWindowDimensions,
  Dimensions,
} from 'react-native';
import {colors, colorsDark, useForm} from '../../utils';
import {IcSwiper} from '../../assets';
import SubmitButton from '../SubmitButton';
import Categories from '../Categories';
import {useDispatch, useSelector} from 'react-redux';
import {
  getProductByRange,
  getProductBySort,
} from '../../redux/action/ProductAction';
import {
  getStoreProductByRange,
  getStoreProductBySort,
} from '../../redux/action/StoreAction';
import {s, vs, ms, mvs} from 'react-native-size-matters';

const FilterProduct = ({setModalOff, type}) => {
  const dispatch = useDispatch();
  const [sliderState, setSliderState] = useState('');
  const theme = useSelector(state => state.DarkModeReducer.isDarkMode);
  const styles = getStyles(theme);
  const setBackgroundSliderToParent = childdata => {
    setSliderState(childdata);
  };
  const [sort, setSort] = useState('');
  const [range, setRange] = useForm({
    minimum: '',
    maximum: '',
  });

  const onSubmit = () => {
    setModalOff(toggle => !toggle);
    if (range.minimum || range.maximum) {
      if (type === 'Home') {
        dispatch(getProductByRange(range.maximum, range.minimum));
      } else if (type === 'Store') {
        dispatch(getStoreProductByRange(range.maximum, range.minimum));
      }
    }
    if (sort) {
      if (type === 'Home') {
        dispatch(getProductBySort(sort));
      } else if (type === 'Store') {
        dispatch(getStoreProductBySort(sort));
      }
    }
  };
  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <View style={styles.container}>
        <View style={styles.swiper}>
          <IcSwiper width={ms(50)} height={mvs(6)}/>
        </View>
        <View style={{height: mvs(102), marginBottom: mvs(24)}}>
          <Text style={styles.text(mvs(16))}>Urutkan Berdasarkan</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.sort}>
            <Categories
              label="Terlaris"
              onPress={() => {
                setSort('Terlaris');
                setBackgroundSliderToParent(2);
              }}
              id={2}
              sliderState={sliderState}
              setBackgroundSliderToParent={setBackgroundSliderToParent}
            />
            <Categories
              label="Terbaru"
              onPress={() => {
                setSort('Terbaru');
                setBackgroundSliderToParent(1);
              }}
              id={1}
              sliderState={sliderState}
              setBackgroundSliderToParent={setBackgroundSliderToParent}
            />
            <Categories
              label="Termurah"
              onPress={() => {
                setSort('Termurah');
                setBackgroundSliderToParent(3);
              }}
              id={3}
              sliderState={sliderState}
              setBackgroundSliderToParent={setBackgroundSliderToParent}
            />
            <Categories
              label="Termahal"
              onPress={() => {
                setSort('Termahal');
                setBackgroundSliderToParent(4);
              }}
              id={4}
              sliderState={sliderState}
              setBackgroundSliderToParent={setBackgroundSliderToParent}
            />
          </ScrollView>
        </View>

        <View style={{height: mvs(108), marginBottom: mvs(50)}}>
          <Text style={styles.text(mvs(6))}>Rentang Harga</Text>
          <View style={styles.range.wrapper}>
            <TextInput
              style={styles.range.input}
              placeholder="Minimal"
              placeholderTextColor={colors.grey}
              textAlign="center"
              keyboardType={'numeric'}
              value={range.minimum}
              onChangeText={value => setRange('minimum', value)}
            />
            <Text style={{fontSize: ms(28), marginBottom: mvs(15), color: colors.grey}}>—</Text>
            <TextInput
              style={styles.range.input}
              placeholder="Maksimal"
              placeholderTextColor={colors.grey}
              textAlign="center"
              keyboardType={'numeric'}
              value={range.maximum}
              onChangeText={value => setRange('maximum', value)}
            />
          </View>
        </View>
        <SubmitButton label="Terapkan" onPress={onSubmit} />
      </View>
    </KeyboardAvoidingView>
  );
};

const getStyles = theme => ({
  container: {
    height: mvs(460),
    marginBottom: mvs(-50),
    backgroundColor: theme ? colorsDark.white : colors.white,
    paddingHorizontal: ms(20),
    paddingVertical: mvs(16),
    borderTopLeftRadius: ms(10),
    borderTopRightRadius: ms(10),
  },
  swiper: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: mvs(16),
  },
  sort: {
    height: mvs(35),
    marginBottom: mvs(24),
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  range: {
    wrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    input: {
      color: theme ? colorsDark.black : colors.black,
      width: ms(142),
      height: mvs(58),
      backgroundColor: theme ? colorsDark.lightgrey : colors.lightgrey,
      borderRadius: ms(10),
      marginTop: mvs(16),
      marginBottom: mvs(26),
      paddingVertical: mvs(16),
      paddingHorizontal: ms(24),
      fontSize: ms(18),
      fontFamily: 'Poppins-Regular',
    },
  },
  text: marginBottom => ({
    marginBottom: marginBottom,
    fontSize: ms(16),
    fontFamily: 'Poppins-Medium',
    color: theme ? colorsDark.black : colors.black
  }),
});

export default FilterProduct;
