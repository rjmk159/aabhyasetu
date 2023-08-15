/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from "react";

import {
  ScrollView,
  StatusBar,
  StyleSheet,
  ToastAndroid,
  useColorScheme,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { ListItem } from "@rneui/themed";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { setGrade, setLanguage } from "../reducers/app.reducers";

import { Block, Button, Text, theme } from "galio-framework";
import TouchableScale from "react-native-touchable-scale";
import { materialTheme } from "../constants";
import { COLORS } from "../theme/colors";
import { getProfileAuth, getProfileDetails, getProfileSettings } from "../reducers/selectors";
import { screens } from "../constants/screens";
import { ActivityIndicator } from "react-native";
import { updateUserMeta } from "../utils/api";

const languagesList = [
  { title: "english", id: "language", type: "switch" },
  { title: "marathi", id: "language", type: "switch" },
];

const gradesList = [
  { title: "11", id: "class", type: "switch" },
  { title: "12", id: "class", type: "switch" },
];

const mapToString = {
  english: "English",
  marathi: "Marathi",
  11: "11th",
  12: "12th",
};
const SettingsScreen = () => {
  const isDarkMode = useColorScheme() === "dark";

  const settings = useSelector(getProfileSettings);
  const profileDetails = useSelector(getProfileDetails);
  const profileAuth = useSelector(getProfileAuth);

  const [flag, setFlag] = useState(false);
  const [lngState, setStateLanguage] = useState(settings.language);
  const [gradeState, setStateGrade] = useState(settings.class);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handlePress = (type, title) => {
    if (type === "language") {
      setStateLanguage(title);
    } else {
      setStateGrade(title);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const data = {
      class: gradeState,
      language: lngState,
      ID: Number(profileDetails.id)
    }
    try {
      const res =  await updateUserMeta(data, profileAuth.token);
      setIsLoading(false);
      console.log(res)
    if(res.success){
      dispatch(setGrade(data.class));
      dispatch(setLanguage(data.language));

      navigation.reset({
        index: 0,
        routes: [{ name: 'eLearning' }], // Replace with your initial route name
      });
    } else {
      setStateGrade(settings.class);
      setStateLanguage(settings.language)
    }
      ToastAndroid.showWithGravity(res?.message, ToastAndroid.LONG, ToastAndroid.TOP);

    } catch (error) {
      console.log(error)
      setIsLoading(false);
      ToastAndroid.showWithGravity(error?.message, ToastAndroid.LONG, ToastAndroid.TOP,);
      // reverting values if not updated
      setStateGrade(settings.class);
      setStateLanguage(settings.language)
    }

  }
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 30 }}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />

      <Block style={styles.title}>
        <Text bold center size={theme.SIZES.BASE} style={{ paddingBottom: 5 }}>
          Language Settings
        </Text>
        <Text center muted size={12}>
          Select language
        </Text>
      </Block>
      {languagesList?.map((item, index) => {
        return (
          <ListItem
            key={index}
            Component={TouchableScale}
            onPress={() => handlePress(item.id, item.title)}
            style={styles.listItem}
            bottomDivider
          >
            <ListItem.Content>
              <ListItem.Title style={{ color: "#000", fontWeight: "bold" }}>
                {mapToString[item.title]}
              </ListItem.Title>
            </ListItem.Content>
            <Ionicons
              name={
                (item.id === "language" ? lngState : gradeState) === item.title
                  ? "ellipse"
                  : "ellipse-outline"
              }
              size={28}
              color={COLORS.primary}
            />
          </ListItem>
        );
      })}
      <Block style={styles.title}>
        <Text bold center size={theme.SIZES.BASE} style={{ paddingBottom: 5 }}>
          Set Grade
        </Text>
        <Text center muted size={12}>
          Select the grade/class and only related courses will be shown
        </Text>
      </Block>
      {gradesList?.map((item, index) => {
        return (
          <ListItem
            key={index}
            Component={TouchableScale}
            onPress={() => handlePress(item.id, item.title)}
            style={styles.listItem}
            bottomDivider
          >
            <ListItem.Content>
              <ListItem.Title style={{ color: "#000", fontWeight: "bold" }}>
                {mapToString[item.title]}
              </ListItem.Title>
            </ListItem.Content>
            <Ionicons
              name={
                (item.id === "language" ? lngState : gradeState) === item.title
                  ? "ellipse"
                  : "ellipse-outline"
              }
              size={28}
              color={COLORS.primary}
            />
          </ListItem>
        );
      })}
      <Block center>
        <Button
          shadowless
          color={COLORS.primary}
          onPress={
            handleSubmit

          }
        >
          <Text size={14} color={materialTheme.COLORS.WHITE}>
            {isLoading ? <ActivityIndicator color={'#fff'} /> : 'Submit'}
          </Text>
        </Button>
      </Block>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fefefe",
  },
  listItem: { margin: 10, borderRadius: 10, overflow: "hidden" },
  sectionDescription: {
    marginTop: 2,
    fontSize: 18,
    fontWeight: "400",
  },
  title: {
    margin: 20,
  },
});

export default SettingsScreen;
