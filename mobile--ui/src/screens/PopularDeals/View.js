import React, {useState, useEffect} from 'react';
import {FlatList, View} from "react-native";

import {FoodItem} from "../../components/Application/FoodItem/View";
import BaseView from "../BaseView";
import Globals from "../../utils/Globals";
import ApiUrls from "../../utils/ApiUrls";
import style from "./Style";
import Axios from 'axios';

export const PopularDeals = (props) => {

const [products, setProducts] = useState([]);

    useEffect(() => {
        Axios.get(ApiUrls.SERVICE_URL + "/products").then((succResp) =>{
        console.log(succResp.data[0].product_image);
            setProducts(succResp.data);
        },(errorresp) =>{
            console.log("From error")
            console.log(JSON.stringify(errorresp));
        })
    }, [])
    return (

        <BaseView
            navigation={props.navigation}
            title={(props.route.params && props.route.params.title)? props.route.params.title : "Popular Deals"}
            headerWithBack
            applyBottomSafeArea
            childView={() => {
                return (
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={products}
                        numColumns={2}
                        renderItem={({item, index}) => {

                            if (index === 0 || index === 1) {
                                return <View style={style.foodFirstItem}>

                                    <FoodItem
                                        title={item.product_name}
                                        image={item.product_image}
                                        bigImage={item.product_image}
                                        price={item.price}
                                        weight={item.weight}
                                        discount={item.discount}
                                        cartCount={item.cartCount}
                                        isFavourite={item.isFavourite}
                                        detail={"details"}
                                        ratingValue={item.ratingValue}
                                        cartCountChange={(count) => {
                                        }}
                                        favouriteChange={(favourite) => {
                                        }}
                                        navigation={props.navigation}
                                    />

                                </View>
                            } else if (index === products.length - 1) {
                                return <View style={style.foodLastItem}>

                                    <FoodItem
                                        title={item.product_name}
                                        image={item.product_image}
                                        bigImage={item.product_image}
                                        price={item.price}
                                        weight={item.weight}
                                        discount={item.discount}
                                        cartCount={item.cartCount}
                                        isFavourite={item.isFavourite}
                                        detail={"details"}
                                        ratingValue={item.ratingValue}
                                        cartCountChange={(count) => {
                                        }}
                                        favouriteChange={(favourite) => {
                                        }}
                                        navigation={props.navigation}
                                    />

                                </View>
                            } else {
                                return <FoodItem
                                    title={item.product_name}
                                    image={item.product_image}
                                    bigImage={item.product_image}
                                    price={item.price}
                                    weight={item.weight}
                                    discount={item.discount}
                                    cartCount={item.cartCount}
                                    isFavourite={item.isFavourite}
                                    detail={"details"}
                                    ratingValue={item.ratingValue}
                                    cartCountChange={(count) => {
                                    }}
                                    favouriteChange={(favourite) => {
                                    }}
                                    navigation={props.navigation}
                                />
                            }


                        }}
                    />
                );
            }}
        />


    );
}
