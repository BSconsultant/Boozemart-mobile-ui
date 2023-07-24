import React, {useState, useEffect} from 'react';
import {FlatList, useColorScheme, View} from "react-native";

import BaseView from "../BaseView"
import Routes from "../../navigation/Routes";
import {CartItem} from "../../components/Application/CartItem/View";
import {Divider, Text} from "react-native-elements";
import {Styles} from "./Styles";
import Globals from "../../utils/Globals";
import ApiUrls from "../../utils/ApiUrls.js";
import AppButton from "../../components/Application/AppButton/View";
import {useTheme} from "@react-navigation/native";
import {commonDarkStyles} from "../../../branding/boozemart/styles/dark/Style";
import {commonLightStyles} from "../../../branding/boozemart/styles/light/Style";
import Config from "../../../branding/boozemart/configuration/Config";
import Axios from 'axios';

export const CartList = (props) => {


const [cart, setCart] = useState([]);
const [subtotal, setSubtotal] = useState(0);
const [shipping, setShipping] = useState(0);
const [total, setTotal] = useState(0);

    useEffect(() => {
        Axios.get(ApiUrls.SERVICE_URL + "/cart/findAllPc").then((succResp) =>{
        console.log(succResp.data[0].product_image);
            setCart(succResp.data);
            let price = 0;
                        for(let item in succResp.data){
                        price += Number.parseInt(succResp.data[item].price);
                        }
                        setSubtotal(price);
        },(errorresp) =>{
            console.log("From error")
            console.log(JSON.stringify(errorresp));
        })
    }, [])



    //Theme based styling and colors
    const {colors} = useTheme();
    const scheme = useColorScheme();
    const globalStyles = scheme === "dark" ? commonDarkStyles(colors) : commonLightStyles(colors);
    const screenStyles = Styles(globalStyles, colors);

    return (

        <View style={screenStyles.mainContainer}>

            <View style={[screenStyles.flatListContainer]}>
                <BaseView
                    showAppHeader={true}
                    title={"Shopping Cart"}
                    headerWithBack={false}
                    applyBottomSafeArea={false}
                    navigation={props.navigation}
                    childView={() => {

                        return (

                            <FlatList
                                data={cart}
                                keyExtractor={(item, index) => {
                                    return item.id;
                                }}
                                renderItem={({item, index}) =>
                                    index === 0 ? <View style={screenStyles.flatListFirstItemContainer}>
                                        <CartItem
                                            productid={item.product_id}
                                            title={item.product_name}
                                            image={item.product_image}
                                            bigImage={item.product_image}
                                            price={item.price}
                                            weight={item.weight}
                                            discount={item.discount}
                                            cartCount={item.c1.qty}
                                            cartCountChange={(count) => {
                                            }}
                                            navigation={props.navigation}
                                        />
                                    </View> : index === cart.length - 1 ?
                                        <View style={screenStyles.flatListLastItemContainer}>
                                            <CartItem
                                                cartid={item.cart_id}
                                                title={item.product_name}
                                                image={item.product_image}
                                                bigImage={item.product_image}
                                                price={item.price}
                                                weight={item.weight}
                                                discount={item.discount}
                                                cartCount={item.c1.qty}
                                                cartCountChange={(count) => {
                                                }}
                                                navigation={props.navigation}
                                            />
                                        </View> :
                                        <CartItem
                                            cartid={item.cart_id}
                                            title={item.product_name}
                                            image={item.product_image}
                                            bigImage={item.product_image}
                                            price={item.price}
                                            weight={item.weight}
                                            discount={item.discount}
                                            cartCount={item.c1.qty}
                                            cartCountChange={(count) => {
                                            }}
                                            navigation={props.navigation}
                                        />
                                }
                            />

                        );

                    }}

                />
            </View>

            <View
                style={[screenStyles.bottomContainerParent, Config.SELECTED_VARIANT === Routes.INTRO_SCREEN1 && screenStyles.bottomContainerParentVariant1]}>
                <View style={screenStyles.bottomContainer}>

                    <View style={screenStyles.totalContainer}>
                        <Text style={screenStyles.subtotalLabelText}>Subtotal</Text>
                        <Text style={screenStyles.subtotalValueText}>${subtotal}</Text>
                    </View>

                    <View style={screenStyles.totalContainer}>
                        <Text style={screenStyles.subtotalLabelText}>Shipping</Text>
                        <Text style={screenStyles.subtotalValueText}>${shipping}</Text>
                    </View>

                    <Divider style={screenStyles.horizontalDivider}/>

                    <View style={screenStyles.totalContainer}>
                        <Text style={screenStyles.totalLabelText}>Total</Text>
                        <Text style={screenStyles.totalValueText}>${subtotal+shipping}</Text>
                    </View>

                    <AppButton
                        title={'Checkout'}
                        onPress={() => {
                            props.navigation.navigate(Routes.CHECKOUT_DELIVERY)
                        }}
                    />

                </View>
            </View>
        </View>

    )

}
