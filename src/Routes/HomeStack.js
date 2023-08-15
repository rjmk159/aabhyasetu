import * as React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import SubjectsScreen from '../Views/SubjectsScreen';
import CourseListScreen from '../Views/CourseListScreen';
import CourseDetailScreen from '../Views/CourseDetailsScreen';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {screens} from '../constants/screens';
import LessonDetailsScreen from '../Views/LessonDetailsScreen';

const Stack = createNativeStackNavigator();

const stackoptions = ({navigation}) => ({
  headerBackTitleVisible: true,
  headerStyle: {
    backgroundColor: '#F44336',
  },
  headerTintColor: '#FFF',
  headerTitleAlign: 'center',
  headerTitleStyle: { fontSize: 16 },
  headerLeft: () => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <View
          style={{justifyContent: 'center', alignItems: 'center', margin:0}}>
          <Ionicons name={'arrow-back-outline'} size={24} color={'#FFF'} />
        </View>
      </TouchableOpacity>
    );
  },
});

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={screens.SUBJECT_LIST}
      screenOptions={stackoptions}>
      <Stack.Screen
        name={screens.SUBJECT_LIST}
        options={{title: 'Select Subject', headerShown: false}}
        component={SubjectsScreen}
      />
      <Stack.Screen
        name={screens.COURSE_LIST}
        options={{title: 'Select Course'}}
        component={CourseListScreen}
      />

      <Stack.Screen
        name={screens.COURSE_DETAILS}
        options={{title: 'Course Details'}}
        component={CourseDetailScreen}
      />
      <Stack.Screen
        name={screens.LESSON_DETAILS}
        options={{title: 'Lesson'}}
        component={LessonDetailsScreen}
      />
    </Stack.Navigator>
  );
};
export default HomeStack;
