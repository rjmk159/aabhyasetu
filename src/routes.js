// import * as React from "react";
// import Ionicons from "react-native-vector-icons/Ionicons";

// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import { Button, View, TouchableOpacity } from "react-native";



// import { useSelector } from "react-redux";
// import { getCurrentPet } from "../reducers/vetReducers/selectors";

// const Stack = createNativeStackNavigator();

// const stackoptions = ({ navigation }) => ({
// 	headerBackTitleVisible: false,
// 	headerStyle: {
// 		backgroundColor: "#FFFFFF",
// 	},
// 	headerTintColor: "#14091B",
// 	headerLeft: () => {
// 		return (
// 			<TouchableOpacity
// 				onPress={() => {
// 					navigation.goBack();
// 				}}
// 			>
// 				<View
// 					style={{ justifyContent: "center", alignItems: "center", margin: 0 }}
// 				>
// 					<Ionicons name={"arrow-back-outline"} size={28} color={"#AEAEB2"} />
// 				</View>
// 			</TouchableOpacity>
// 		);
// 	},
// });

// const VetStack = () => {
// 	const currentPet = useSelector(getCurrentPet);
// 	return (
// 		<Stack.Navigator
// 			initialRouteName={VET_SCREENS.vetHomePage}
// 			screenOptions={stackoptions}
// 		>
// 			<Stack.Group>
// 				<Stack.Screen
// 					name={VET_SCREENS.vetHomePage}
// 					options={{ headerShown: false }}
// 					component={VetHomeScreen}
// 				/>
// 				<Stack.Screen
// 					name={VET_SCREENS.SelectVet}
// 					options={{ title: "Veterinarians", headerShown: true }}
// 					component={VetListScreen}
// 				/>
// 				<Stack.Screen
// 					name={VET_SCREENS.AppointmentList}
// 					options={{ title: "Appointments", headerShown: true }}
// 					component={AppointmentsListScreen}
// 				/>
// 				<Stack.Screen
// 					name={VET_SCREENS.PetsList}
// 					options={{ title: "My Pets", headerShown: true }}
// 					component={PetsListScreen}
// 				/>
// 				<Stack.Screen
// 					name={VET_SCREENS.BookingConfirmation}
// 					options={{ title: "Booking Confirmation", headerShown: true }}
// 					component={AppointmentBookingScreen}
// 				/>
// 				<Stack.Screen
// 					name={VET_SCREENS.PaymentDetails}
// 					options={{ title: "Payment", headerShown: true }}
// 					component={PaymentDetailsScreen}
// 				/>

// 				<Stack.Screen
// 					name={VET_SCREENS.BookingSuccess}
// 					options={{ title: "Booking Successful", headerShown: true }}
// 					component={BookingSuccessfullScreen}
// 				/>
// 				<Stack.Screen
// 					name={VET_SCREENS.ChooseService}
// 					options={{ title: "Choose our Service", headerShown: true }}
// 					component={ChooseServiceType}
// 				/>
// 				<Stack.Screen
// 					name={VET_SCREENS.DoctorDetails}
// 					options={{ title: "Choose our Service", headerShown: false }}
// 					component={DoctorDetailsScreen}
// 				/>
// 				<Stack.Screen
// 					name={VET_SCREENS.PetProfile}
// 					options={{ title: currentPet.name, headerShown: true }}
// 					component={PetProfileScreen}
// 				/>
// 				<Stack.Screen
// 					name={VET_SCREENS.AddEditPet}
// 					options={{ title: "Add/Edit Pet ", headerShown: true }}
// 					component={PetAddEditScreen}
// 				/>
// 				<Stack.Screen
// 					name={VET_SCREENS.ChooseVetAndPet}
// 					options={{ title: "Select Vet and Pet", headerShown: true }}
// 					component={ChooseVetAndPetScreen}
// 				/>
// 				<Stack.Screen
// 					name={VET_SCREENS.PetDetails}
// 					options={{
// 						header: ({ navigation }) => (
// 							<Header
// 								title={`${currentPet.name} Details`}
// 								rightIcon="create-outline"
// 								rightIconLink="AddEditPet"
// 								navigation={navigation}
// 							/>
// 						),
// 						headerTransparent: true,
// 					}}
// 					component={PetDetailsScreen}
// 				/>
// 				<Stack.Screen
// 					name={VET_SCREENS.VacinationHistory}
// 					options={{
// 						header: ({ navigation }) => (
// 							<Header
// 								title={currentPet.name || 'Vacinnation history'}
// 								rightIcon="filter-outline"
// 								rightIconAction="FilterVacnitationHistory"
// 								navigation={navigation}
// 							/>
// 						),
// 						headerTransparent: true,
// 					}}
// 					component={VacinationHistoryScreen}
// 				/>
// 				<Stack.Screen
// 					name={VET_SCREENS.MedicalHistory}
// 					options={{ title: "Medical History", headerShown: true }}
// 					component={MedicalHistoryScreen}
// 				/>
// 					<Stack.Screen
// 					name={VET_SCREENS.PrescriptionDetails}
// 					options={{ title: "Prescription Details", headerShown: true }}
// 					component={PrescriptionScreen}
// 				/>
// 			</Stack.Group>
// 		</Stack.Navigator>
// 	);
// };
// export default VetStack;
