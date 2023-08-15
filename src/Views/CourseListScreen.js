import { useNavigation } from "@react-navigation/native";
import { Block, Text } from "galio-framework";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator } from "react-native";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import CourseCard from "../components/cards";
import { screens } from "../constants/screens";
import { fetchCoursesList, setSelectedCourse } from "../reducers/app.reducers";
import { getCoursePage, getCoursesList } from "../reducers/selectors";
import Lottie from "lottie-react-native";
import CourseLoader from "../components/Loaders/CourseLoader";
const { width } = Dimensions.get("screen");

const CourseListScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const courses = useSelector(getCoursesList);
  const [isFooterLoading, setIsFooterLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const currentCoursePage = useSelector(getCoursePage);
  const animationref = useRef();

  const onPress = (item) => {
    dispatch(setSelectedCourse(item));
    navigation.navigate(screens.COURSE_DETAILS);
  };

  const handleLoadMore = async () => {
    setIsFooterLoading(true);
    await dispatch(fetchCoursesList(currentCoursePage))
    setIsFooterLoading(false);
  }


  const getCourseList = async (page = 1) => {
    setIsLoading(true);
    await dispatch(fetchCoursesList(page));
    setIsLoading(false)
  }

  useEffect(() => {
    getCourseList();
  }, []);

  const renderItem = ({ item }) => {
    return <CourseCard course={item} horizontal onPress={onPress} />;
  };


  return (
    <Block flex style={styles.container}>
      {!isLoading ? courses.length ? (
        <FlatList
          scrollEnabled
          data={courses}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          onEndReached={handleLoadMore}
          onRefresh={getCourseList}
          refreshing={false}
          onEndReachedThreshold={0.5}
          ListFooterComponent={isFooterLoading ? <ActivityIndicator /> : null}
        />
      ) : (
        <View style={{ flex: 1 }}>
          <Lottie source={require("../assets/JSON/empty.json")} />
        </View>
      ): [...Array(4).keys()].map((el) => <CourseLoader />)}
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
