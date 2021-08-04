import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { colors } from '../../utils'
import { SearchBar, FilterProduct, Header } from '../../components';
import Content from './Content'
import Slider from './Slider'
import Modal from 'react-native-modal'
import { IcFloatButton } from '../../assets';

const HomePage = ({navigation}) => {
    const [isModalVisible, setModalVisible] = useState(false);
    
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    return (
        <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
        <Header label="Toko Saya" onPress={() => navigation.navigate('ProfilePage')}/>
           <Modal 
                statusBarTranslucent
                style={{margin: 0, justifyContent: 'flex-end'}} 
                isVisible={isModalVisible} 
                onBackdropPress={() => setModalVisible(false)}
                onSwipeComplete={() => setModalVisible(false)}
                onBackButtonPress={() => setModalVisible(false)}
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
                <TouchableOpacity activeOpacity={0.9} style={{position: 'absolute', bottom: 50, left: 36}} onPress={() => navigation.navigate('AddProductPage')}>
                    <IcFloatButton fill={colors.default}/>
                </TouchableOpacity>
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