import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {colors, useForm} from '../../utils';
import {IcSwiper} from '../../assets';
import SubmitButton from '../SubmitButton';
import Categories from '../Categories';
import {useDispatch} from 'react-redux';
import {
  getProductByRange,
  getProductBySort,
} from '../../redux/action/ProductAction';
import { getStoreProductByRange, getStoreProductBySort } from '../../redux/action/StoreAction';

const FilterProduct = ({setModalOff, type}) => {
  const dispatch = useDispatch();
  const [sliderState, setSliderState] = useState('');
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
     if(type === 'Home'){
      dispatch(getProductByRange(range.maximum, range.minimum));
     }else if(type === 'Store'){
      dispatch(getStoreProductByRange(range.maximum, range.minimum));
     }
    }
    if (sort) {
      if(type === 'Home'){
        dispatch(getProductBySort(sort));
      }else if(type === 'Store'){
        dispatch(getStoreProductBySort(sort))
      }
    }
  };
  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <View style={styles.container}>
        <View style={styles.swiper}>
          <IcSwiper width={50} height={6} />
        </View>
        <View style={{height: 102, marginBottom: 24}}>
          <Text
            style={{
              marginBottom: 16,
              fontSize: 16,
              fontFamily: 'Poppins-Medium',
            }}>
            Urutkan Berdasarkan
          </Text>
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

        <View style={{height: 108, marginBottom: 50}}>
          <Text
            style={{
              marginBottom: 6,
              fontSize: 16,
              fontFamily: 'Poppins-Medium',
            }}>
            Rentang Harga
          </Text>
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
            <Text style={{fontSize: 32, marginBottom: 15}}>—</Text>
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

const styles = {
  container: {
    height: 470,
    marginBottom: -50,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  swiper: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 16,
  },
  sort: {
    height: 35,
    marginBottom: 24,
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
      width: 142,
      height: 58,
      backgroundColor: colors.lightgrey,
      borderRadius: 10,
      marginTop: 16,
      marginBottom: 26,
      paddingVertical: 16,
      paddingHorizontal: 24,
      fontSize: 18,
      fontFamily: 'Poppins-Regular',
    },
  },
};

export default FilterProduct;
