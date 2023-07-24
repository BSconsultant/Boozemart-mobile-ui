import React, {useState} from 'react';
import {FlatList, Image, Text, TouchableHighlight, TouchableOpacity, useColorScheme, View,} from "react-native";
import {Styles} from "./Styles";
import AppConfig from "../../../../branding/App_config";
import Utilities from "../../../utils/UtilityMethods";
import Globals from "../../../utils/Globals";
import {useTheme} from "@react-navigation/native";
import {commonDarkStyles} from "../../../../branding/boozemart/styles/dark/Style";
import {commonLightStyles} from "../../../../branding/boozemart/styles/light/Style";
import {SvgIcon} from "../../../components/Application/SvgIcon/View";
import IconNames from "../../../../branding/boozemart/assets/IconNames";
import Routes from "../../../navigation/Routes";
import {FocusAwareStatusBar} from "../../../components/Application/FocusAwareStatusBar/FocusAwareStatusBar";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import BaseView from "../../BaseView"

const assets = AppConfig.assets.default;

export const Variant3Profile = (props) => {

    //Theme based styling and colors
    const scheme = useColorScheme();
    const {colors} = useTheme();
    const globalStyles = scheme === "dark" ? commonDarkStyles(colors) : commonLightStyles(colors);
    const screenStyles = Styles(globalStyles, scheme, colors);


    //Internal States
    const [profileImage, setProfileImage] = useState("");

    const renderProfileListItem = (item, index) => {
        var margin = {}
        if(!(index%2)) margin = {marginRight: wp("1.5")}
        return (
            <TouchableOpacity
                key={index}
                onPress={() => item.onPress()}
                style={{...screenStyles.profileListingItemContainer,
                        ...{height: 65, flex: 1, justifyContent: 'flex-start', alignItems: 'center'},
                        ...margin}}>

                <SvgIcon type={item.icon} width={20} height={20} color={"green"}
                         style={screenStyles.profileListingItemLeftImage}/>
                <Text style={screenStyles.profileListingItemText}>{item.title}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <BaseView
            showAppHeader={true}
            title={"My Account"}
            headerWithBack={false}
            applyBottomSafeArea={true}
            navigation={props.navigation}
            childContainerStyle={{
                ...globalStyles.baseViewStyles.childContainerStyle,
                width: wp("100%"),
            }}
            childView={() => {

                return (
                <View style={screenStyles.mainContainer}>
                    <FocusAwareStatusBar translucent backgroundColor="transparent" barStyle="light-content"/>

                    <View style={screenStyles.upperContainer}>

                        <View
                            style={screenStyles.profileImageContainer}>
                            <Image
                                source={profileImage ? {uri: profileImage.uri} : assets.profile_image}
                                style={screenStyles.profileImage}
                            />

                            <TouchableOpacity
                                onPress={() => {
                                    Utilities.selectImage((response) => {
                                        setProfileImage(response);
                                    })
                                }}
                                activeOpacity={0.8} style={
                                [
                                    globalStyles.buttonShadow,
                                    screenStyles.profileImageAccessoryViewContainer
                                ]
                            }>

                                <SvgIcon type={IconNames.Camera} width={20} height={20} color={colors.activeColor}/>

                            </TouchableOpacity>
                        </View>

                        <View style={screenStyles.infoContainer}>
                            <Text style={screenStyles.nameText}>{"Jessica Simpson"}</Text>
                            <Text style={screenStyles.emailText}>{"dummy@example.com"}</Text>
                        </View>
                    </View>

                    <View style={[screenStyles.overlayContainer]}>

                        <Text style={screenStyles.ordersText}>{"Orders"}</Text>

                        <View style={screenStyles.overlayNestedContainer}>

                            <TouchableHighlight
                                onPress={() => {
                                    props.navigation.navigate(Routes.MY_ORDERS,{
                                        orderType: "Unpaid"
                                    })
                                }}
                                underlayColor={colors.secondaryBackground}
                                activeOpacity={0.5}
                                style={screenStyles.nestedContainer}>

                                <View style={{alignItems: "center"}}>
                                    <SvgIcon type={IconNames.WalletFull} width={25} height={25} color={colors.activeColor}/>

                                    <Text style={screenStyles.nestedContainerText}>{"Unpaid"}</Text>
                                </View>
                            </TouchableHighlight>

                            <TouchableHighlight
                                onPress={() => {
                                    props.navigation.navigate(Routes.MY_ORDERS,{
                                          orderType: "Pending"
                                      })
                                }}
                                underlayColor={colors.secondaryBackground}
                                activeOpacity={0.5}
                                style={screenStyles.nestedContainer}>

                                <View style={{alignItems: "center"}}>
                                    <SvgIcon type={IconNames.PendingFull} width={25} height={25} color={colors.activeColor}/>

                                    <Text style={screenStyles.nestedContainerText}>{"Pending"}</Text>
                                </View>
                            </TouchableHighlight>

                            <TouchableHighlight
                                onPress={() => {
                                    props.navigation.navigate(Routes.MY_ORDERS,{
                                          orderType: "Shipped"
                                      })
                                }}
                                underlayColor={colors.secondaryBackground}
                                activeOpacity={0.5}
                                style={screenStyles.nestedContainer}>

                                <View style={{alignItems: "center"}}>
                                    <SvgIcon type={IconNames.ShippedFull} width={28} height={25} color={colors.activeColor}/>

                                    <Text style={screenStyles.nestedContainerText}>{"Shipped"}</Text>

                                </View>

                            </TouchableHighlight>

                            <TouchableHighlight
                                onPress={() => {
                                    props.navigation.navigate(Routes.REVIEW_LIST)

                                }}
                                underlayColor={colors.secondaryBackground}
                                activeOpacity={0.5}
                                style={screenStyles.nestedContainer}>

                                <View style={{alignItems: "center"}}>
                                    <SvgIcon type={IconNames.StarFull} width={25} height={25} color={colors.activeColor}/>

                                    <Text style={screenStyles.nestedContainerText}>{"Reviews"}</Text>

                                </View>

                            </TouchableHighlight>

                        </View>

                    </View>

                    <View style={screenStyles.container}>

                        <FlatList
                            style={screenStyles.listingContainer}
                            data={Globals.profileList(props.navigation)}
                            renderItem={({item, index}) => {
                                return renderProfileListItem(item, index)
                            }}
                            numColumns={2}
                            />

                    </View>
                </View>
             );
        }}/>
    );
}

