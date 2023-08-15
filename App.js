import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { StyleSheet } from "react-native";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SplashScreen from "react-native-splash-screen";
import { screens } from "./src/constants/screens";
import TabBarButtom from "./src/Routes/TabBar";

import Login from "./src/Views/Login";
import SignUp from "./src/Views/SignUp";
import { useDispatch, useSelector } from "react-redux";
import { getProfileAuth } from "./src/reducers/selectors";
import { hasLoggedIn10DaysBack } from './src/utils/helper'
import { doLogout } from "./src/reducers/app.reducers";

const App = () => {

  const Stack = createNativeStackNavigator();
  const profile = useSelector(getProfileAuth);
  const isLoggedIn = !!(profile?.token);
  const dispatch = useDispatch();

  React.useEffect(() => {
    SplashScreen.hide();
    if(hasLoggedIn10DaysBack(profile.lastLogin)) {
      dispatch(doLogout());
    }

  }, [dispatch]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <NavigationContainer>
        {!isLoggedIn ? (
          <>
            <Stack.Navigator initialRouteName={screens.LOGIN}>
              <Stack.Screen
                name={screens.LOGIN}
                options={{ title: "Login", headerShown: false }}
                component={Login}
              />
              <Stack.Screen
                name={screens.SIGNUP}
                options={{ title: "Sign Up", headerShown: false }}
                component={SignUp}
              />
            </Stack.Navigator>
          </>
        ) : (
          <TabBarButtom />
        )}
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
  },
});
export default App;
