import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AddAddressPage, AddProductPage,AddressPage, CartPage, HomePage, LoginPage, ProductPage, ProfileEditPage, ProfilePage, SignUpPage, SplashScreen, StorePage, WelcomePage, WishlistPage} from '../pages'

const Stack = createStackNavigator();

const Router = () => {
    return (
        <Stack.Navigator>
            {/* <Stack.Screen name="SplashScreen" component={ SplashScreen } options={{headerShown: false}}/> */}
            <Stack.Screen name="WelcomePage" component={ WelcomePage }options={{headerShown: false}}/>
            <Stack.Screen name="AddAddressPage" component={ AddAddressPage }/>
            <Stack.Screen name="AddProductPage" component={ AddProductPage }/>
            <Stack.Screen name="AddressPage" component={ AddressPage }/>
            <Stack.Screen name="CartPage" component={ CartPage }/>
            <Stack.Screen name="Homepgae" component={ HomePage }/>
            <Stack.Screen name="LoginPage" component={ LoginPage }/>
            <Stack.Screen name="ProductPage" component={ ProductPage }/>
            <Stack.Screen name="ProfileEditPage" component={ ProfileEditPage }/>
            <Stack.Screen name="ProfilePage" component={ ProfilePage }/>
            <Stack.Screen name="SignUpPage" component={ SignUpPage }/>
            <Stack.Screen name="StorePage" component={ StorePage }/>
            <Stack.Screen name="WishlistPage" component={ WishlistPage }/>

        </Stack.Navigator>
    )
}

export default Router;
