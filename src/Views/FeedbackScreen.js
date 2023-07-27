import {
  Alert,
  Animated,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { COLORS } from "../theme/colors";
import { CommonFloatingInput } from "../components/CommonFloatingInput";
import { ListItem } from "react-native-elements";
import TouchableScale from "react-native-touchable-scale";
import Lottie from "lottie-react-native";
import { submitFeedback } from "../utils/api";
import { useNavigation } from "@react-navigation/native";

const FeedbackScreen = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [subject, setSubject] = useState("");
  const [subjectError, setSubjectError] = useState("");
  const [feedback, setFeedback] = useState("");
  const [feedbackError, setFeedbackError] = useState("");

  const emailRef = React.useRef(new Animated.Value(0)).current;
  const nameRef = React.useRef(new Animated.Value(0)).current;
  const subjectRef = React.useRef(new Animated.Value(0)).current;
  const feedbackRef = React.useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const animationRef = useRef();

  useEffect(() => {
    animationRef.current?.play();
  }, []);

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
    if (subject?.length == 0) {
      setSubjectError("Please enter subject number");
      phoneError1 = "Please enter Password";
    }
    if (feedback?.length == 0) {
      setFeedbackError("Please enter feedback");
      feedbackError1 = "Please enter Password";
    }

    if (
      email?.length !== 0 &&
      name?.length !== 0 &&
      subject?.length !== 0 &&
      feedback?.length !== 0
    ) {
      let dataToSend = {
        name,
        email,
        subject,
        feedback,
      };
      submitFeedback(dataToSend)
        .then((res) => {
          if (res.status === "mail_sent") {
            navigation.goBack();
          }
        })
        .catch((err) => {
          Alert.alert(err.message);
        });
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
      style={{ padding: 16 }}
    >
      <View style={{ flex: 1, padding: 16, backgroundColor: COLORS.white }}>
        <Text style={styles.loginText}>Add your feedback here!!</Text>
        <Lottie
          ref={animationRef}
          source={require("../assets/JSON/feedback.json")}
          style={{ opacity: 0.7 }}
        />
        <View style={{ flex: 1 }}>
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
            wrapperStyle={{ marginTop: 16 }}
          />
          <CommonFloatingInput
            labelText={"Email"}
            moveText={emailRef}
            inputStyle={{ color: COLORS.black, fontWeight: "600" }}
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
            labelText={"Subject"}
            moveText={subjectRef}
            inputStyle={{ color: COLORS.black, fontWeight: "600" }}
            value={subject}
            onChangeText={(text) => {
              setSubject(text);
              setSubjectError("");
            }}
            errorText={subjectError}
            labelTextStyle={{ color: COLORS.gray500 }}
            placeholder={""}
            wrapperStyle={{ marginTop: 16 }}
          />
          <CommonFloatingInput
            labelText={"Feedback"}
            moveText={feedbackRef}
            inputStyle={{ color: COLORS.black, fontWeight: "600" }}
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
        </View>
        <ListItem
          Component={TouchableScale}
          onPress={feedBackHandler}
          style={{
            margin: 16,
            borderRadius: 10,
            overflow: "hidden",
          }}
          containerStyle={{ backgroundColor: COLORS.one_01_coral }}
        >
          <ListItem.Content style={{ alignItems: "center" }}>
            <ListItem.Title style={{ color: COLORS.white, fontWeight: "bold" }}>
              Send Feedback
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </View>
    </TouchableWithoutFeedback>
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
