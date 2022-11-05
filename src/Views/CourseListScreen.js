import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, Dimensions, ScrollView, FlatList} from 'react-native';
import {Block, Text, theme} from 'galio-framework';
import {useNavigation} from '@react-navigation/native';

import CourseCard from '../components/cards';
import {
  fetchCoursesList,
  setCurrentCourse,
} from '../reducers/app.reducers';
import {getCourses} from '../reducers/selectors';
import {screens} from '../constants/screens';
const {width} = Dimensions.get('screen');

const CourseListScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const courses = useSelector(getCourses);

  const onPress = item => {
    dispatch(setCurrentCourse(item));
    navigation.navigate(screens.COURSE_DETAILS);
  };

  const renderItem = ({item}) => {
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
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyList}>Nothing to Show here!</Text>
        }
      />
    </Block>
  );
};

const styles = StyleSheet.create({
  emptyList: {
    padding: 20
  },
  container: {
    margin: 20
  }
});

export default CourseListScreen;
