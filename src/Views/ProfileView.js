import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../theme/colors";
import { getProfile } from "../reducers/selectors";
import { useSelector } from "react-redux";

const ProfileView = () => {
  const profileDetails = useSelector(getProfile);

  return (
    <View style={styles.main}>
      <View style={styles.wrapper}>
        <Text style={styles.heading}>Name:</Text>
        <Text style={styles.text}>{profileDetails?.user_display_name}</Text>
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.heading}>Email:</Text>
        <Text style={styles.text}>{profileDetails?.user_email}</Text>
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.heading}>Username:</Text>
        <Text style={styles.text}>{profileDetails?.user_nicename}</Text>
      </View>
    </View>
  );
};

export default ProfileView;

const styles = StyleSheet.create({
  main: { flex: 1, padding: 16, backgroundColor: COLORS.white },
  wrapper: { marginTop: 16 },
  heading: {
    fontWeight: "bold",
    fontSize: 25,
    color: COLORS.one_01_coral,
  },
  text: { marginTop: 8, fontSize: 20, color: COLORS.black },
});
