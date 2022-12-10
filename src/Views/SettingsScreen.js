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
import { getSelectedGrade, getSelectedLanguage } from "../reducers/selectors";

const languagesList = [
  { title: "english", id: "language", type: "switch" },
  { title: "marathi", id: "language", type: "switch" },
];

const gradesList = [
  { title: "11", id: "grade", type: "switch" },
  { title: "12", id: "grade", type: "switch" },
];

const mapToString = {
  english: "English",
  marathi: "Marathi",
  11: "11th",
  12: "12th",
};
const SettingsScreen = () => {
  const isDarkMode = useColorScheme() === "dark";

  const grade = useSelector(getSelectedGrade);
  const language = useSelector(getSelectedLanguage);
  const [lngState, setStateLanguage] = useState(language);
  const [gradeState, setStateGrade] = useState(grade);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handlePress = (type, title) => {
    // dispatch(setSelectedSubject(id));
    // navigation.navigate(screens.COURSE_LIST);
    if (type === "language") {
      setStateLanguage(title);
      dispatch(setLanguage(title));
    } else {
      setStateGrade(title);
      dispatch(setGrade(title));
    }
  };

  // const getDetailsAndNavigate = async () => {
  //   const lng = 'english';
  //   const grd = '11';
  //   setStateLanguage(lng);
  //   setStateGrade(grd);
  // };
  useEffect(() => {
    // getDetailsAndNavigate();
  }, []);

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
              color={COLORS.one_01_coral}
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
              color={COLORS.one_01_coral}
            />
          </ListItem>
        );
      })}
      <Block center>
        <Button
          shadowless
          color={COLORS.one_01_coral}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text size={14} color={materialTheme.COLORS.WHITE}>
            Submit
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
