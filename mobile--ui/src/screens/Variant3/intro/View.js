import React, {useRef, useState, createRef, useEffect} from "react";
import {ImageBackground, View, Image, Button, TouchableWithoutFeedback} from "react-native";
import Carousel, {Pagination} from "react-native-snap-carousel";
import {heightPercentageToDP as hp,widthPercentageToDP as wp} from "react-native-responsive-screen";
import {Text} from "react-native-elements";
import Routes from "../../../navigation/Routes";
import {StackActions} from "@react-navigation/native";
import {Styles} from "./Style";
import Globals from "../../../utils/Globals";
import AppButton from "../../../components/Application/AppButton/View";
import {commonLightStyles} from "../../../../branding/boozemart/styles/light/Style";
import AppConfig from "../../../../branding/App_config";
import {FocusAwareStatusBar} from "../../../components/Application/FocusAwareStatusBar/FocusAwareStatusBar";
import Axios from 'axios';
import ApiUrls from "../../../utils/ApiUrls";

const colors = AppConfig.lightColors.default;

export const Variant3Intro = (props) => {

    //Theme based styling and colors
    const globalStyles = commonLightStyles(colors);
    const screenStyles = Styles(globalStyles, colors);

    //Internal States
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);
    const [swipeCardData, setSwipeCardData] = useState([]);

     useEffect(() => {
            Axios.get(ApiUrls.SERVICE_URL + "/hscreen/AllHscreens").then((succResp) =>{
                const scd = [[],[],[]];
                let catList = Array.from(new Set(succResp.data.map((item) => {return item.category_name})))
                catList.forEach((item, index) => {
                    scd[index] = succResp.data.filter((elem) => {
                        if(item === elem.category_name){
                            return elem;
                        }
                    })
                })
                console.log(scd[2])
                setSwipeCardData(scd);
            },(errorresp) =>{
                console.log("From error")
                console.log(JSON.stringify(errorresp));
            })
        }, [])

    //References
    let _carouselRef = useRef();

      const outerRef = createRef();
      const innerRefs = [];
      for (let i = 0; i < swipeCardData.length; i++) {
        innerRefs.push(createRef());
      }
      const renderRow = ({ item, index }) => {
        return (
          <Carousel
            loop={true}
            vertical={true}
            sliderHeight={hp("100%")}
            itemHeight= {hp("100%")}
            useScrollView={true}
            data={item}
            inactiveSlideScale={1}
            renderItem={(elem) => {
            const indexChild = elem.index;
            const itemChild = elem.item;
              return (
              <TouchableWithoutFeedback
                onPress={() => {
                      props.navigation.navigate(
                          Routes.CATEGORY_ITEMS, {
                              category: itemChild.category_name,
                              categoryId: itemChild.category_Id
                          }
                      );
                  }}>
                <View
                  style={{
                    flex: 1,
//                    width: wp("100%"),
                    height: hp("100%"),
                    backgroundColor:"#000"
                  }}>
                     {(indexChild != 0) &&
                     (<View style={{
                         width: wp("80%"),
                     }}><View style={{
                      position: "absolute",
                      backgroundColor: "#FFF",
                      opacity: 0.2,
                      height: hp("9"),
                      top: hp(5),
                      left: wp(10),
                      borderRadius: hp(2),
                      zIndex: 3, // works on ios
                        elevation: 3, // works on android
                      }}/>
                      <Text style={{
                      position: "absolute",
                      color: "#FFF",
                      fontWeight: 'bold',
                      top: hp(7.5),
                      left: wp(13),
                      fontSize: 20,
                      zIndex: 4, // works on ios
                        elevation: 4, // works on android
                      }}>{itemChild.description}</Text>
                      </View>) }

                      {(<Image
                          source={{uri: itemChild.image}}
                          style={{
                            width: undefined,
                            height: '100%',
                            aspectRatio: 1,
                            marginLeft: wp("-40%")
                          }}
                          resizeMode="contain"
                      />)}
                </View>
                </TouchableWithoutFeedback>
              );
            }}

            ref={innerRefs[index]}
          />
        );

      };
      return (
        <View style={screenStyles.container}>
                    <FocusAwareStatusBar translucent backgroundColor={"transparent"} barStyle="dark-content"/>
            <Carousel
              loop={true}
              data={swipeCardData}
              inactiveSlideScale={1}
              renderItem={renderRow}
              sliderWidth={wp("100%")}
              itemWidth={wp("100%")}
              ref={outerRef}
                onSnapToItem={(index) => setActiveSlideIndex(index)}
/>





         <Pagination
         dotsLength={swipeCardData.length}
         activeDotIndex={activeSlideIndex}
         dotColor={colors.paginationDotActiveColor}
         inactiveDotColor={colors.primaryBackground}
         inactiveDotOpacity={0.8}
         inactiveDotScale={1}
         carouselRef={outerRef}
         dotStyle={screenStyles.paginationDotStyle}
         inactiveDotStyle={screenStyles.paginationInactiveDotStyle}
         containerStyle={screenStyles.paginationContainerStyle}
     />

             {/*</View>*/}

         <View style={screenStyles.introLowerContainer}>
             <AppButton
                 title={activeSlideIndex === 0 ? "Get started" : "Skip"}
                 onPress={() => {
                     props.navigation.dispatch(
                         StackActions.replace(Routes.LOGIN_FORM_SCREEN3),
                     );
                 }}
             />
         </View>

     </View>
);

};
