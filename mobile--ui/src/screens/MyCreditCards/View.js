import React, {useState, useEffect} from 'react';
import {Animated,ScrollView, useColorScheme, View} from "react-native";
import Accordion from 'react-native-collapsible/Accordion';
import BaseView from "../BaseView"
import Routes from "../../navigation/Routes";
import {Styles} from "./Styles";
import AppButton from "../../components/Application/AppButton/View";
import Globals from "../../utils/Globals";
import {CardItem} from "../../components/Application/CardItem/View";
import {useTheme} from "@react-navigation/native";
import IconNames from "../../../branding/boozemart/assets/IconNames";
import {CardContentItem} from "../../components/Application/CardContentItem/View";
import ApiUrls from '../../utils/ApiUrls';
import Axios from 'axios';

export const MyCreditCards = (props) => {

const [mycreditcards, setMycreditcards] = useState([]);

    useEffect(() => {
    console.log("Error");
        Axios.get(ApiUrls.SERVICE_URL+"/credit-card/credit-cards_byUser_Id/1").then((succResp) =>{
        console.log("orderlist: ",succResp.data);
            setMycreditcards(succResp.data.map((item) => {
             return {...item, spinValue : new Animated.Value(0)};
           }));
        },(errorresp) =>{
            console.log("From error")
            console.log((errorresp));
        })
    }, [])

    //Theme based styling and colors
    const scheme = useColorScheme();
    const {colors} = useTheme();
    const screenStyles = Styles(scheme, colors);

    //Internal states
    const [activeSections, setActiveSections] = useState([]);

    const renderCreditCardsHeader = (section, index, isActive) => {

        if (index === 0) {
            return <View style={screenStyles.creditCardFirstItem}>
                <CardItem
                    isTouchable={false}
                    showAnimatedIcon
                    isActive={isActive}
                    item={section}
                />
            </View>
        } else if (index === mycreditcards.length - 1) {
            return <View style={screenStyles.creditCardLastItem}>
                <CardItem
                    isTouchable={false}
                    showAnimatedIcon
                    isActive={isActive}
                    item={section}
                />
            </View>
        } else {
            return <CardItem
                isTouchable={false}
                showAnimatedIcon
                isActive={isActive}
                item={section}
            />
        }


    };

    const renderCreditCardsContent = section => {
        return <CardContentItem data={section}/>
    };

    const _updateSections = allActiveSections => {
        setActiveSections(allActiveSections)
    };

    return (

        <BaseView
            navigation={props.navigation}
            title={"Credit Cards"}
            rightIcon={IconNames.PlusCircle}
            onRightIconPress={() => {
                props.navigation.navigate(Routes.ADD_CREDIT_CARD)
            }}
            headerWithBack
            applyBottomSafeArea
            childView={() => {
                return (

                    <View style={screenStyles.container}>

                        <ScrollView showsVerticalScrollIndicator={false} style={screenStyles.scrollViewContainer}>

                            <Accordion
                                sections={mycreditcards}
                                activeSections={activeSections}
                                renderHeader={renderCreditCardsHeader}
                                renderContent={renderCreditCardsContent}
                                expandMultiple={false}
                                underlayColor={"transparent"}
                                sectionContainerStyle={screenStyles.containerSpacing}
                                onChange={_updateSections}
                            />

                        </ScrollView>

                        <View style={screenStyles.bottomContainer}>
                            <AppButton
                                title={'Save Settings'}
                                onPress={() => {
                                    props.navigation.goBack()
                                }}
                            />

                        </View>

                    </View>


                );
            }}
        />

    );
}
