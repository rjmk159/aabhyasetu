import { Animated, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { COLORS } from "../theme/colors";
import { useSelector } from "react-redux";
import { getProfile } from "../reducers/selectors";
import { CommonFloatingInput } from "../components/CommonFloatingInput";
import Lottie from "lottie-react-native";
import { ListItem } from "react-native-elements";
import TouchableScale from "react-native-touchable-scale";
import { editProfileHandler } from "../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const EditProfile = () => {
  const profileDetails = useSelector(getProfile);
  const [email, setEmail] = useState(profileDetails?.res?.user_email);
  const [emailError, setEmailError] = useState("");
  const [name, setName] = useState(profileDetails?.res?.user_display_name);
  const [nameError, setNameError] = useState("");
  const [description, setDescription] = useState(
    profileDetails?.result?.description
  );

  const emailRef = React.useRef(new Animated.Value(0)).current;
  const nameRef = React.useRef(new Animated.Value(0)).current;
  const descriptionRef = React.useRef(new Animated.Value(0)).current;
  const animationRef = useRef();

  useEffect(() => {
    animationRef.current?.play();
  }, []);

  const editProfile = async () => {
    let dataToSend = {
      email,
      name,
      description,
      id: profileDetails?.result?.id,
    };

    editProfileHandler(dataToSend)
      .then((res) => {
        console.log("asda", JSON.stringify(res));
      })
      .catch((err) => {
        console.log("err", JSON.stringify(err));
      });
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: COLORS.white }}>
      <Lottie
        source={require("../assets/JSON/card.json")}
        ref={animationRef}
        style={{
          opacity: 0.5,
          marginHorizontal: 24,
        }}
      />
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
        <View style={styles.wrapper}>
          <Text style={styles.heading}>Name:</Text>
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
        </View>
        <View style={styles.wrapper}>
          <Text style={styles.heading}>Description:</Text>
          <CommonFloatingInput
            labelText={"Description"}
            moveText={descriptionRef}
            inputStyle={{ color: COLORS.black, fontWeight: "600" }}
            value={description}
            onChangeText={(text) => {
              setDescription(text);
            }}
            errorText={""}
            labelTextStyle={{ color: COLORS.gray500 }}
            placeholder={""}
          />
        </View>
        <View style={styles.wrapper}>
          <Text style={styles.heading}>Username:</Text>
          <CommonFloatingInput
            labelText={"UserName"}
            moveText={emailRef}
            inputStyle={{ color: COLORS.black, fontWeight: "600" }}
            value={profileDetails?.res?.user_nicename}
            onChangeText={(text) => {}}
            errorText={emailError}
            editable={false}
            labelTextStyle={{ color: COLORS.gray500 }}
            placeholder={""}
          />
        </View>
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
        containerStyle={{ backgroundColor: COLORS.one_01_coral }}
      >
        <ListItem.Content
          style={{ alignItems: "center", marginHorizontal: 16 }}
        >
          <ListItem.Title style={{ color: COLORS.white, fontWeight: "bold" }}>
            Save
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
    color: COLORS.one_01_coral,
    marginBottom: 8,
  },
  text: { marginTop: 8, fontSize: 20, color: COLORS.black },
});
