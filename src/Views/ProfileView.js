import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../theme/colors";
import { getProfileDetails, getProfileSettings } from "../reducers/selectors";
import { useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { screens } from "../constants/screens";


const ProfileView = () => {
  const profileDetails = useSelector(getProfileDetails);
  const profileSettings = useSelector(getProfileSettings);
  const navigation = useNavigation();
  const handleProfileOnPress = () => {
    navigation.navigate(screens.PROFILE_EDIT)
  }



  return (
    <View style={styles.main}>

      <TouchableOpacity onPress={handleProfileOnPress} style={styles.profileStyleIconContainer}>
        <View style={styles.profileStyleIcon}>
          <Ionicons name={"account-edit"} size={30} color={"red"} />
        </View>
      </TouchableOpacity>

      <View style={styles.wrapper}>
        <Text style={styles.heading}>Name:</Text>
        <Text style={styles.text}>{profileDetails?.name}</Text>
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.heading}>Email:</Text>
        <Text style={styles.text}>{profileDetails?.email}</Text>
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.heading}>Id:</Text>
        <Text style={[styles.text, styles.textHighlighted]}>{profileDetails?.id}</Text>
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.heading}>Class/Grade:</Text>
        <Text style={styles.text}>{profileSettings?.class}th</Text>
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.heading}>Language:</Text>
        <Text style={[styles.text, {textTransform:'capitalize'}]}>{profileSettings?.language}</Text>
      </View>
    </View>
  );
};

export default ProfileView;

const styles = StyleSheet.create({
  main: { flex: 1, padding: 16, backgroundColor: COLORS.white },
  wrapper: { marginTop: 16, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ececec', paddingBottom: 10 },
  heading: {
    fontWeight: "bold",
    fontSize: 16,
    color: COLORS.primary,
    marginRight: 10
  },
  text: { marginTop: 4, fontSize: 16, color: COLORS.black },
  profileStyleIconContainer: {
    flexDirection: 'column',
    alignItems: 'center'

  },
  textHighlighted:{backgroundColor:'#ececec', padding: 2, width: 30, textAlign:'center', borderRadius: 10, fontWeight:'bold', fontSize: 12},
  profileStyleIcon: {
    backgroundColor: '#ececec',
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderRadius: 6,
    overflow: 'hidden'
  },

});
