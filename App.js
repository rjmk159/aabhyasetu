import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { StyleSheet } from "react-native";
import "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SplashScreen from "react-native-splash-screen";
import { screens } from "./src/constants/screens";
import TabBarButtom from "./src/Routes/TabBar";
import { AuthContext } from "./src/utils/AuthContext";
import Login from "./src/Views/Login";
import SignUp from "./src/Views/SignUp";
import { useDispatch } from "react-redux";
import { setMyProfile } from "./src/reducers/app.reducers";
// import MainApp

const App = () => {
  const [userToken, setUserToken] = React.useState("");

  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();
  React.useEffect(() => {
    AsyncStorage.getItem("token").then((res) => {
      if (res) {
        setUserToken(JSON.parse(res));
      }
    });
    AsyncStorage.getItem("userDetails").then((res) => {
      if (res) {
        dispatch(setMyProfile(JSON.parse(res)));
      }
    });

    SplashScreen.hide();
  }, []);

  const globleContextValue = React.useMemo(() => {
    return {
      signIn: (token, res, result) => {
        setUserToken(token);
        let userData = {
          res: res,
          result: result,
        };
        dispatch(setMyProfile(userData));
        AsyncStorage.setItem("token", JSON.stringify(token));
        AsyncStorage.setItem("userDetails", JSON.stringify(userData));
      },
      signOut: () => {
        setUserToken("");
        AsyncStorage.setItem("token", "");
        AsyncStorage.setItem("userDetails", "");
      },
    };
  }, [userToken]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <AuthContext.Provider value={globleContextValue}>
        <NavigationContainer>
          {!userToken ? (
            <>
              <Stack.Navigator initialRouteName={screens.LOGIN}>
                <Stack.Screen
                  name={screens.LOGIN}
                  options={{ title: "Login", headerShown: false }}
                  component={Login}
                />
                <Stack.Screen
                  name={screens.SIGNUP}
                  options={{ title: "Login", headerShown: false }}
                  component={SignUp}
                />
              </Stack.Navigator>
            </>
          ) : (
            <TabBarButtom />
          )}
        </NavigationContainer>
      </AuthContext.Provider>
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
