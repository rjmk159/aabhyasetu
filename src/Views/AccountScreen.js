/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from "react";

import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

import { Colors } from "react-native/Libraries/NewAppScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubjects, setSelectedSubject } from "../reducers/app.reducers";
import { getSubjectsList } from "../reducers/selectors";
import { useNavigation } from "@react-navigation/native";
import { ListItem } from "@rneui/themed";
import TouchableScale from "react-native-touchable-scale"; // https://github.com/kohver/react-native-touchable-scale
import LinearGradient from "react-native-linear-gradient"; // Only if no expo
import { screens } from "../constants/screens";

const SettingsScreen = () => {
  const isDarkMode = useColorScheme() === "dark";
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const handlePress = (link) => {
    navigation.navigate(link);
  };

  const LIST = [
    {
      name: "Profile",
      link: screens.PROFILE,
      desc: "your details",
    },
    {
      name: "Edit Profile",
      link: screens.PROFILE_EDIT,
      desc: "Modify your details",
    },
    {
      name: "Settings",
      link: screens.SETTINGS,
      desc: "Change language and class",
    },
    {
      name: "Feedback",
      link: screens.FEEDBACK,
      desc: "Add your feedback",
    },
  ];
  const renderItem = ({ item }) => {
    return (
      <ListItem
        onPress={() => handlePress(item.link)}
        style={styles.listItem}
        bottomDivider
      >
        <ListItem.Content>
          <ListItem.Title style={{ color: "#000", fontWeight: "bold" }}>
            {item.name}
          </ListItem.Title>
          <ListItem.Subtitle style={{ color: "#000" }}>
            {item.desc}
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron color="#000" />
      </ListItem>
    );
  };
  return (
    <SafeAreaProvider style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />

      <View style={styles.sectionContainer}>
        <FlatList
          scrollEnabled
          data={LIST}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
        />
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
  highlight: {
    fontWeight: "700",
  },
});

export default SettingsScreen;
