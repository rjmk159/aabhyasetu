import * as React from "react";

import AccountScreen from "../Views/AccountScreen";
// import CourseListScreen from '../Views/CourseListScreen';
// import CourseDetailScreen from '../Views/CourseDetailsScreen';

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { screens } from "../constants/screens";
import LessonDetailsScreen from "../Views/LessonDetailsScreen";
import SettingsScreen from "../Views/SettingsScreen";
import CommingSoon from "../Views/CommingSoon";
import ProfileView from "../Views/ProfileView";
import EditProfile from "../Views/EditProfile";
import FeedbackScreen from "../Views/FeedbackScreen";
import SubjectsScreen from "../Views/SubjectsScreen";
import StackOptions from "../components/StackOptions";
import MyCourses from "../Views/MyCourses";

const Stack = createNativeStackNavigator();



const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={screens.ACCOUNT}
      screenOptions={StackOptions}
    >
      <Stack.Screen
        name={screens.ACCOUNT}
        options={{ title: "Account" }}
        component={AccountScreen}
      />
      <Stack.Screen
        name={screens.SETTINGS}
        options={{ title: "Settings" }}
        component={SettingsScreen}
        initialParams={null}
      />

      <Stack.Screen
        name={screens.PROFILE}
        options={{ title: "Profile" }}
        component={ProfileView}
      />
      <Stack.Screen
        name={screens.PROFILE_EDIT}
        options={{ title: "Edit Profile" }}
        component={EditProfile}
      />
      {/* <Stack.Screen
        name={screens.SUBJECT_LIST}
        options={{title: 'Select Subject', headerShown: false}}
        component={SubjectsScreen}
      /> */}
      <Stack.Screen
        name={screens.FEEDBACK}
        options={{ title: "Feedback" }}
        component={FeedbackScreen}
      />
      <Stack.Screen
        name={screens.MY_COURSES}
        options={{ title: "My Courses" }}
        component={MyCourses}
      />



    </Stack.Navigator>
  );
};
export default HomeStack;
