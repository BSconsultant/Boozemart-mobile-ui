import React, {useState} from "react";
import {useColorScheme, View} from "react-native";
import {Text} from "react-native-elements";

import BaseView from "../BaseView";
import AppInput from "../../components/Application/AppInput/View";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scrollview";
import {CustomSwitch} from "../../components/Global/CustomSwitch/View";
import AppButton from "../../components/Application/AppButton/View";
import {useTheme} from "@react-navigation/native";
import {Styles} from "./Styles";
import {commonDarkStyles} from "../../../branding/boozemart/styles/dark/Style";
import {commonLightStyles} from "../../../branding/boozemart/styles/light/Style";
import IconNames from "../../../branding/boozemart/assets/IconNames";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import {CreditCard} from "../../components/Application/CreditCard/View";
import creditcardutils from "creditcardutils";
import ApiUrls from "../../utils/ApiUrls.js";
import Axios from 'axios';


export const AddCreditCard = (props) => {

    //Input reference for KeyboardAwareScrollView
    let inputRef = React.createRef();


    //Theme based styling and colors
    const scheme = useColorScheme();
    const {colors} = useTheme();
    const screenStyles = Styles(colors);
    const globalStyles = scheme === "dark" ? commonDarkStyles(colors) : commonLightStyles(colors);


    //Internal input field states
    const [company, setCompany] = useState("");
    const [name, setName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCVV] = useState("");

    const addcreditcards = () => {
               Axios.post(ApiUrls.SERVICE_URL + "/credit-card/credit-card", {
                            "card_Number": cardNumber,
                              "user_Id": 1,
                              "company": company,
                              "card_holder_name": name,
                              "cvv": cvv,
                              "expires_on": expiry
                      })
        }



    return (

        <BaseView
            navigation={props.navigation}
            title={"Add Credit Card"}
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
                            style={screenStyles.parentContainer}
                            showsVerticalScrollIndicator={false}>

                            <View style={{}}>

                                <CreditCard
                                    width={wp(90)}
                                    number={cardNumber}
                                    cvc={cvv}
                                    expiration={expiry}
                                    name={name}
                                    cardcompany={company}
                                    fontSize={20}
                                />

                                <AppInput
                                     textInputRef={r => (inputRef = r)}
                                     {...globalStyles.secondaryInputStyle}
                                     leftIcon={IconNames.CircleUser}
                                     placeholder={"CardCompany Name"}
                                     containerStyle={screenStyles.cardCompanyInputContainer}
                                     value={company}
                                     onChangeText={(company) => {
                                          setCompany(company);
                                     }}
                                />

                                <AppInput
                                    textInputRef={r => (inputRef = r)}
                                    {...globalStyles.secondaryInputStyle}
                                    leftIcon={IconNames.CircleUser}
                                    placeholder={"CardHolder Name"}
                                    containerStyle={screenStyles.cardHolderInputContainer}
                                    value={name}
                                    onChangeText={(name) => {
                                        setName(name);
                                    }}
                                />

                                <AppInput
                                    textInputRef={r => (inputRef = r)}
                                    {...globalStyles.secondaryInputStyle}
                                    leftIcon={IconNames.CreditCard}
                                    maxLength={16}
                                    keyboardType={"number-pad"}
                                    placeholder={"Card Number"}
                                    value={cardNumber}
                                    onChangeText={(cardNumber) => {

                                        setCardNumber(cardNumber);

                                    }}
                                />

                                <View style={screenStyles.horizontalInputsContainer}>

                                    <AppInput
                                        textInputRef={r => (inputRef = r)}
                                        {...globalStyles.secondaryInputStyle}
                                        leftIcon={IconNames.Calendar}
                                        placeholder={"Expiry"}
                                        maxLength={7}
                                        keyboardType={"number-pad"}
                                        containerStyle={screenStyles.horizontalInput}
                                        value={expiry}
                                        onChangeText={(expiry) => {
                                            setExpiry(creditcardutils.formatCardExpiry(expiry));
                                        }}
                                    />

                                    <AppInput
                                        textInputRef={r => (inputRef = r)}
                                        {...globalStyles.secondaryInputStyle}
                                        leftIcon={IconNames.LockKeyhole}
                                        placeholder={"CVV"}
                                        maxLength={3}
                                        keyboardType={"number-pad"}
                                        containerStyle={screenStyles.horizontalInput}
                                        value={cvv}
                                        onChangeText={(cvv) => {
                                            setCVV(cvv);
                                        }}
                                    />

                                </View>

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
                                title={"Add Credit Card"}

                                onPress={() => {
                                addcreditcards()
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
