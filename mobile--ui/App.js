import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RootStack} from './src/navigation/RootStack';
import {SafeAreaConsumer, SafeAreaProvider} from "react-native-safe-area-context";
import Globals from "./src/utils/Globals";
import {useColorScheme} from "react-native";
import AppConfig from "./branding/App_config";
import Context from './src/utils/context'
const lightColors = AppConfig.lightColors.default;
const darkColors = AppConfig.darkColors.default;

const DarkTheme = {
    dark: true,
    colors: darkColors
};

const LightTheme = {
    dark: false,
    colors: lightColors
};

export const App = (props) => {

    const scheme = useColorScheme();
    const [stateData, setStateData] = useState({
        common: {
            isTabBarVisible: true
          }
    });

    return (

        <NavigationContainer theme={scheme === 'dark' ? DarkTheme : LightTheme}>
            <SafeAreaProvider>
                <SafeAreaConsumer>

                    {
                        insets => {

                            Globals.SAFE_AREA_INSET = insets;

                            return (
                                <Context.Provider value={{
                                    stateData: stateData,
                                    setStateData: setStateData
                                }}>
                                    <RootStack/>
                                </Context.Provider>
                            );
                        }
                    }
                </SafeAreaConsumer>
            </SafeAreaProvider>
        </NavigationContainer>
    );


}
