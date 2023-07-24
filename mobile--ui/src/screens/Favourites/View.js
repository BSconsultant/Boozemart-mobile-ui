import React, {useRef, useState, useEffect} from "react";
import {Image, ScrollView, useColorScheme, View, FlatList, TouchableOpacity} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {Styles} from "./Styles";
import Globals from "../../utils/Globals";
import ApiUrls from "../../utils/ApiUrls";
import {Text} from "react-native-elements";
import BaseView from "../BaseView";
import Accordion from "react-native-collapsible/Accordion";
import {FavouritesBottomSheet} from "../../components/Application/FavouritesBottomSheet/View";
import RBSheet from "react-native-raw-bottom-sheet";
import {FavouriteItem} from "../../components/Application/FavouriteItem/View";
import AppButton from "../../components/Application/AppButton/View";
import Routes from "../../navigation/Routes";
import {useTheme} from "@react-navigation/native";
import IconNames from "../../../branding/boozemart/assets/IconNames";
import {ReorderItem} from "../../components/Application/ReorderItem/View";
import {SvgIcon} from "../../components/Application/SvgIcon/View";
import {commonDarkStyles} from "../../../branding/boozemart/styles/dark/Style";
import {commonLightStyles} from "../../../branding/boozemart/styles/light/Style";
import Axios from 'axios';

export const Favourites = (props) => {

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

    //Theme based styling and colors
    const scheme = useColorScheme();
    const {colors} = useTheme();
    const globalStyles = scheme === "dark" ? commonDarkStyles(colors) : commonLightStyles(colors);
    const screenStyles = Styles(globalStyles, scheme, colors);

    //Constants
    const favouriteSheetHeight = hp(42);

    //Internal states
    const [favouritesList, setFavouritesList] = useState(Globals.favouriteItems);
    const [activeSections, setActiveSections] = useState([]);

    //References
    let sheetRef = useRef();

    const renderFavouritesHeader = (section, index, isActive) => {

        if (index === 0) {
            return <View style={screenStyles.favouriteFirstItemContainer}>
                <FavouriteItem
                    isActive={isActive}
                    item={section}
                    onDeletePress={() => {
                        setFavouritesList((favouritesList) => {

                            favouritesList.splice(index, 1);

                            return [...favouritesList];

                        });
                    }}
                />
            </View>;
        } else if (index === Globals.favouriteItems.length - 1 && !isActive) {
            return <View style={screenStyles.favouriteLastItemContainer}>
                <FavouriteItem
                    isActive={isActive}
                    item={section}
                    onDeletePress={() => {
                        setFavouritesList((favouritesList) => {

                            favouritesList.splice(index, 1);

                            return [...favouritesList];

                        });
                    }}
                />
            </View>;
        } else {
            return <FavouriteItem
                isActive={isActive}
                item={section}
                onDeletePress={() => {
                    setFavouritesList((favouritesList) => {

                        favouritesList.splice(index, 1);

                        return [...favouritesList];

                    });
                }}
            />;
        }

    };

    const renderFavouritesContent = (section, index) => {

        return (
            <View
                style={[screenStyles.contentContainerParent, (index === Globals.favouriteItems.length - 1) && screenStyles.favouriteLastItemContainer]}>


                {
                    section.items.map((item, index) => {
                        return (
                            <View
                                key={index}
                                style={screenStyles.contentItemContainer}>
                                <View style={[screenStyles.contentItemLeftIconContainer]}>
                                    <Image
                                        source={item.image}
                                        style={screenStyles.contentItemLeftIcon}
                                    />
                                </View>

                                <View>
                                    <Text style={screenStyles.titleText}>{item.title}</Text>

                                    <View style={screenStyles.weightPriceContainer}>

                                        <View style={screenStyles.weightContainer}>
                                            <Text style={screenStyles.weightText}>{item.weight}</Text>
                                        </View>

                                        <Text style={screenStyles.priceText}>{item.price}</Text>

                                    </View>

                                </View>
                            </View>
                        );
                    })
                }


                <View style={screenStyles.contentContainerButton}>
                    <AppButton
                        title={"Checkout with this list"}
                        onPress={() => {
                            props.navigation.navigate(Routes.CART_SUMMARY);
                        }}
                    />

                </View>


            </View>
        );
    };

    const _updateSections = allActiveSections => {
        setActiveSections(allActiveSections);
    };

//    const imageContainerEl document.querySelector("image-container");
//    const prevEl document.querySelector(".prev");
//    const nextEl = document.querySelector(".next");
//
//    let x=0;
//
//    let timer-0;
//
//    prevEl.addEventListener("click", ()=>{
//
//    x = x + 45; clearTimeout(timer); updateContainer();
//
//    })
//
//    nextEl.addEventListener("click", ()=>{
//
//    x = x - 45;
//
//    clearTimeout(timer); updateContainer();
//
//    <
//
//    >
//
//    })
//
//    function updateContainer(){ imageContainerEl.style.transform perspective(1080px) rotateY(${x}deg)';
//
//    timer setTimeout(() => { x = x - 45;
//
//    updateContainer();
//
//    }, 2000); }
//
//    updateContainer();

    return (

        <BaseView
            navigation={props.navigation}
            showAppHeader={true}
            title={"My List"}
            rightIcon={IconNames.PlusCircle}
            onRightIconPress={() => {
                sheetRef.open();
            }}
            headerWithBack={false}
            childView={() => {
                return (

                    <View style={screenStyles.container}>
                        <ScrollView style={screenStyles.container} showsVerticalScrollIndicator={false}>
                            {/*<View style={{height: hp("90%")}}>
                                <View class={screenStyles.imageContainer}>
                                    <View style={{...screenStyles.imageContainerSpan, ...{transform: [{rotateX:  45+'deg'}, {scale: (100 / (100 - 10))}]}}}>
                                        <Image style={screenStyles.imageContainerSpanImg} source={require("./Assets/beer.png")}/>
                                    </View>

                                    <View style={{...screenStyles.imageContainerSpan, ...{transform: [{rotateX: 90+'deg'}, {scale: (100 / (100 - 10))}]}}}>
                                        <Image style={screenStyles.imageContainerSpanImg} source={require("./Assets/beer.png")}/>
                                    </View>

                                    <View style={{...screenStyles.imageContainerSpan, ...{transform: [{rotateX: 135+'deg'}, {scale: (100 / (100 - 10))}]}}}>
                                        <Image style={screenStyles.imageContainerSpanImg} source={require("./Assets/beer.png")}/>
                                    </View>

                                    <View style={{...screenStyles.imageContainerSpan, ...{transform: [{rotateX: 180+'deg'}, {scale: (100 / (100 - 10))}]}}}>
                                        <Image style={screenStyles.imageContainerSpanImg} source={require("./Assets/beer.png")}/>
                                    </View>

                                    <View style={{...screenStyles.imageContainerSpan, ...{transform: [{rotateX: 225+'deg'}, {scale: (100 / (100 - 10))}]}}}>
                                        <Image style={screenStyles.imageContainerSpanImg} source={require("./Assets/beer.png")}/>
                                    </View>
                                </View>

                                <View style={screenStyles.carouselButtons}>
                                    <TouchableOpacity>
                                        <Text style={{...screenStyles.btnCarousel, ...screenStyles.prevBtnCarousel}}>Prev</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Text style={{...screenStyles.btnCarousel, ...screenStyles.prevBtnCarousel}}>Next</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>*/}

                            <View style={screenStyles.categoriesContainer}>
                            <Accordion
                                sections={favouritesList}
                                activeSections={activeSections}
                                renderHeader={renderFavouritesHeader}
                                renderContent={renderFavouritesContent}
                                expandMultiple={false}
                                underlayColor={"transparent"}
                                sectionContainerStyle={screenStyles.containerSpacing}
                                onChange={_updateSections}
                            />

                            </View>

                            <TouchableOpacity onPress={() => {
                                props.navigation.navigate(Routes.POPULAR_DEALS, {title: "Buy Again"});
                            }}>
                                <View style={screenStyles.sectionHeading}>
                                    <Text style={screenStyles.sectionHeadingText}>Buy Again</Text>
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

                            <TouchableOpacity onPress={() => {
                                props.navigation.navigate(Routes.POPULAR_DEALS, {title: "You Might also like"});
                            }}>
                                <View style={screenStyles.sectionHeading}>
                                    <Text style={screenStyles.sectionHeadingText}>You Might Also Like</Text>
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

                            <TouchableOpacity onPress={() => {
                                props.navigation.navigate(Routes.POPULAR_DEALS, {title: "Popular Deals"});
                            }}>
                                <View style={screenStyles.sectionHeading}>
                                    <Text style={screenStyles.sectionHeadingText}>Popular Orders</Text>
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
                                sheetRef = ref;
                            }}
                            height={favouriteSheetHeight}
                        >
                            <FavouritesBottomSheet
                                onItemSelect={() => {
                                    sheetRef.close();
                                }}
                            />
                        </RBSheet>
                    </View>


                );
            }}
        />

    );


};
