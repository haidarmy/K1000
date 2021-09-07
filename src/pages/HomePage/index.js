import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import {colors} from '../../utils';
import {SearchBar, FilterProduct} from '../../components';
import Content from './Content';
import Slider from './Slider';
import Modal from 'react-native-modal';
import {connect, useDispatch} from 'react-redux';
import {getCategory} from '../../redux/action/CategoryAction';
import {getListProduct} from '../../redux/action/ProductAction';

const HomePage = ({navigation, idCategory, keyword, idSort, rangeMaximum, rangeMinimum}) => {
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const setModalOff = (childdata) => {
    setModalVisible(childdata)
  }

  useEffect(() => {
    dispatch(getCategory());
  }, []);

  useEffect(() => {
    console.log("range", rangeMaximum + ' ' + rangeMinimum);
    dispatch(getListProduct(idCategory, keyword, idSort, rangeMaximum, rangeMinimum));
  }, [idCategory, keyword, idSort, rangeMinimum, rangeMaximum]);

  return (
    <View style={styles.container}>
      <Modal
        statusBarTranslucent
        style={{margin: 0, justifyContent: 'flex-end'}}
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onSwipeComplete={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        swipeDirection="down"
        deviceHeight={Dimensions.get('screen').height}>
        <FilterProduct setModalOff={setModalOff}/>
      </Modal>
      <View style={{flex: 1, backgroundColor: colors.white, paddingTop: 9}}>
        <View style={{paddingHorizontal: 20}}>
          {/* Search */}
          <SearchBar onPress={toggleModal} Filter />
          {/* Slider */}
          <Slider />
        </View>
        {/* Content */}
        <Content />
      </View>
      {/* Navbar */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
});

const mapStateToProps = state => ({
  idCategory: state.ProductReducer.idCategory,
  keyword: state.ProductReducer.keyword,
  idSort: state.ProductReducer.idSort,
  rangeMaximum: state.ProductReducer.rangeMaximum,
  rangeMinimum: state.ProductReducer.rangeMinimum
});

export default connect(mapStateToProps, null)(HomePage);
