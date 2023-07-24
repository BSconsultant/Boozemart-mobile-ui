import React, {useState, useEffect} from "react";
import {ScrollView, useColorScheme, View, Animated} from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import BaseView from "../BaseView";
import Routes from "../../navigation/Routes";
import Globals from "../../utils/Globals";
import ApiUrls from '../../utils/ApiUrls';
import {AddressItem} from "../../components/Application/AddressItem/View";
import AppButton from "../../components/Application/AppButton/View";
import {Styles} from "./Styles";
import {useTheme} from "@react-navigation/native";
import IconNames from "../../../branding/boozemart/assets/IconNames";
import {AddressContentItem} from "../../components/Application/AddressContentItem/View";
import Axios from 'axios';

export const MyAddress = (props) => {


    //Theme based styling and colors
    const scheme = useColorScheme();
    const {colors} = useTheme();
    const screenStyles = Styles(scheme, colors);


    //Internal states
    const [activeSections, setActiveSections] = useState([]);

    const renderAddressesHeader = (section, index, isActive) => {

        if (index === 0) {
            return <View style={screenStyles.addressFirstItem}>
                <AddressItem
                    isTouchable={false}
                    isActive={isActive}
                    showAnimatedIcon
                    item={section}
                />
            </View>
        } else if (index === userAddressList.length - 1) {
            return <View style={screenStyles.addressLastItem}>
                <AddressItem
                    isTouchable={false}
                    isActive={isActive}
                    showAnimatedIcon
                    item={section}
                />
            </View>
        } else {
            return <AddressItem
                isTouchable={false}
                isActive={isActive}
                showAnimatedIcon
                item={section}
            />;
        }


    };

    const renderAddressesContent = section => {
        return <AddressContentItem data={section}/>
    };

    const _updateSections = allActiveSections => {
        setActiveSections(allActiveSections);
    };

const [userAddressList, setUserAddressList] = useState([]);

    useEffect(() => {
        Axios.get(ApiUrls.SERVICE_URL+"/address/all").then((succResp) =>{
        console.log("addresslist: ",succResp.data);
            setUserAddressList(succResp.data.map((item) => {
                return {...item, spinValue : new Animated.Value(0)};
            }));
        },(errorresp) =>{
            console.log("From error")
            console.log((errorresp));
        })
    }, [])

    return (

        <BaseView
            navigation={props.navigation}
            title={"My Address"}
            rightIcon={IconNames.PlusCircle}
            onRightIconPress={() => {
                props.navigation.navigate(Routes.Add_Address);
            }}
            headerWithBack
            applyBottomSafeArea
            childView={() => {
                return (

                    <View style={screenStyles.container}>
                        <ScrollView showsVerticalScrollIndicator={false} style={screenStyles.scrollViewContainer}>

                            <Accordion
                                sections={userAddressList}
                                activeSections={activeSections}
                                renderHeader={renderAddressesHeader}
                                renderContent={renderAddressesContent}
                                underlayColor={"transparent"}
                                expandMultiple={false}
                                sectionContainerStyle={screenStyles.containerSpacing}
                                onChange={_updateSections}
                            />


                        </ScrollView>

                        <View style={screenStyles.bottomContainer}>

                            <AppButton
                                title={"Save Settings"}
                                onPress={() => {
                                    props.navigation.goBack();
                                }}
                            />

                        </View>

                    </View>


                );
            }}
        />

    );
};
