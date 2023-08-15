import {
  ActivityIndicator,
  Animated,
  Image,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../theme/colors";
import { CommonFloatingInput } from "../components/CommonFloatingInput";
import CommonButton from "../components/CommonButton";
import { registerUser } from "../utils/api";
import { screens } from "../constants/screens";
import { ListItem } from "react-native-elements";
import TouchableScale from "react-native-touchable-scale";

const SignUp = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const [firstNameError, setfirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [userNameError, setUserNameError] = useState("");

  const [isLoading, setLoading] = useState(false);

  const handleCreateAccount = () => {
    if(isLoading) return;
    if (firstName?.length === 0) {
      setfirstNameError("Please enter first name");
    }

    if (lastName?.length === 0) {
      setLastNameError("Please enter last name");
    }

    if (email?.length === 0) {
      setEmailError("Please enter email");
    }

    if (password?.length === 0) {
      setPasswordError("Please enter password");
    }

    if (userName?.length === 0) {
      setUserNameError("Please enter username");
    }

    if (
      firstName?.length !== 0 &&
      lastName?.length !== 0 &&
      email?.length !== 0 &&
      password?.length !== 0 &&
      userName?.length !== 0
    ) {
      setLoading(true);
      let createAccount = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        username: userName,
      };
      registerUser(createAccount)
        .then((res) => {
          setLoading(false);

          if (res?.data?.registered) {
            setEmail("");
            setFirstName("");
            setLastName("");
            setPassword("");
            setUserName("");
            navigation.navigate(screens.LOGIN);
            ToastAndroid.showWithGravity('Registered Successfully, Login to continue!', ToastAndroid.LONG, ToastAndroid.TOP,);
          }
        })
        .catch((err) => {
          setLoading(false);
          ToastAndroid.showWithGravity(err?.message, ToastAndroid.LONG, ToastAndroid.TOP,);
        });
    }
  };

  const firstNameRef = React.useRef(new Animated.Value(0)).current;
  const lastNameRef = React.useRef(new Animated.Value(0)).current;
  const emailRef = React.useRef(new Animated.Value(0)).current;
  const passwordRef = React.useRef(new Animated.Value(0)).current;
  const userNameRef = React.useRef(new Animated.Value(0)).current;

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        Keyboard.dismiss();
      }}
      style={[styles.mainWrapper]}
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text
          style={{
            color: COLORS.primary,
            fontSize: 20,
            fontWeight: "600",
          }}
        >
          Create an Account
        </Text>

        <View style={styles.tellUsWrapper}>
          <Text style={{color:COLORS.black}}>Tell us more about you</Text>
          <CommonFloatingInput
            labelText={"First Name"}
            moveText={firstNameRef}
            inputStyle={{ color: COLORS.black }}
            value={firstName}
            onChangeText={(text) => {
              setFirstName(text);
              setfirstNameError("");
            }}
            errorText={firstNameError}
            labelTextStyle={{ color: COLORS.gray500 }}
            wrapperStyle={{ marginTop: 16 }}
            placeholder={""}
          />

          <CommonFloatingInput
            labelText={"Last Name"}
            moveText={lastNameRef}
            inputStyle={{ color: COLORS.black }}
            value={lastName}
            onChangeText={(text) => {
              setLastName(text);
              setLastNameError("");
            }}
            errorText={lastNameError}
            labelTextStyle={{ color: COLORS.gray500 }}
            wrapperStyle={{ marginTop: 16 }}
            placeholder={""}
          />

          <CommonFloatingInput
            labelText={"Email"}
            moveText={emailRef}
            inputStyle={{ color: COLORS.black }}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setEmailError("");
            }}
            keyboardType={"email-address"}
            errorText={emailError}
            labelTextStyle={{ color: COLORS.gray500 }}
            wrapperStyle={{ marginTop: 16 }}
            placeholder={""}
          />

          <CommonFloatingInput
            secureTextEntry={true}
            labelText={"Password"}
            moveText={passwordRef}
            inputStyle={{ color: COLORS.black }}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setPasswordError("");
            }}
            showIcon={true}
            errorText={passwordError}
            labelTextStyle={{ color: COLORS.gray500 }}
            wrapperStyle={{ marginTop: 16 }}
            placeholder={""}
          />

          <CommonFloatingInput
            labelText={"User name"}
            moveText={userNameRef}
            inputStyle={{ color: COLORS.black }}
            value={userName}
            onChangeText={(text) => {
              setUserName(text);
              setUserNameError("");
            }}
            showIcon={false}
            errorText={userNameError}
            labelTextStyle={{ color: COLORS.gray500 }}
            wrapperStyle={{ marginTop: 16 }}
            placeholder={""}
          />
          <ListItem
              Component={TouchableScale}
              onPress={() => {
                handleCreateAccount();
              }}
              style={{
                marginTop:16,
                borderRadius: 10,
                overflow: "hidden",
                marginHorizontal: 16,
              }}
              containerStyle={{ backgroundColor: COLORS.primary }}
            >
              <ListItem.Content
                style={{ alignItems: "center", marginHorizontal: 16 }}
              >
                <ListItem.Title
                  style={{ color: COLORS.white, fontWeight: "bold" }}
                >
                  {!isLoading ? 'Sign Up': <ActivityIndicator color={"#fff"}/>}
                </ListItem.Title>
              </ListItem.Content>
            </ListItem>
            <View style={styles.createAccount}>
            <Text style={[styles.createAccountText]}>
              Already have an account?{" "}
              <Text
                onPress={() => {
                  navigation.navigate(screens.LOGIN);
                  setEmail("");
                  setPassword("");
                  setEmailError("");
                  setPasswordError("");
                }}
                style={{ color: COLORS.one_01_coral, fontWeight: "600" }}
              >
               Login
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </TouchableOpacity>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  mainWrapper: { backgroundColor: COLORS.white, flex: 1 },
  container: { padding: 16, backgroundColor: COLORS.white,  marginTop: 40 },
  stepWrapper: { marginTop: 15, alignItems: "center" },
  stepImage: { height: 50, width: 50 },
  stepContainer: { marginLeft: 16 },
  colorBlack: { color: COLORS.black },
  colorOrange: { color: COLORS.one_01_coral },
  tellUsWrapper: { marginTop: 15 },
  input: { borderRadius: 8, marginTop: 16 },
  previousButtonWrapper: {
    marginTop: 32,
    width: "35%",
    backgroundColor: COLORS.white,
    borderColor: COLORS.one_01_coral,
    borderWidth: 2,
  },
  colorWhite: { color: COLORS.white, fontSize: 16 },
  nextButton: { marginTop: 32, flex: 1 },
  separater: { width: 15 },
  createAccount: {
    alignSelf: "center",
    marginTop: 12
  },
  createAccountText: {
    textDecorationLine: "underline",
  },
});
