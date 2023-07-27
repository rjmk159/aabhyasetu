import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../theme/colors";

function CommonButton(props) {
  const {
    onPress,
    wrapperStyle,
    title,
    textStyle,
    isLoading,
    disable,
    buttonDisplay,
  } = props;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        style.container,
        wrapperStyle,
        disable && { opacity: 0.7 },
        buttonDisplay && { opacity: 0.5 },
      ]}
      onPress={onPress}
      disabled={disable}
    >
      {isLoading ? (
        <ActivityIndicator color={COLORS.gray25} size={"small"} />
      ) : (
        <Text style={[textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

export default CommonButton;

const style = StyleSheet.create({
  container: {
    backgroundColor: COLORS.one_01_coral,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    width: "100%",
  },
  text: {
    color: COLORS.gray25,
    fontSize: 17,
    fontWeight: "600",
  },
});
