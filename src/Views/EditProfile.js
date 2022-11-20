import { Animated, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { COLORS } from "../theme/colors";
import { useSelector } from "react-redux";
import { getProfile } from "../reducers/selectors";
import { CommonFloatingInput } from "../components/CommonFloatingInput";

const EditProfile = () => {
  const profileDetails = useSelector(getProfile);
  const [email, setEmail] = useState(profileDetails?.user_email);
  const [emailError, setEmailError] = useState("");
  const [name, setName] = useState(profileDetails?.user_display_name);
  const [nameError, setNameError] = useState("");

  const emailRef = React.useRef(new Animated.Value(0)).current;
  const nameRef = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white, padding: 16 }}>
      <View style={styles.wrapper}>
        <Text style={styles.heading}>Name:</Text>
        <CommonFloatingInput
          labelText={"Email"}
          moveText={emailRef}
          inputStyle={{ color: COLORS.black }}
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
        <Text style={styles.heading}>Email:</Text>
        <CommonFloatingInput
          labelText={"Name"}
          moveText={nameRef}
          inputStyle={{ color: COLORS.black }}
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
        <Text style={styles.heading}>Username:</Text>
        <CommonFloatingInput
          labelText={"UserName"}
          moveText={emailRef}
          inputStyle={{ color: COLORS.black }}
          value={profileDetails?.user_nicename}
          onChangeText={(text) => {}}
          errorText={emailError}
          labelTextStyle={{ color: COLORS.gray500 }}
          placeholder={""}
        />
      </View>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  wrapper: { marginTop: 16 },
  heading: {
    fontWeight: "600",
    fontSize: 22,
    color: COLORS.one_01_coral,
    marginBottom: 8,
  },
  text: { marginTop: 8, fontSize: 20, color: COLORS.black },
});
