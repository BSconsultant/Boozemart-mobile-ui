import React, {useEffect, useState} from 'react';
import {Image, TouchableOpacity, TouchableWithoutFeedback, useColorScheme, View} from "react-native";

import {Text} from 'react-native-elements';
import Routes from "../../../navigation/Routes";
import {Styles} from "./Styles";
import {useTheme} from "@react-navigation/native";
import {SvgIcon} from "../SvgIcon/View";
import IconNames from "../../../../branding/boozemart/assets/IconNames";
import Axios from 'axios';
import ApiUrls from "../../../utils/ApiUrls";

export const FoodItem = (props) => {

    //Theme based styling and colors
    const {colors} = useTheme();
    const scheme = useColorScheme();
    const itemStyles = Styles(scheme, colors);

    //Internal states
    const [cartCount, setCartCount] = useState(props.cartCount);
    const [favourite, setFavourite] = useState(props.isFavourite ? props.isFavourite : false);

    useEffect(() => {
        props.favouriteChange(favourite)
    }, [favourite])

    useEffect(() => {
        props.cartCountChange(cartCount)
    }, [cartCount])

    const _favouriteChange = () => {

        setFavourite((favourite) => {
            return !favourite;
        })

    };

    const _cartCountChange = (behavior) => {
    let quantity = behavior === "add" ? cartCount+1 : cartCount-1
    Axios.post(ApiUrls.SERVICE_URL + "/cart", {
            "cart_id": 0,
            "product_id": id,
            "varient_id": 0,
            "user_id": 1,
            "qty": quantity
      })
      .then(function (response) {
        console.log(response);
      })
        if (behavior === "add") {

            setCartCount((cartCount) => {
                return cartCount + 1
            })

        } else if (behavior === "subtract" && !(cartCount === 0)) {
            setCartCount((cartCount) => {
                return cartCount - 1
            })
        }

    };

    const {
        id,
        title,
        image,
        price,
        weight,
        discount,
        navigation,
        ratingValue
    } = props;

    return (

        <View>
            <View style={itemStyles.container}>

                <View style={itemStyles.upperContainer}>
                    <View style={itemStyles.discountContainer}>
                        {discount && <View style={itemStyles.discountBanner}>
                            <Text style={itemStyles.discountText}>- {discount}</Text>
                        </View>}
                    </View>
                    <View style={itemStyles.favouriteContainer}>
                        <TouchableOpacity onPress={() => {
                            _favouriteChange()
                        }}>
                            <View>

                                <SvgIcon
                                    type={favourite ? IconNames.HeartFilled : IconNames.Heart} width={20} height={20}
                                    color={favourite ? colors.heartFilled : colors.heartEmpty}/>

                            </View>

                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableWithoutFeedback
                    onPress={() => {
                        navigation.navigate(
                            Routes.PRODUCT_DETAIL, {
                                item: props
                            }
                        );
                    }}>
                    <View style={[itemStyles.mainContainer]}>
                        {(typeof image) == "string"? <Image
                            source={
                            {uri:image}}
                            style={itemStyles.foodItemImage}
                        />:
                        <Image
                            source={image}
                            style={itemStyles.foodItemImage}
                        />
                        }
                        <View style={itemStyles.infoContainer}>
                            <View style={itemStyles.foodItemBox_rating}>
                            <SvgIcon type={IconNames.StarFull} width={15} height={15}
                                 color={"#ce890c"}/>
                            <Text>{ratingValue}</Text>
                            </View>
                            <Text style={itemStyles.titleText}>{title}</Text>
                            <View>
                                <Text style={itemStyles.weightText}>${price} - {weight}</Text>
                            </View>
                        </View>

                        <View style={itemStyles.bottomContainer}>
                            {cartCount === 0 ?

                                <TouchableOpacity
                                    onPress={() => _cartCountChange("add")}
                                    style={itemStyles.addToCartContainer}>

                                    <SvgIcon type={IconNames.BagShopping} width={20} height={20}
                                             color={colors.activeColor} style={itemStyles.addCartIcon}/>

                                    <Text style={itemStyles.addCartText}>{"Add to cart"}</Text>

                                </TouchableOpacity>
                                : <View style={itemStyles.cartUpdateContainer}>
                                    <TouchableOpacity
                                        style={[itemStyles.cartUpdateActionContainer, {borderRightWidth: 1}]}
                                        onPress={() => {
                                            _cartCountChange("subtract")
                                        }}>

                                        <SvgIcon type={IconNames.Minus} width={15} height={15}
                                                 color={colors.activeColor}/>

                                    </TouchableOpacity>

                                    <Text style={itemStyles.cartNumberText}>{cartCount}</Text>

                                    <TouchableOpacity
                                        style={[itemStyles.cartUpdateActionContainer, {borderLeftWidth: 1}]}
                                        onPress={() => {
                                            _cartCountChange("add")
                                        }}>

                                        <SvgIcon type={IconNames.Plus} width={15} height={15}
                                                 color={colors.activeColor}/>

                                    </TouchableOpacity>

                                </View>
                            }
                        </View>
                    </View>
                </TouchableWithoutFeedback>

            </View>
        </View>

    );


}
