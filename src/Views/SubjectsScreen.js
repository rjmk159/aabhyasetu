/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from "react";


import {
	FlatList,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	useColorScheme,
	View,
} from "react-native";

import { Colors } from "react-native/Libraries/NewAppScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import { fetchSubjects, setSelectedSubject } from "../reducers/app.reducers";
import { getProfileDetails, getProfileSettings, getSubjectList } from "../reducers/selectors";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { ListItem } from "@rneui/themed";
import TouchableScale from "react-native-touchable-scale"; // https://github.com/kohver/react-native-touchable-scale
import LinearGradient from "react-native-linear-gradient"; // Only if no expo
import { screens } from "../constants/screens";
import SubjectLoader from "../components/Loaders/SubjectLoader";


const SubjectsScreen = () => {
	const isDarkMode = useColorScheme() === "dark";
	const dispatch = useDispatch();
	const subjects = useSelector(getSubjectList);
	console.log('subjects', subjects)
	const profileDetails = useSelector(getProfileDetails);
	const profileSettings = useSelector(getProfileSettings);
	const [isLoading, setIsLoading] = useState(true);
	const Focus = useIsFocused();
	const navigation = useNavigation();

	const fetch = async () => {
		setIsLoading(true)
		await dispatch(fetchSubjects());
		setIsLoading(false)
	}


	useEffect(() => {
		fetch();
		return function () {
			// isComponentMounted.current = false;
		 };
	}, [Focus]);

	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
	};

	const handlePress = (item) => {
		dispatch(setSelectedSubject(item));
		navigation.navigate(screens.COURSE_LIST);
	};
	const handleProfileOnPress = () => {
		navigation.reset({
			index: 0,
			routes: [{ name: 'Account' }], // Replace with your initial route name
		  });
		// navigation.navigate('Account')
	}
	const renderItem = ({ item }) => {
		return (
			<ListItem
				Component={TouchableScale}
				onPress={() => handlePress(item)}
				style={styles.listItem}
				friction={90}
				bottomDivider
				tension={100}
				activeScale={0.75} //
				linearGradientProps={{
					colors: ["#FF9800", "#F44336"],
					start: { x: 1, y: 0 },
					end: { x: 0.2, y: 0 },
				}}
				ViewComponent={LinearGradient}
			>
				<ListItem.Content>
					<ListItem.Title style={{ color: "white", fontWeight: "bold" }}>
						{item.name.split("-")[0]}
					</ListItem.Title>
					<ListItem.Subtitle style={{ color: "white" }}>
						({item.count})
					</ListItem.Subtitle>
				</ListItem.Content>
				<ListItem.Chevron color="white" />
			</ListItem>
		);
	};

	return (
		<SafeAreaProvider style={backgroundStyle}>
			<StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />

			<View style={styles.sectionContainer}>
				<View style={styles.mainHeader}>
					<Text>
						<Text style={styles.main}>
							Hi,{" "}
							<Text style={styles.mainSub}>
								{profileDetails?.name || "Friend!"}
							</Text>
						</Text>
						<Text style={{ fontSize: 12, fontWeight: '600' }}>{` (${profileSettings.class}th)`}</Text>
					</Text>
					<TouchableOpacity onPress={handleProfileOnPress} style={styles.profileStyleIconContainer}>
						<View style={styles.profileStyleIcon}>
							<Ionicons name={"ios-person"} size={30} color={"red"} />
						</View>
					</TouchableOpacity>
				</View>
				<Text style={styles.mainSubDesc}>Select Subject</Text>
				{!isLoading ? <FlatList
					scrollEnabled
					data={subjects}
					onRefresh={fetch}
					refreshing={false}
					renderItem={renderItem}
					showsVerticalScrollIndicator={false}
					keyExtractor={(item) => item.id.toString()}
					ListEmptyComponent={
						<Text style={styles.emptyList}>Nothing to Show here!</Text>
					}
				/> : [...Array(6).keys()].map((el) => <SubjectLoader key={el} />)}
			</View>
		</SafeAreaProvider>
	);
};

const styles = StyleSheet.create({
	sectionContainer: {
		flex: 1,
		padding: 20,
		paddingTop: 100,
		backgroundColor: "#fefefe",
	},
	listItem: { margin: 10, borderRadius: 10, overflow: "hidden" },
	sectionDescription: {
		marginTop: 8,
		fontSize: 18,
		fontWeight: "400",
	},
	mainHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	profileStyleIconContainer: {
		flexDirection: 'column',
		alignItems: 'center'

	},
	profileStyleIcon: {
		backgroundColor: '#ececec',
		height: 40,
		width: 40,
		alignItems: 'center',
		justifyContent: 'center',
		margin: 10,
		borderRadius: 6,
		overflow: 'hidden'
	},

	highlight: {
		fontWeight: "700",
	},
	main: {
		fontSize: 20,
		fontWeight: "700",
		padding: 10,
		marginBottom: 20,
	},
	mainSub: {
		color: "#F44336",
	},
	mainSubDesc: {
		color: "#000",
		padding: 10,
	},
});

export default SubjectsScreen;
