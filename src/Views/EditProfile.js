import { ActivityIndicator, Animated, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { COLORS } from "../theme/colors";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, getProfileAuth, getProfileDetails } from "../reducers/selectors";
import { CommonFloatingInput } from "../components/CommonFloatingInput";
import Lottie from "lottie-react-native";
import { ListItem } from "react-native-elements";
import TouchableScale from "react-native-touchable-scale";
import { editProfileHandler } from "../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { setProfileDetails } from "../reducers/app.reducers";

const EditProfile = () => {
  const profileDetails = useSelector(getProfileDetails);
  const profileAuth = useSelector(getProfileAuth);
  const [email, setEmail] = useState(profileDetails.email);
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [firstName, setFirstName] = useState(
    profileDetails?.firstName
  );
  const [firstNameError, setFirstNameError] = useState("");
  const [lastName, setLastname] = useState(
    profileDetails?.lastName
  );
  const [lastNameError, setLastNameError] = useState("");

  const emailRef = React.useRef(new Animated.Value(0)).current;
  const lastNameRef = React.useRef(new Animated.Value(0)).current;
  const firstNameRed = React.useRef(new Animated.Value(0)).current;
  const animationRef = useRef();
  const dispatch =  useDispatch();

  useEffect(() => {
    animationRef.current?.play();
  }, []);

  const editProfile = async () => {
    if(isLoading) return;
    let dataToSend = {
      email,
      // name,
      firstname: firstName,
      lastname: lastName,
      id: profileDetails?.id,
    };
    setIsLoading(true);
    editProfileHandler(dataToSend, profileAuth.token)
      .then((res) => {
        console.log(res);
        dispatch(setProfileDetails(res.details))
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1 }}>
        <View style={styles.wrapper}>
          <Text style={styles.heading}>Email:</Text>
          <CommonFloatingInput
            labelText={"Email"}
            moveText={emailRef}
            inputStyle={{ color: COLORS.black, fontWeight: "600" }}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setEmailError("");
            }}
            errorText={emailError}
            labelTextStyle={{ color: COLORS.gray500 }}
            placeholder={""}
          />
        </View>
        {/* <View style={styles.wrapper}>
          <Text style={styles.heading}>Display Name:</Text>
          <CommonFloatingInput
            labelText={"Name"}
            moveText={nameRef}
            inputStyle={{ color: COLORS.black, fontWeight: "600" }}
            value={name}
            onChangeText={(text) => {
              setName(text);
              setNameError("");
            }}
            errorText={nameError}
            labelTextStyle={{ color: COLORS.gray500 }}
            placeholder={""}
          />
        </View> */}
        <View style={styles.wrapper}>
          <Text style={styles.heading}>First Name:</Text>
          <CommonFloatingInput
            labelText={"First Name"}
            moveText={firstNameRed}
            inputStyle={{ color: COLORS.black, fontWeight: "600" }}
            value={firstName}
            onChangeText={(text) => {
              setFirstName(text);
              setFirstNameError("");
            }}
            errorText={firstNameError}
            labelTextStyle={{ color: COLORS.gray500 }}
            placeholder={""}
          />
        </View>
        <View style={styles.wrapper}>
          <Text style={styles.heading}>Last Name:</Text>
          <CommonFloatingInput
            labelText={"Last Name"}
            moveText={lastNameRef}
            inputStyle={{ color: COLORS.black, fontWeight: "600" }}
            value={lastName}
            onChangeText={(text) => {
              setLastname(text);
              setLastNameError("")
            }}
            errorText={lastNameError}
            labelTextStyle={{ color: COLORS.gray500 }}
            placeholder={""}
          />
        </View>
        {/* <View style={styles.wrapper}>
          <Text style={styles.heading}>desc:</Text>
          <CommonFloatingInput
            labelText={"UserName"}
            moveText={emailRef}
            inputStyle={{ color: COLORS.black, fontWeight: "600" }}
            value={profileDetails?.name}
            onChangeText={(text) => { }}
            errorText={emailError}
            editable={false}
            labelTextStyle={{ color: COLORS.gray500 }}
            placeholder={""}
          />
        </View> */}
      </View>
      <ListItem
        Component={TouchableScale}
        onPress={() => {
          editProfile();
        }}
        style={{
          borderRadius: 10,
          overflow: "hidden",
          marginHorizontal: 16,
        }}
        containerStyle={{ backgroundColor: COLORS.primary }}
      >
        <ListItem.Content
          style={{ alignItems: "center", marginHorizontal: 16 }}
        >
          <ListItem.Title style={{ color: COLORS.white, fontWeight: "bold" }}>
            {isLoading ? <ActivityIndicator color={"#fff"} /> : 'Update'}
          </ListItem.Title>
        </ListItem.Content>
      </ListItem>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  wrapper: { marginTop: 16 },
  heading: {
    fontWeight: "600",
    fontSize: 16,
    color: COLORS.primary,
    marginBottom: 8,
  },
  text: { marginTop: 8, fontSize: 20, color: COLORS.black },
});
