import React, {useState, useEffect} from "react";
import {Image, ScrollView, useColorScheme, View} from "react-native";

import BaseView from "../BaseView";
import Routes from "../../navigation/Routes";
import {Divider, Text} from "react-native-elements";
import {Styles} from "./Styles";
import Globals from "../../utils/Globals";
import {AddressItem} from "../../components/Application/AddressItem/View";
import {CardItem} from "../../components/Application/CardItem/View";
import AppButton from "../../components/Application/AppButton/View";
import {useTheme} from "@react-navigation/native";
import {commonDarkStyles} from "../../../branding/boozemart/styles/dark/Style";
import {commonLightStyles} from "../../../branding/boozemart/styles/light/Style";
import ApiUrls from "../../utils/ApiUrls.js";
import Axios from 'axios';

export const CartSummary = (props) => {

const [cart, setCart] = useState([]);
const [subtotal, setSubtotal] = useState(0);
const [promotionalDiscounts, setPromotionalDiscounts] = useState(0);
const [deliveryCharges, setDeliveryCharges] = useState(0);
const [total, setTotal] = useState(0);

    useEffect(() => {
        Axios.get(ApiUrls.SERVICE_URL + "/cart/findAllPc").then((succResp) =>{
        console.log(succResp.data[0].product_image);
            setCart(succResp.data);
            let price = 0;
            for(let item in succResp.data){
            price += Number.parseInt(succResp.data[item].price);
//            console.log(item.price);

            }
            setSubtotal(price);
        },(errorresp) =>{
            console.log("From error")
            console.log(JSON.stringify(errorresp));
        })
    }, [])

    //Theme based styling and colors
    const scheme = useColorScheme();
    const {colors} = useTheme();
    const globalStyles = scheme === "dark" ? commonDarkStyles(colors) : commonLightStyles(colors);
    const screenStyles = Styles(scheme, globalStyles, colors);


    const renderCartItems = (item, index) => {
        return (
            <View
                key={index}
                style={[
                    screenStyles.cartItemContainer,
                    index !== cart.length - 1 && {
                        borderBottomWidth: 1,
                        borderBottomColor: colors.borderColorLight,
                    },
                    index === 0 && screenStyles.cartTopBorder,
                    index === cart.length - 1 && screenStyles.cartBottomBorder,
                    index === cart.length - 1 && screenStyles.cartBottomMargin,
                ]}>
                <Image
                    source={item.image}
                    style={screenStyles.cartItemLeftImage}
                />

                <View>

                    <Text style={screenStyles.cartItemNameText}>{item.title}</Text>
                    <Text style={screenStyles.cartItemWeightText}>{item.weight}</Text>
                </View>

                <Text style={screenStyles.cartItemPriceText}>${item.price}</Text>

            </View>
        );
    };

    return (

        <BaseView
            navigation={props.navigation}
            title={"Cart Summary"}
            childContainerStyle={screenStyles.baseViewChildContainerStyle}
            headerWithBack
            childView={() => {

                return (
                    <View style={screenStyles.container}>

                        <ScrollView
                            style={screenStyles.listContainer}
                        >
                            <View style={screenStyles.cardContainer}>
                                <CardItem
                                    isActive={false}
                                    item={Globals.paymentMethodItems.cardItems[2]}
                                    onPress={() => {
                                    }}/>
                            </View>


                            <AddressItem
                                isActive={false}
                                item={Globals.addressItems[1]}
                                onPress={() => {
                                }}
                            />

                            {
                                cart.map((item, index) => {
                                    return renderCartItems(item, index);
                                })
                            }


                        </ScrollView>

                        <View style={screenStyles.bottomContainer}>

                            <View style={screenStyles.bottomTotalContainer}>
                                <View style={screenStyles.receiptItemContainer}>
                                    <Text style={screenStyles.boldLabelText}>Subtotal (6) Items:</Text>
                                    <Text style={screenStyles.boldLabelValueText}>${subtotal}</Text>
                                </View>

                                <Divider style={screenStyles.receiptItemDivider}/>

                                <View style={screenStyles.receiptItemContainer}>
                                    <Text style={screenStyles.normalLabelText}>Promotional Discounts:</Text>
                                    <Text style={screenStyles.normalLabelValueText}>-${promotionalDiscounts}</Text>
                                </View>

                                <View style={screenStyles.receiptItemContainer}>
                                    <Text style={screenStyles.normalLabelText}>Delivery Charges:</Text>
                                    <Text style={screenStyles.normalLabelValueText}>${deliveryCharges}</Text>
                                </View>

                                <Divider style={screenStyles.receiptItemDivider}/>

                                <View style={[screenStyles.receiptItemContainer, {marginBottom: 0}]}>
                                    <Text style={screenStyles.boldLabelText}>Total</Text>
                                    <Text style={screenStyles.boldLabelValueText}>${subtotal-promotionalDiscounts+deliveryCharges}</Text>
                                </View>

                            </View>

                            <View style={screenStyles.bottomButtonContainer}>
                                <AppButton
                                    title={"Place Order"}
                                    onPress={() => {
//                                        props.navigation.navigate(Routes.STRIPE_CHECKOUT);
                                        props.navigation.navigate(Routes.ORDER_SUCCESS);
                                    }}
                                />
                            </View>

                        </View>


                    </View>
                );

            }}

        />

    );

};

