import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import { COLORS } from "../theme/colors";
import { getProfile } from "../reducers/selectors";
import { useSelector } from "react-redux";
import Lottie from "lottie-react-native";

const ProfileView = () => {
  const profileDetails = useSelector(getProfile);
  const animationRef = useRef();

  useEffect(() => {
    animationRef.current?.play();
  }, []);

  return (
    <View style={styles.main}>
      <Lottie
        source={require("../assets/JSON/profile.json")}
        ref={animationRef}
        style={{ opacity: 0.5 }}
      />
      <View style={styles.wrapper}>
        <Text style={styles.heading}>Name:</Text>
        <Text style={styles.text}>{profileDetails?.result?.name}</Text>
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.heading}>Email:</Text>
        <Text style={styles.text}>{profileDetails?.res?.user_email}</Text>
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.heading}>Username:</Text>
        <Text style={styles.text}>{profileDetails?.result?.slug}</Text>
      </View>
      {profileDetails?.res?.description && (
        <View style={styles.wrapper}>
          <Text style={styles.heading}>Description:</Text>
          <Text style={styles.text}>{profileDetails?.res?.description}</Text>
        </View>
      )}
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
