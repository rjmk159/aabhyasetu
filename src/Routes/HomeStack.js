import * as React from 'react';

import SubjectsScreen from '../Views/SubjectsScreen';
import CourseListScreen from '../Views/CourseListScreen';
import CourseDetailScreen from '../Views/CourseDetailsScreen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { screens } from '../constants/screens';
import LessonDetailsScreen from '../Views/LessonDetailsScreen';
import StackOptions from '../components/StackOptions';

const Stack = createNativeStackNavigator();


const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={screens.SUBJECT_LIST}
      screenOptions={StackOptions}>
      <Stack.Screen
        name={screens.SUBJECT_LIST}
        options={{ title: 'Select Subject', headerShown: false }}
        component={SubjectsScreen}
      />
      <Stack.Screen
        name={screens.COURSE_LIST}
        options={{ title: 'Select Course' }}
        component={CourseListScreen}
      />

      <Stack.Screen
        name={screens.COURSE_DETAILS}
        options={{ title: 'Course Details' }}
        component={CourseDetailScreen}
      />
      <Stack.Screen
        name={screens.LESSON_DETAILS}
        options={{ title: 'Lesson' }}
        component={LessonDetailsScreen}
      />
    </Stack.Navigator>
  );
};
export default HomeStack;
