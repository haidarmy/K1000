import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import { colors } from '../../utils'
import { SearchBar, FilterProduct } from '../../components';
import Content from './Content'
import Slider from './Slider'
import Modal from 'react-native-modal'

const StorePage = ({navigation}) => {
    const [isModalVisible, setModalVisible] = useState(false);
    
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
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
                deviceHeight={Dimensions.get('screen').height}
            >
            <FilterProduct/>
            </Modal>
            <View style={{flex:1, backgroundColor: colors.white, paddingTop: 9}}>
                <View style={{paddingHorizontal: 20}}>
                {/* Search */}
                <SearchBar onPress={toggleModal} Filter/>
                {/* Slider */}
                <Slider/>
                </View>
                {/* Content */}
                <Content onPress={() => navigation.navigate('ProductPage')}/>
            </View>
            {/* Navbar */}
        </View>
    )
}

const styles = StyleSheet.create ({
    container: {
        backgroundColor: colors.white,
        flex: 1,
    },
})

export default StorePage;