import {
  Alert,
  Animated,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { COLORS } from "../theme/colors";
import { CommonFloatingInput } from "../components/CommonFloatingInput";

const FeedbackScreen = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [feedback, setFeedback] = useState("");
  const [feedbackError, setFeedbackError] = useState("");

  const emailRef = React.useRef(new Animated.Value(0)).current;
  const nameRef = React.useRef(new Animated.Value(0)).current;
  const phoneRef = React.useRef(new Animated.Value(0)).current;
  const feedbackRef = React.useRef(new Animated.Value(0)).current;

  const feedBackHandler = () => {
    Keyboard.dismiss();
    let emailError1 = "";
    let nameError1 = "";
    let phoneError1 = "";
    let feedbackError1 = "";
    if (email?.length == 0) {
      setEmailError("Please enter email address");
      emailError1 = "Please enter email address";
    }
    if (name?.length == 0) {
      setNameError("Please enter name");
      nameError1 = "Please enter Password";
    }
    if (phone?.length == 0) {
      setPhoneError("Please enter phone number");
      phoneError1 = "Please enter Password";
    }
    if (feedback?.length == 0) {
      setFeedbackError("Please enter feedback");
      feedbackError1 = "Please enter Password";
    }

    if (
      email?.length !== 0 &&
      name?.length !== 0 &&
      phone?.length !== 0 &&
      feedback?.length !== 0
    ) {
      Alert.alert("Success");
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={styles.loginText}>Add your feedback here!!</Text>
      <CommonFloatingInput
        labelText={"Name"}
        moveText={nameRef}
        inputStyle={{ color: COLORS.black }}
        value={email}
        onChangeText={(text) => {
          setName(text);
          setNameError("");
        }}
        errorText={nameError}
        labelTextStyle={{ color: COLORS.gray500 }}
        placeholder={""}
        wrapperStyle={{ marginTop: 16 }}
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
        placeholder={""}
        wrapperStyle={{ marginTop: 16 }}
      />
      <CommonFloatingInput
        labelText={"Phone"}
        moveText={phoneRef}
        inputStyle={{ color: COLORS.black }}
        value={phone}
        onChangeText={(text) => {
          setPhone(text);
          setPhoneError("");
        }}
        keyboardType={"number-pad"}
        errorText={phoneError}
        labelTextStyle={{ color: COLORS.gray500 }}
        placeholder={""}
        wrapperStyle={{ marginTop: 16 }}
      />
      <CommonFloatingInput
        labelText={"Feedback"}
        moveText={feedbackRef}
        inputStyle={{ color: COLORS.black }}
        value={feedback}
        onChangeText={(text) => {
          setFeedback(text);
          setFeedbackError("");
        }}
        errorText={feedbackError}
        labelTextStyle={{ color: COLORS.gray500 }}
        placeholder={""}
        wrapperStyle={{ marginTop: 16 }}
      />
      <TouchableOpacity
        style={{
          padding: 16,
          backgroundColor: COLORS.one_01_coral,
          alignSelf: "center",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 8,
          marginTop: 16,
        }}
        onPress={feedBackHandler}
      >
        <Text style={{ color: COLORS.white }}>Send Feedback</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FeedbackScreen;

const styles = StyleSheet.create({
  loginText: {
    color: COLORS.one_01_coral,
    fontSize: 20,
    fontWeight: "600",
  },
});
