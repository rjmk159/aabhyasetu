/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useContext, useEffect, useState } from "react";

import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  Modal,
  useColorScheme,
  View,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";

import { Colors } from "react-native/Libraries/NewAppScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { ListItem } from "@rneui/themed";
import TouchableScale from "react-native-touchable-scale"; // https://github.com/kohver/react-native-touchable-scale
import { screens } from "../constants/screens";
import { COLORS } from "../theme/colors";
import { AuthContext } from "../utils/AuthContext";
import { doLogout, setMyProfile } from "../reducers/app.reducers";
import CommonButton from "../components/CommonButton";
import { deleteProfileHandler } from "../utils/api";
import { getProfileAuth, getProfileDetails } from "../reducers/selectors";

const SettingsScreen = () => {
  const isDarkMode = useColorScheme() === "dark";
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const profileDetails = useSelector(getProfileDetails);
  const profileAuth = useSelector(getProfileAuth);
  const [isLoading, setIsLoading] = useState(false);


  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
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
    {
      name: "Delete my account",
      modal: 'deleteModal',
      highlight: true,
    },
  ];
  const renderItem = ({ item }) => {
    return (
      !item.modal ? <ListItem
        onPress={() => handlePress(item.link)}
        style={[styles.listItem]}
        bottomDivider
      >
        <ListItem.Content>
          <ListItem.Title style={{ color: "#000", fontWeight: "bold" }}>
            {item.name}
          </ListItem.Title>
          {item.desc ? <ListItem.Subtitle style={{ color: "#000" }}>
            {item.desc}
          </ListItem.Subtitle> : null}
        </ListItem.Content>
        {item.link ? <ListItem.Chevron color="#000" /> : null}
      </ListItem> :
        <ListItem
          Component={TouchableScale}
          onPress={toggleModal}
          style={styles.highlight}
          containerStyle={{ backgroundColor: COLORS.gray100 }}
        >
          <ListItem.Content
          // style={{ alignItems: "center" }}
          >
            <ListItem.Title style={{ color: COLORS.primary, fontWeight: "bold", flexDirection: 'row', justifyContent: 'center' }}>
              <Ionicons name={'trash'} size={18} color={COLORS.primary} /> {item.name}
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
    );
  };
  const handleSignOut = () => {
    dispatch(doLogout())
  }
  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const res = await deleteProfileHandler({ id: profileDetails.id }, profileAuth.token)
      if (res.success) {
        handleSignOut();
        ToastAndroid.showWithGravity(res?.message, ToastAndroid.LONG, ToastAndroid.TOP);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      ToastAndroid.showWithGravity(error?.message, ToastAndroid.LONG, ToastAndroid.TOP);
    }

  }
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
        <ListItem
          Component={TouchableScale}
          onPress={handleSignOut}
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
              Log out
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </View>
      {/* Modal code */}

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          onRequestClose={toggleModal}
        >

          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={{ color: COLORS.primary, fontSize: 20, textAlign: 'center', marginBottom: 10 }}>Are you sure you want to delete your account ?</Text>
              <Text style={{ color: COLORS.black, fontSize: 12, textAlign: 'center', marginBottom: 20 }}>All account details including your payment details will be deleted, you won't be able to recover anything and you will be logged out from the account</Text>
              <View style={{ flexDirection: 'row' }}>
                <CommonButton wrapperStyle={styles.cancelbutton} title={"Cancel"} textStyle={{ color: "#fff", padding: 0 }} onPress={toggleModal} />
                <CommonButton wrapperStyle={styles.deleteButton} textStyle={{ color: "#000", padding: 0 }} title={'Delete'} onPress={handleDelete} isLoading={isLoading}/>
              </View>
            </View>
          </View>
        </Modal>


    </SafeAreaProvider >
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fefefe",
  },
  listItem: { margin: 10, borderRadius: 10, overflow: "hidden" },
  highlight: {
    width: 200,
    padding: 0,
    marginLeft: 16,
    borderRadius: 10,
    overflow: 'hidden'
  },
  sectionDescription: {
    marginTop: 2,
    fontSize: 18,
    fontWeight: "400",
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Android only
    shadowColor: '#000',
    maxWidth: '80%',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  cancelbutton: { width: 100, height: 25, margin: 10,backgroundColor:COLORS.primary },
  deleteButton: { width: 100, backgroundColor: '#ececec', height: 25, margin: 10 }



});

export default SettingsScreen;
