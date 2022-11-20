import {
  View,
  Text,
  StyleSheet,
  Animated,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { EyeClose, EyeOpen } from "../assets/Icons";
import { COLORS } from "../theme/colors";

export const CommonFloatingInput = (props) => {
  const {
    value,
    labelText,
    moveText,
    onChangeText,
    labelTextStyle,
    inputStyle,
    labelStyle,
    placeholder,
    onSubmitEditing,
    inputRef,
    returnKeyType,
    errorText,
    showIcon,
    secureTextEntry,
    wrapperStyle,
    keyboardType,
    editable,
    maxLength,
  } = props;

  const [isShow, setIsShow] = useState(secureTextEntry);

  React.useEffect(() => {
    if (value !== "") {
      moveTextTop();
    }
  }, [value]);

  const moveTextTop = () => {
    Animated.timing(moveText, {
      toValue: 0.8,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const moveTextBottom = () => {
    Animated.timing(moveText, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };
  const onBlur = () => {
    if (value.length === 0) {
      moveTextBottom();
    }
  };

  const onFocusHandler = () => {
    moveTextTop();
  };
  return (
    <>
      <View
        style={[
          styles.container,
          wrapperStyle,
          { borderColor: errorText ? COLORS?.redEF374E : COLORS.gray100 },
        ]}
      >
        <Animated.View
          style={[
            styles.animatedStyle,
            labelStyle,
            {
              transform: [
                {
                  translateY: moveText.interpolate({
                    inputRange: [0, 1],
                    outputRange: [4, -10],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={[styles.label, labelTextStyle]}>{labelText}</Text>
        </Animated.View>
        <TextInput
          maxLength={maxLength}
          autoCapitalize="none"
          style={[styles.input, inputStyle]}
          value={value}
          onChangeText={onChangeText}
          editable={editable}
          onFocus={onFocusHandler}
          onBlur={onBlur}
          ref={inputRef}
          placeholder={placeholder}
          placeholderTextColor={COLORS.gray500}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          keyboardType={keyboardType}
          secureTextEntry={isShow || false}
        />
        {showIcon && (
          <TouchableOpacity
            style={styles.value}
            activeOpacity={0.8}
            onPress={() => setIsShow(!isShow)}
          >
            {isShow ? <EyeClose /> : <EyeOpen />}
          </TouchableOpacity>
        )}
      </View>
      {errorText ? <Text style={[styles.errorText]}>{errorText}</Text> : null}
    </>
  );
};
const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
  },
  container: {
    width: "100%",
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 6,
    height: 58,
    paddingLeft: 12,
    paddingRight: 15,
  },
  input: {
    width: "100%",
    fontSize: 17,
    //fontWeight:'400%',
    color: COLORS.gray500,
    flex: 1,
    top: 10,
    left: Platform.OS === "android" ? "1%" : "5%",
  },
  label: {
    color: "#000",
  },
  animatedStyle: {
    height: 20,
    left: 15,
    top: 15,
    position: "absolute",
  },
  errorText: {
    marginTop: 3,
    color: COLORS.redEF374E,
    textAlign: "left",
  },
  value: {
    padding: 5,
    alignSelf: "center",
  },
});
