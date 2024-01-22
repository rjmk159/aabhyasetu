import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabBarButtom from "./TabBar";
import SettingsScreen from '../Views/SettingsScreen';
import { screens } from '../constants/screens';
import StackOptions from '../components/StackOptions';

const Stack = createNativeStackNavigator();

const TabOrSettings = ({ shouldRenderTabBar }) => {
    if (shouldRenderTabBar) {
        return <TabBarButtom />;
    } else {
        return (
            <Stack.Navigator initialRouteName={screens.SETTINGS} screenOptions={() => StackOptions({ showBackButton: false })}>
                <Stack.Screen
                    name={screens.SETTINGS}
                    options={{ title: "Settings" }}
                    component={SettingsScreen}
                    initialParams={{ gradeAndLangNotSet: true }}
                />
            </Stack.Navigator>
        );
    }
};

export default TabOrSettings;
