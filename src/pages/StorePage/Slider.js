import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../../utils';
import {Categories, CategoriesSkeleton} from '../../components';
import {connect} from 'react-redux';
import {s, vs, ms, mvs} from 'react-native-size-matters';

const Slider = ({getCategoryResult, getCategoryLoading}) => {
  const [sliderState, setSliderState] = useState('')
  const setBackgroundSliderToParent = childdata => {
    setSliderState(childdata);
    console.log("params terkirim", childdata)
  };
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{marginRight: ms(8)}}
      contentContainerStyle={styles.container}>
      {getCategoryResult ? (
        Object.keys(getCategoryResult).map(key => {
          return (
            <Categories
              type={"Store"}
              label={getCategoryResult[key].namecategory}
              key={key}
              id={key}
              sliderState={sliderState}
              setBackgroundSliderToParent={setBackgroundSliderToParent}
            />
          );
        })
      ) : getCategoryLoading ? (
        <CategoriesSkeleton/>
      ) : (
        <Text>Data Kosong</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // height: 35,
    paddingHorizontal: ms(2),
    paddingBottom: mvs(3),
    // backgroundColor: colors.red,
    marginBottom: mvs(2),
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

const mapStateToProps = state => ({
  getCategoryLoading: state.CategoryReducer.getCategoryLoading,
  getCategoryResult: state.CategoryReducer.getCategoryResult,
  getCategoryError: state.CategoryReducer.getCategoryError,
});

export default connect(mapStateToProps, null)(Slider);
