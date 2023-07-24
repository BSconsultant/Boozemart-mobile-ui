import React, {useRef, useState, useEffect, useContext} from 'react';
import {FlatList, Image, Text, TouchableOpacity, useColorScheme, View, ScrollView} from "react-native";
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { CommonActions } from "@react-navigation/native";
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {FoodItem} from "../../../components/Application/FoodItem/View";
import {SearchButton} from "../../../components/Application/SearchButton/View";
import {Styles} from "./Styles";
import Routes from "../../../navigation/Routes";
import Globals from "../../../utils/Globals";
import ApiUrls from "../../../utils/ApiUrls";
import RBSheet from "react-native-raw-bottom-sheet";
import {FavouritesBottomSheet} from "../../../components/Application/FavouritesBottomSheet/View";
import {CategoryItem} from "../../../components/Application/CategoryItem/View";
import {useTheme} from "@react-navigation/native";
import {commonDarkStyles} from "../../../../branding/boozemart/styles/dark/Style";
import {commonLightStyles} from "../../../../branding/boozemart/styles/light/Style";
import {SvgIcon} from "../../../components/Application/SvgIcon/View";
import IconNames from "../../../../branding/boozemart/assets/IconNames";
import {FocusAwareStatusBar} from "../../../components/Application/FocusAwareStatusBar/FocusAwareStatusBar";
import {ReorderItem} from "../../../components/Application/ReorderItem/View";
import Axios from 'axios';
import Context from '../../../utils/context'
//Constants
const slider_data = [
    {
        img: require("./Assets/Images/slider_img_1.png")
    },
    {
        img: require("./Assets/Images/slider_img_1.png")
    }
];

export const Variant3Home = (props) => {

    //Theme based styling and colors
    const scheme = useColorScheme();
    const {colors} = useTheme();
    const globalStyles = scheme === "dark" ? commonDarkStyles(colors) : commonLightStyles(colors);
    const screenStyles = Styles(globalStyles, scheme, colors);

    //Internal States
//    const [activeSlideIndex, setActiveSlideIndex] = useState(0);
    const [categorySliderList, setCategorySliderList] = useState(Globals.categoryItems);
    const [categoryList, setCategoryList] = useState(Globals.categoryList);
    const [categoryFoodItemList, setCategoryFoodItemList] = useState(Globals.foodItems.slice(0, 4));

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

    const [readCategory, setreadCategory] = useState([]);
    useEffect(() => {
            Axios.get(ApiUrls.SERVICE_URL + "/readCategory").then((succResp) =>{
            console.log(succResp.data[0].image);
                setreadCategory(succResp.data);
            },(errorresp) =>{
                console.log("From error")
                console.log(JSON.stringify(errorresp));
            })
        }, [])

    const contextData = useContext(Context)
    //References
    const _carousel = useRef();
    let _favouriteSheet = useRef();

    const renderPromotionSlider = () => {

        return (
            <>
                <View style={{...screenStyles.promotionSliderContainer, marginVertical: hp("2%")}}>
                    <Carousel
                        ref={_carousel}
                        data={slider_data}
                        inactiveSlideScale={1}
                        renderItem={({item}) => {
                            return <Image
                                    source={item.img}
                                    style={{...screenStyles.promotionSliderContainer, width: "100%"}}
                                    resizeMode={"cover"}
                                />
                        }}
                        sliderWidth={hp("50%")}
                        itemWidth={hp("50%")}
                        loop
                    />

                </View>
            </>
        );

    }

        let offset = 0;
        let direction = "";
        const onScrollHandler = (e) => {
//        console.log(e.nativeEvent.contentOffset.y)
          const currentOffset = e.nativeEvent.contentOffset.y;
          const offsetDiff = (currentOffset - offset)
          offset = currentOffset;
          var currentDirection = "";
          if(offsetDiff > 0)
            currentDirection =  "down";
          else
            currentDirection = "up";
          if(direction !== currentDirection){
          direction = currentDirection;
            if (direction === "down") {
                  console.log("down")
                    contextData.setStateData({
                        common: {
                            isTabBarVisible: false
                        }
                      })
                  } else {
                  console.log("up")
                    contextData.setStateData({
                        common: {
                            isTabBarVisible: true
                        }
                    })
                  }
          }

        };

   return (

        <View style={[screenStyles.mainWrapper]}>

            <FocusAwareStatusBar translucent backgroundColor="transparent" barStyle="dark-content"/>

            <View style={screenStyles.mainContainer}>

                <SearchButton
                    onPress={() => props.navigation.navigate(Routes.SEARCH)}
                />

                <ScrollView showsVerticalScrollIndicator={false}
                    onScroll={onScrollHandler}
                    contentContainerStyle={screenStyles.contentContainerStyle}
                    contentInset = {{top: 0, left: 0, bottom: 0, right: 0}}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={products}
                        onScroll={onScrollHandler}
                        numColumns={2}
                        keyExtractor={(item, index) => {
                            return index+"asdasd";
                        }}
                        ListHeaderComponent={() => {
                            return (
                                <>
                                    <Text style={screenStyles.categoriesTitle}>What would you like to have?</Text>


                                    <FlatList
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        data={readCategory}
                                        keyExtractor={(item, index) => {
                                            return index+"gfhgfh";
                                        }}
                                        renderItem={({item}) =>
                                            <CategoryItem
                                                navigation={props.navigation}
                                                secondaryTitle={item.secondaryTitle}
                                                secondaryColor={item.secondaryColor}
                                                primaryTitle={item.title}
                                                primaryColor={item.primaryColor}
                                                iconBgColor={item.iconBgColor}
                                                iconURI={item.iconURI}
                                                bgURI={item.bgURI}
                                                img={item.image}
                                                id={item.cat_id}
                                            />
                                        }
                                    />

                                    {renderPromotionSlider()}

                                     <Text style={screenStyles.categoriesTitle}>Checkout Our Frequently Ordered Drinks</Text>

                                    <TouchableOpacity onPress={() => {
                                        props.navigation.navigate(Routes.POPULAR_DEALS);
                                    }}>
                                        <View style={screenStyles.sectionHeading}>
                                            <Text style={screenStyles.sectionHeadingText}>Popular Deals</Text>

                                            <SvgIcon type={IconNames.ArrowRight} width={20} height={20}
                                                     color={colors.subHeadingColor}/>


                                        </View>
                                    </TouchableOpacity>


                                </>
                            )
                        }}
                        renderItem={({item}) =>
                            <FoodItem
                                id={item.product_id}
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
                                    if (favourite) {
                                        _favouriteSheet.open()
                                    }
                                }}
                                navigation={props.navigation}
                            />
                        }
                    />

                    <TouchableOpacity onPress={() => {
                        props.navigation.navigate(Routes.POPULAR_DEALS, {title: "Deals you might like"});
                    }}>
                        <View style={screenStyles.sectionHeading}>
                            <Text style={screenStyles.sectionHeadingText}>View more</Text>
                            <SvgIcon type={IconNames.ArrowRight} width={20} height={20}
                                     color={colors.subHeadingColor}/>
                        </View>
                    </TouchableOpacity>

                    <View style={screenStyles.categoriesContainer}>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={products}
                            keyExtractor={(item, index) => {
                                return item.id;
                            }}
                            renderItem={({item}) =>
                                <View style={screenStyles.categoryItem}>
                                    <ReorderItem
                                        navigation={props.navigation}
                                        secondaryTitle={item.price}
                                        ratingValue={item.ratingValue}
                                        secondaryColor={item.secondaryColor}
                                        primaryTitle={item.product_name}
                                        primaryColor={item.primaryColor}
                                        iconBgColor={item.iconBgColor}
                                        iconURI={item.iconURI}
                                        bgURI={item.bgURI}
                                        img={item.product_image}
                                        item={item}
                                    />
                                </View>
                            }
                        />
                    </View>
                </ScrollView>

                <RBSheet
                    ref={ref => {
                        _favouriteSheet = ref;
                    }}
                    height={hp(42)}
                >

                    <FavouritesBottomSheet
                        onItemSelect={() => {
                            _favouriteSheet.close()
                        }}
                    />

                </RBSheet>

            </View>
        </View>

    );

}
