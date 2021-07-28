import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { colors } from '../../utils'
import { SearchBar } from '../../components';
import Content from './Content'
import Slider from './Slider'
import FilterProduct from './FilterProduct'
import Modal from 'react-native-modal'

const HomePage = ({navigation}) => {
    const [isModalVisible, setModalVisible] = useState(false);
    
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    return (
        <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
           <Modal 
                style={{margin: 0, justifyContent: 'flex-end'}} 
                isVisible={isModalVisible} 
                onBackdropPress={() => setModalVisible(false)}
                onSwipeComplete={() => setModalVisible(false)}
                swipeDirection="down"
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

export default HomePage;