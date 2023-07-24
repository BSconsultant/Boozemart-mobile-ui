import React, {useRef, useState, useEffect} from "react";
import {useColorScheme, View} from "react-native";
import {Text} from "react-native-elements";

import BaseView from "../BaseView";
import AppInput from "../../components/Application/AppInput/View";
import AppButton from "../../components/Application/AppButton/View";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scrollview";
import {CustomSwitch} from "../../components/Global/CustomSwitch/View";
import {Styles} from "./Styles";
import {useTheme} from "@react-navigation/native";
import {commonDarkStyles} from "../../../branding/boozemart/styles/dark/Style";
import {commonLightStyles} from "../../../branding/boozemart/styles/light/Style";
import IconNames from "../../../branding/boozemart/assets/IconNames";
import ApiUrls from "../../utils/ApiUrls.js";
import Axios from 'axios';
import Routes from "../../navigation/Routes";

export const AddAddress = (props) => {

    //Input reference for KeyboardAwareScrollView
    let inputRef = useRef();

    //Theme based styling and colors
    const scheme = useColorScheme();
    const {colors} = useTheme();
    const screenStyles = Styles(colors);
    const globalStyles = scheme === "dark" ? commonDarkStyles(colors) : commonLightStyles(colors);


    //Internal input field states
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [society, setSociety] = useState("");
    const [houseno, setHouseno] = useState("");
    const [landmark, setLandmark] = useState("");
    const [doorno, setDoorno] = useState("");
    const [state, setState] = useState("");

    const addaddress = async() => {
           return await Axios.post(ApiUrls.SERVICE_URL + "/address", {
                        "address_id": 0,
                          "type": "",
                          "user_id": 1,
                          "receiver_name": name,
                          "receiver_phone": phone,
                          "city": city,
                          "society": society,
                          "city_id": 0,
                          "society_id": 0,
                          "house_no": houseno,
                          "landmark": landmark,
                          "state": state,
                          "pincode": zipCode,
                          "select_status": 0,
                          "lat": "0",
                          "lng": "0",
                          "added_at": "",
                          "updated_at": ""
                  })
    }



    return (

        <BaseView
            navigation={props.navigation}
            title={"Add Address"}
            headerWithBack
            applyBottomSafeArea
            childView={() => {

                return (

                    <View style={screenStyles.mainContainer}>

                        <KeyboardAwareScrollView
                            keyboardShouldPersistTaps={"never"}
                            getTextInputRefs={() => {
                                return [inputRef];
                            }}
                            contentContainerStyle={screenStyles.parentContainer}
                            showsVerticalScrollIndicator={false}>


                            <View style={{}}>

                                <AppInput
                                    textInputRef={r => (inputRef = r)}
                                    {...globalStyles.secondaryInputStyle}
                                    leftIcon={IconNames.CircleUser}
                                    placeholder={"Name"}
                                    value={name}
                                    onChangeText={(name) => {
                                        setName(name);
                                    }}
                                />

                                <AppInput
                                    textInputRef={r => (inputRef = r)}
                                    {...globalStyles.secondaryInputStyle}
                                    leftIcon={IconNames.Envelope}
                                    placeholder={"Email Address"}
                                    value={email}
                                    keyboardType={"email-address"}
                                    onChangeText={(email) => {
                                        setEmail(email);
                                    }}
                                />

                                <AppInput
                                    textInputRef={r => (inputRef = r)}
                                    {...globalStyles.secondaryInputStyle}
                                    leftIcon={IconNames.PhoneFlip}
                                    placeholder={"Phone"}
                                    value={phone}
                                    keyboardType={"phone-pad"}
                                    onChangeText={(phone) => {
                                        setPhone(phone);
                                    }}
                                />

                                <AppInput
                                    textInputRef={r => (inputRef = r)}
                                    {...globalStyles.secondaryInputStyle}
                                    leftIcon={IconNames.Map}
                                    placeholder={"Door No"}
                                    value={doorno}
                                    onChangeText={(doorno) => {
                                        setDoorno(doorno);
                                    }}
                                />

                                <AppInput
                                    textInputRef={r => (inputRef = r)}
                                    {...globalStyles.secondaryInputStyle}
                                    leftIcon={IconNames.Map}
                                    placeholder={"City"}
                                    value={city}
                                    onChangeText={(city) => {
                                        setCity(city);
                                    }}
                                />

                                <AppInput
                                    textInputRef={r => (inputRef = r)}
                                    {...globalStyles.secondaryInputStyle}
                                    leftIcon={IconNames.Map}
                                    placeholder={"Society"}
                                    value={society}
                                    onChangeText={(society) => {
                                        setSociety(society);
                                    }}
                                />

                                <AppInput
                                    textInputRef={r => (inputRef = r)}
                                    {...globalStyles.secondaryInputStyle}
                                    leftIcon={IconNames.Map}
                                    placeholder={"House No"}
                                    value={houseno}
                                    onChangeText={(houseno) => {
                                        setHouseno(houseno);
                                    }}
                                />

                                <AppInput
                                     textInputRef={r => (inputRef = r)}
                                     {...globalStyles.secondaryInputStyle}
                                     leftIcon={IconNames.Map}
                                     placeholder={"Landmark"}
                                     value={landmark}
                                     onChangeText={(landmark) => {
                                         setLandmark(landmark);
                                     }}
                                />

                                <AppInput
                                     textInputRef={r => (inputRef = r)}
                                     {...globalStyles.secondaryInputStyle}
                                     leftIcon={IconNames.Map}
                                     placeholder={"State"}
                                     value={state}
                                     onChangeText={(state) => {
                                         setState(state);
                                     }}
                                />

                                <AppInput
                                     textInputRef={r => (inputRef = r)}
                                     {...globalStyles.secondaryInputStyle}
                                     leftIcon={IconNames.Mailbox}
                                     placeholder={"Zip code"}
                                     value={zipCode}
                                     onChangeText={(zipCode) => {
                                         setZipCode(zipCode);
                                     }}
                                />

                                <View style={screenStyles.switchContainer}>

                                    <CustomSwitch
                                        initialValue={false}
                                        onValueChange={(value) => {

                                        }}
                                    />

                                    <Text style={screenStyles.defaultText}>{"Make Default"}</Text>
                                </View>
                            </View>


                        </KeyboardAwareScrollView>


                        <View style={screenStyles.bottomButton}>

                            <AppButton
                                title={"Add Address"}
                                onPress={() => {

                                addaddress().then((succResp) =>{
                                console.log(succResp.data.raw[0].address_id);
                                props.navigation.navigate(Routes.Location_Selection,{
                                addressid: succResp.data.raw[0].address_id,
                                })
                                })
                               // props.navigation.navigate(Routes.Location_Selection)
                                }}
                            />

                        </View>


                    </View>


                );


            }}

        />


    );
};
