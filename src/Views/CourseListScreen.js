import { useNavigation } from "@react-navigation/native";
import { Block, Text } from "galio-framework";
import React, { useEffect, useRef } from "react";
import { ActivityIndicator } from "react-native";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import CourseCard from "../components/cards";
import { screens } from "../constants/screens";
import { fetchCoursesList, setCurrentCourse } from "../reducers/app.reducers";
import { getCourses, getIsLoading } from "../reducers/selectors";
import Lottie from "lottie-react-native";
const { width } = Dimensions.get("screen");

const CourseListScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const courses = useSelector(getCourses);
  const isLoading = useSelector(getIsLoading);
  const animationref = useRef();

  const onPress = (item) => {
    dispatch(setCurrentCourse(item));
    navigation.navigate(screens.COURSE_DETAILS);
  };

  const renderItem = ({ item }) => {
    return <CourseCard course={item} horizontal onPress={onPress} />;
  };

  useEffect(() => {
    dispatch(fetchCoursesList());
  }, []);

  return (
    <Block flex style={styles.container}>
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator />
        </View>
      ) : courses.length ? (
        <FlatList
          scrollEnabled
          data={courses}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <View style={{ flex: 1 }}>
          <Lottie source={require("../assets/JSON/empty.json")} />
        </View>
      )}
    </Block>
  );
};

const styles = StyleSheet.create({
  emptyList: {
    padding: 20,
  },
  container: {
    margin: 20,
  },
});

export default CourseListScreen;
