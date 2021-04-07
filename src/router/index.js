import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AddAddressPage, AddProductPage,AddressPage, CartPage, HomePage, LoginPage, ProductPage, ProfileEditPage, ProfilePage, SignUpPage, SplashScreen, StorePage, WelcomePage, WishlistPage} from '../pages'

const Stack = createStackNavigator();

const Router = () => {
    return (
        <Stack.Navigator>
            {/* <Stack.Screen name="SplashScreen" component={ SplashScreen } options={{headerShown: false}}/> */}
            <Stack.Screen name="WelcomePage" component={ WelcomePage } options={{headerShown: false}}/>
            <Stack.Screen name="AddAddressPage" component={ AddAddressPage } options={{headerShown: false}}/>
            <Stack.Screen name="AddProductPage" component={ AddProductPage } options={{headerShown: false}}/>
            <Stack.Screen name="AddressPage" component={ AddressPage } options={{headerShown: false}}/>
            <Stack.Screen name="CartPage" component={ CartPage } options={{headerShown: false}}/>
            <Stack.Screen name="HomePage" component={ HomePage } options={{headerShown: false}}/>
            <Stack.Screen name="LoginPage" component={ LoginPage } options={{headerShown: false}}/>
            <Stack.Screen name="ProductPage" component={ ProductPage } options={{headerShown: false}}/>
            <Stack.Screen name="ProfileEditPage" component={ ProfileEditPage } options={{headerShown: false}}/>
            <Stack.Screen name="ProfilePage" component={ ProfilePage } options={{headerShown: false}}/>
            <Stack.Screen name="SignUpPage" component={ SignUpPage } options={{headerShown: false}}/>
            <Stack.Screen name="StorePage" component={ StorePage } options={{headerShown: false}}/>
            <Stack.Screen name="WishlistPage" component={ WishlistPage } options={{headerShown: false}}/>

        </Stack.Navigator>
    )
}

export default Router;
