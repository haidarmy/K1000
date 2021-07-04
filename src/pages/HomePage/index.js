import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity} from 'react-native';
import { colors } from '../../utils'
import { Home, Bag, Heart, User, Search, Filter, Swiper} from '../../assets'
import { SubmitButton, BottomNavigation } from '../../components';
import Modal from 'react-native-modal'

const HomePage = ({navigation}) => {
    const [isModalVisible, setModalVisible] = useState(false);
    
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    return (
        <View style={styles.container}>
           <Modal 
            style={{margin: 0, justifyContent: 'flex-end'}} 
            isVisible={isModalVisible} 
            onBackdropPress={() => setModalVisible(false)}
            onSwipeComplete={() => setModalVisible(false)}
            swipeDirection="down"
            >

            <View style={{height: 420, backgroundColor: colors.white, paddingHorizontal: 20, paddingVertical: 16, borderTopLeftRadius: 10, borderTopRightRadius: 10}}>
            <View style={{alignItems: 'center', justifyContent: 'flex-start', marginBottom: 16}}>   
            <Swiper width={50} height={6}/>
            </View>
            <View style={{height: 102, marginBottom: 24}}>
                <Text style={{marginBottom: 16, fontSize: 16}}>Urutkan Berdasarkan</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{height:35, marginBottom: 24, flexDirection: 'row', justifyContent:'space-around'}}>
            <TouchableOpacity style={{borderRadius: 10,padding: 4, marginRight: 24, height: 35, maxWidth:83, alignItems: 'center', justifyContent:'center'}}>
                <Text style={{color: colors.grey, fontSize: 18}}>Terbaru</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{borderRadius: 10,padding: 4, marginRight: 24, height: 35, maxWidth:83, alignItems: 'center', justifyContent:'center'}}>
                <Text style={{color: colors.grey, fontSize: 18}}>Harga Tertinggi</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{borderRadius: 10,padding: 4, marginRight: 24, height: 35, maxWidth:83, alignItems: 'center', justifyContent:'center'}}>
                <Text style={{color: colors.grey, fontSize: 18}}>Harga Terendah</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{borderRadius: 10,padding: 4, marginRight: 24, height: 35, maxWidth:83, alignItems: 'center', justifyContent:'center'}}>
                <Text style={{color: colors.grey, fontSize: 18}}>Udang</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{borderRadius: 10,padding: 4, marginRight: 24, height: 35, maxWidth:83, alignItems: 'center', justifyContent:'center'}}>
                <Text style={{color: colors.grey, fontSize: 18}}>Tuna</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{borderRadius: 10,padding: 4, marginRight: 24, height: 35, maxWidth:83, alignItems: 'center', justifyContent:'center'}}>
                <Text style={{color: colors.grey, fontSize: 18}}>Pari</Text>
            </TouchableOpacity>
            </ScrollView>
            </View>
            
            <View style={{height: 108, marginBottom: 50}}>
                <Text style={{marginBottom: 6, fontSize: 16}}>Rentang Harga</Text>
                <View style={{flexDirection: 'row', justifyContent:'space-between', alignItems: 'center'}}>
                    <TextInput style={{
                        width: 142, 
                        height: 58, 
                        backgroundColor: colors.lightgrey,
                        borderRadius: 10,
                        marginTop: 16,
                        marginBottom: 26,
                        paddingVertical: 16,
                        paddingHorizontal: 24,
                        fontSize: 18,
                        color: colors.black
                    }}
                        placeholder='Minimal'
                        placeholderTextColor={colors.grey}
                        textAlign='center'
                        keyboardType={'numeric'}   
                    />
                    <Text style={{fontSize: 32, marginBottom: 15}}>—</Text>
                    <TextInput style={{
                        width: 142, 
                        height: 58, 
                        backgroundColor: colors.lightgrey,
                        borderRadius: 10,
                        marginTop: 16,
                        marginBottom: 26,
                        paddingVertical: 16,
                        paddingHorizontal: 24,
                        fontSize: 18,
                        color: colors.black
                    }}
                        placeholder='Maksimal'
                        placeholderTextColor={colors.grey}
                        textAlign='center'
                        keyboardType={'numeric'}
                        
                    />
                </View>
            </View>
            <SubmitButton label="Terapkan"/>
            </View>
            </Modal>
            <View style={{flex:1, backgroundColor:colors.white, paddingTop: 9}}>
            <View style={{paddingHorizontal: 20}}>
            <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center', backgroundColor:colors.white, height:58, marginBottom: 24}}>
                <View style={{flex:1, position: 'relative',backgroundColor: colors.lightgrey, marginRight: 16, borderRadius: 10}}>
                    <TextInput style={{ paddingHorizontal: 54, fontSize: 18, color: colors.grey, alignItems: 'center', height: 58}}>
                    </TextInput>
                    <Search width={24} height={24} style={{position: 'absolute', top: 16, left: 24}}/>
                </View>
                <TouchableOpacity onPress={toggleModal} style={{alignItems:'center', justifyContent: 'center', width: 56, height: 56, backgroundColor: colors.default, borderRadius: 10}}>
                    <Filter width={24} height={24}/>
                </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{height:35, marginBottom: 24, flexDirection: 'row', justifyContent:'space-around'}}>
                <TouchableOpacity style={{borderRadius: 10,padding: 4, marginRight: 24, height: 35, maxWidth:83, alignItems: 'center', justifyContent:'center'}}>
                    <Text style={{color: colors.grey, fontSize: 18}}>Kerapu</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{borderRadius: 10,padding: 4, marginRight: 24, height: 35, maxWidth:83, alignItems: 'center', justifyContent:'center'}}>
                    <Text style={{color: colors.grey, fontSize: 18}}>Kakap</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{borderRadius: 10,padding: 4, marginRight: 24, height: 35, maxWidth:83, alignItems: 'center', justifyContent:'center'}}>
                    <Text style={{color: colors.grey, fontSize: 18}}>Lobster</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{borderRadius: 10,padding: 4, marginRight: 24, height: 35, maxWidth:83, alignItems: 'center', justifyContent:'center'}}>
                    <Text style={{color: colors.grey, fontSize: 18}}>Udang</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{borderRadius: 10,padding: 4, marginRight: 24, height: 35, maxWidth:83, alignItems: 'center', justifyContent:'center'}}>
                    <Text style={{color: colors.grey, fontSize: 18}}>Tuna</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{borderRadius: 10,padding: 4, marginRight: 24, height: 35, maxWidth:83, alignItems: 'center', justifyContent:'center'}}>
                    <Text style={{color: colors.grey, fontSize: 18}}>Pari</Text>
                </TouchableOpacity>
            </ScrollView>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{height:698, backgroundColor: colors.white, flexDirection: 'row', flexWrap: 'wrap', justifyContent:'space-around' }}>
                <TouchableOpacity onPress={() => navigation.navigate('ProductPage') } style={{backgroundColor: colors.lightgrey, height:296, width:160, borderRadius: 14, marginBottom: 16}}>
                    <View style={{backgroundColor: 'green', height: 160, width: 160, borderTopLeftRadius: 14, borderTopRightRadius: 14, marginBottom: 8}}></View>
                    <View style={{marginHorizontal: 16}}>
                        <View style={{height: 64, marginBottom: 8}}>
                            <Text style={{fontSize: 20, fontWeight: 'bold', color: colors.black}}>Kerapu Cantang</Text>
                        </View>
                        <View style={{flexDirection: 'row', height: 40, alignItems: 'center'}}>
                           <View style={{flex: 1}}>
                               <Text style={{fontSize: 16, color: colors.default}}>RP40,000</Text>
                               <Text style={{fontSize: 10, color: colors.grey, fontWeight:'bold'}}>1000 g</Text>
                           </View>
                           <TouchableOpacity>
                           <Heart style={{width: 40, marginRight: 12}}/>
                           </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('ProductPage')} style={{backgroundColor: colors.lightgrey, height:296, width:160, borderRadius: 14, marginBottom: 16}}>
                    <View style={{backgroundColor: 'green', height: 160, width: 160, borderTopLeftRadius: 14, borderTopRightRadius: 14, marginBottom: 8}}></View>
                    <View style={{marginHorizontal: 16}}>
                        <View style={{height: 64, marginBottom: 8}}>
                            <Text style={{fontSize: 20, fontWeight: 'bold', color: colors.black}}>Kerapu Cantang</Text>
                        </View>
                        <View style={{flexDirection: 'row', height: 40, alignItems: 'center'}}>
                           <View style={{flex: 1}}>
                               <Text style={{fontSize: 16, color: colors.default}}>RP40,000</Text>
                               <Text style={{fontSize: 10, color: colors.grey, fontWeight:'bold'}}>1000 g</Text>
                           </View>
                           <TouchableOpacity>
                           <Heart style={{width: 40, marginRight: 12}}/>
                           </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('ProductPage')} style={{backgroundColor: colors.lightgrey, height:296, width:160, borderRadius: 14, marginBottom: 16}}>
                    <View style={{backgroundColor: 'green', height: 160, width: 160, borderTopLeftRadius: 14, borderTopRightRadius: 14, marginBottom: 8}}></View>
                    <View style={{marginHorizontal: 16}}>
                        <View style={{height: 64, marginBottom: 8}}>
                            <Text style={{fontSize: 20, fontWeight: 'bold', color: colors.black}}>Kerapu Cantang</Text>
                        </View>
                        <View style={{flexDirection: 'row', height: 40, alignItems: 'center'}}>
                           <View style={{flex: 1}}>
                               <Text style={{fontSize: 16, color: colors.default}}>RP40,000</Text>
                               <Text style={{fontSize: 10, color: colors.grey, fontWeight:'bold'}}>1000 g</Text>
                           </View>
                           <TouchableOpacity>
                           <Heart style={{width: 40, marginRight: 12}}/>
                           </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('ProductPage')} style={{backgroundColor: colors.lightgrey, height:296, width:160, borderRadius: 14, marginBottom: 16}}>
                    <View style={{backgroundColor: 'green', height: 160, width: 160, borderTopLeftRadius: 14, borderTopRightRadius: 14, marginBottom: 8}}></View>
                    <View style={{marginHorizontal: 16}}>
                        <View style={{height: 64, marginBottom: 8}}>
                            <Text style={{fontSize: 20, fontWeight: 'bold', color: colors.black}}>Kerapu Cantang</Text>
                        </View>
                        <View style={{flexDirection: 'row', height: 40, alignItems: 'center'}}>
                           <View style={{flex: 1}}>
                               <Text style={{fontSize: 16, color: colors.default}}>RP40,000</Text>
                               <Text style={{fontSize: 10, color: colors.grey, fontWeight:'bold'}}>1000 g</Text>
                           </View>
                           <TouchableOpacity>
                           <Heart style={{width: 40, marginRight: 12}}/>
                           </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </View>
            <BottomNavigation/>
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