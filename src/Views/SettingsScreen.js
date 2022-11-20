/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from "react";

import {
  FlatList,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";

import { Colors } from "react-native/Libraries/NewAppScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSubjects,
  setGrade,
  setLanguage,
  setSelectedSubject,
} from "../reducers/app.reducers";
import { getSubjectsList } from "../reducers/selectors";
import { useNavigation } from "@react-navigation/native";
import { ListItem } from "@rneui/themed";
import Ionicons from "react-native-vector-icons/Ionicons";

import { screens } from "../constants/screens";
import { Block, Button, Text, theme } from "galio-framework";
import { materialTheme } from "../constants";
import TouchableScale from "react-native-touchable-scale";

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

  const [lngState, setStateLanguage] = useState("english");
  const [gradeState, setStateGrade] = useState("11");

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

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

  const renderItem = ({ item }) => {
    const isSelected = item.id === "language" ? lngState : gradeState;
    console.log(isSelected, item);
    return (
      <ListItem
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
          name={isSelected === item.title ? "ellipse" : "ellipse-outline"}
          size={28}
          color={materialTheme.COLORS.BUTTON_COLOR}
        />
      </ListItem>
    );
  };
  return (
    <SafeAreaProvider style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />

      <View
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.settings}
      >
        <FlatList
          data={languagesList}
          keyExtractor={(item, index) => item.title}
          renderItem={renderItem}
          ListHeaderComponent={
            <Block style={styles.title}>
              <Text
                bold
                center
                size={theme.SIZES.BASE}
                style={{ paddingBottom: 5 }}
              >
                Language Settings
              </Text>
              <Text center muted size={12}>
                Select language
              </Text>
            </Block>
          }
        />
        <Block style={styles.title}>
          <Text
            bold
            center
            size={theme.SIZES.BASE}
            style={{ paddingBottom: 5 }}
          >
            Set Grade
          </Text>
          <Text center muted size={12}>
            Select the grade/class and only related courses will be shown
          </Text>
        </Block>
        <FlatList
          data={gradesList}
          keyExtractor={(item, index) => item.title}
          renderItem={renderItem}
        />
        <Block center>
          <Button
            shadowless
            color={materialTheme.COLORS.BUTTON_COLOR}
            onPress={() => {}}
            style={styles.createButton}
          >
            <Text size={14} color={materialTheme.COLORS.WHITE}>
              Submit
            </Text>
          </Button>
        </Block>
      </View>
    </SafeAreaProvider>
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
