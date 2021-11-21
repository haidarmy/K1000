import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../../utils';
import {Categories} from '../../components';
import {connect} from 'react-redux';

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
      contentContainerStyle={styles.container}>
      {getCategoryResult ? (
        Object.keys(getCategoryResult).map(key => {
          console.log('KEY', key);
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
        <View>
          <Text>Loading</Text>
        </View>
      ) : (
        <Text>Data Kosong</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 35,
    marginBottom: 24,
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
