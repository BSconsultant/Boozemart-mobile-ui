import React, {useState, useEffect} from 'react';
import {Animated,FlatList, View} from 'react-native';

import BaseView from "../BaseView"
import Routes from "../../navigation/Routes";
import Globals from "../../utils/Globals";
import {AddressItem} from "../../components/Application/AddressItem/View";
import AppButton from "../../components/Application/AppButton/View";
import {useTheme} from "@react-navigation/native";
import {Styles} from "./Styles";
import ApiUrls from '../../utils/ApiUrls';
import Axios from 'axios';


export const CheckoutAddress = (props) => {

const [userAddressList, setUserAddressList] = useState([]);

    useEffect(() => {
        console.log("Error");
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

    //Theme based styling and colors
    const {colors} = useTheme();
    const screenStyles = Styles(colors);

    const [addresses, setAddresses] = useState(userAddressList);

    const onAddressItemPress = (index) => {

        setAddresses((addresses) => {

            addresses.map(address => address.isActive = false);

            addresses[index].isActive = !addresses[index].isActive
            return [...addresses];
        })

    }

    return (

        <BaseView
            navigation={props.navigation}
            title={"Select Address"}
            headerWithBack
            applyBottomSafeArea
            childView={() => {
                return (

                    <View style={screenStyles.container}>

                        <FlatList
                            showsVerticalScrollIndicator={false}
                            style={screenStyles.listContainer}
                            data={userAddressList}
                            renderItem={({item, index}) => {
                                if (index === 0) {
                                    return <View style={screenStyles.addressFirstItem}>
                                        <AddressItem
                                            showActiveIcon
                                            isActive={item.isActive}
                                            item={item}
                                            onPress={() => {
                                                onAddressItemPress(index)
                                            }}
                                        />
                                    </View>
                                } else if (index === userAddressList.length - 1) {
                                    return <View style={screenStyles.addressLastItem}>
                                        <AddressItem
                                            showActiveIcon
                                            isActive={item.isActive}
                                            item={item}
                                            onPress={() => {
                                                onAddressItemPress(index)
                                            }}
                                        />
                                    </View>
                                } else {
                                    return <AddressItem
                                        showActiveIcon
                                        isActive={item.isActive}
                                        item={item}
                                        onPress={() => {
                                            onAddressItemPress(index)
                                        }}
                                    />
                                }

                            }}/>

                        <View style={screenStyles.bottomContainer}>
                            <AppButton
                                title={'Next'}
                                onPress={() => {
                                    props.navigation.navigate(Routes.CHECKOUT_PAYMENT)
                                }}
                            />
                        </View>
                    </View>

                );
            }}
        />

    );
}
