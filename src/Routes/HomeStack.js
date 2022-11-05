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
    backgroundColor: '#FFFFFF',
  },
  headerTintColor: '#14091B',
  headerLeft: () => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <View
          style={{justifyContent: 'center', alignItems: 'center', margin: 0}}>
          <Ionicons name={'arrow-back-outline'} size={28} color={'#F44336'} />
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
      {/*
			<Stack.Screen
				name="Verification"
				options={{ headerShown: false }}
				component={VerificationScreen}
			/>
			<Stack.Screen
				name="Address"
				options={{ headerShown: false }}
				component={AddressesScreen}
			/>
			<Stack.Screen
				name="Edit Profile"
				title="Edit Profile"
				options={{ headerShown: true, title: "Edit Profile" }}
				component={EditProfileScreen}
			/>
			<Stack.Screen
				name="CouponDetail"
				options={{ title: "Promotions / Coupons" }}
				component={CouponDetailScreen}
			/>
			<Stack.Screen
				name="Search"
				options={{ title: "Search", headerShown: false }}
				component={SearchProductScreen}
			/>
			<Stack.Screen
				name="Create Address"
				options={{ title: "Add New Address" }}
				component={CreateAddressScreen}
			/>
			<Stack.Screen
				name="ProductDetail"
				options={({ route }) => ({ title: route.params.produtTitle })}
				component={ProductDetailScreen}
			/>

			<Stack.Screen
				name="StoreDetail"
				options={({ route }) => ({ title: route.params.storeTitle })}
				component={StoreDetailScreen}
			/>

			<Stack.Screen
				name="Category"
				options={({ route }) => ({ headerTitle: route.params.categoryName })}
				component={CategoryScreen}
			/>
			<Stack.Screen
				name="PetTypeCategory"
				options={({ route }) => ({ title: route.params.categoryName })}
				component={PetTypeCategoryScreen}
			/> */}
    </Stack.Navigator>
  );
};
export default HomeStack;
