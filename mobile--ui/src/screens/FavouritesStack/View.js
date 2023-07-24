import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Routes from '../../navigation/Routes';
import {ProductDetail} from '../ProductDetail/View';
import {PopularDeals} from '../PopularDeals/View';
import {Favourites} from '../Favourites/View';

const Stack = createStackNavigator();

export function FavouritesStack() {
    return (
        <Stack.Navigator
//            initialRouteName={Config.SELECTED_VARIANT}
            initialRouteName={Routes.FAVOURITE}
            headerMode={'none'}
            screenOptions={{
                ...(Platform.OS === 'android' && TransitionPresets.SlideFromRightIOS),
            }}>
            <Stack.Screen name={Routes.FAVOURITE} component={Favourites}/>
            <Stack.Screen name={Routes.PRODUCT_DETAIL} component={ProductDetail}/>
            <Stack.Screen name={Routes.POPULAR_DEALS} component={PopularDeals}/>

         </Stack.Navigator>
     )
 }