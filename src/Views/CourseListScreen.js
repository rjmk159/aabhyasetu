import { useNavigation } from "@react-navigation/native";
import { Block, Text } from "galio-framework";
import React, { useEffect } from "react";
import { Dimensions, FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import CourseCard from "../components/cards";
import { screens } from "../constants/screens";
import { fetchCoursesList, setCurrentCourse } from "../reducers/app.reducers";
import { getCourses } from "../reducers/selectors";
const { width } = Dimensions.get("screen");

const CourseListScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const courses = useSelector(getCourses);

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
      <FlatList
        scrollEnabled
        data={courses}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyList}>Nothing to Show here!</Text>
        }
      />
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
