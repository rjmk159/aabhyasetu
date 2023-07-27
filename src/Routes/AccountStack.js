import * as React from "react";
import { View, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

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

const Stack = createNativeStackNavigator();

const stackoptions = ({ navigation }) => ({
  headerBackTitleVisible: true,
  headerStyle: {
    backgroundColor: "#FFFFFF",
  },
  headerTintColor: "#14091B",
  headerLeft: () => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
      >
        <View
          style={{ justifyContent: "center", alignItems: "center", margin: 0 }}
        >
          <Ionicons name={"arrow-back-outline"} size={28} color={"#F44336"} />
        </View>
      </TouchableOpacity>
    );
  },
});

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={screens.ACCOUNT}
      screenOptions={stackoptions}
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
      <Stack.Screen
        name={screens.FEEDBACK}
        options={{ title: "Feedback" }}
        component={FeedbackScreen}
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
