import React, {useState, useEffect} from 'react';
import {FlatList, Image, useColorScheme, View} from "react-native";
import BaseView from "../BaseView"
import {Text} from "react-native-elements";
import {Styles} from "./Styles";
import Globals from "../../utils/Globals";
import {useTheme} from "@react-navigation/native";
import AppConfig from "../../../branding/App_config";
import ApiUrls from '../../utils/ApiUrls';
import Axios from 'axios';

const assets = AppConfig.assets.default;

export const Transactions = (props) => {

const [transcations, setTranscations] = useState([]);

    useEffect(() => {
    console.log("Error");
        Axios.get(ApiUrls.SERVICE_URL+"/Transaction/Transactions/1").then((succResp) =>{
        console.log("transcationlist: ",succResp.data);
            setTranscations(succResp.data);
        },(errorresp) =>{
            console.log("From error")
            console.log((errorresp));
        })
    }, [])


    //Theme based styling and colors
    const scheme = useColorScheme();
    const {colors} = useTheme();
    const screenStyles = Styles(scheme, colors);


    const renderTransactionItem = (item, index) => {

        let icon = assets.master_card_icon;

        if (item.type === "Visa") {
            icon = assets.visa_icon
        } else if (item.type === "Paypal") {
            icon = assets.paypal_coloured_icon
        }

        return (
            <View
                style={[screenStyles.itemContainer, index === 0 && screenStyles.transactionFirstItem, index === transcations.length - 1 && screenStyles.transactionLastItem]}>

                <View style={screenStyles.leftIconContainerStyle}>
                    <Image source={icon} style={screenStyles.leftIcon}/>
                </View>

                <View style={screenStyles.textContainer}>
                    <View>
                        <Text style={screenStyles.titleText}>{item.payment_id}</Text>
                        <Text style={screenStyles.subtitleText}>{new Date(item.updated_at).toDateString()}</Text>
                    </View>

                    <Text style={screenStyles.priceText}>{item.amount}</Text>

                </View>

            </View>
        );
    }

    return (

        <BaseView
            navigation={props.navigation}
            title={"Transactions"}
            headerWithBack
            applyBottomSafeArea
            childView={() => {
                return (

                    <View style={screenStyles.container}>

                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={transcations}
                            renderItem={({item, index}) => {
                                return renderTransactionItem(item, index)
                            }}
                        />

                    </View>


                );
            }}
        />

    );

}
