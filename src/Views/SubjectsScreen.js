/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from "react";

import {
	FlatList,
	StatusBar,
	StyleSheet,
	Text,
	useColorScheme,
	View,
} from "react-native";

import { Colors } from "react-native/Libraries/NewAppScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubjects, setSelectedSubject } from "../reducers/app.reducers";
import { getProfile, getSubjectsList } from "../reducers/selectors";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { ListItem } from "@rneui/themed";
import TouchableScale from "react-native-touchable-scale"; // https://github.com/kohver/react-native-touchable-scale
import LinearGradient from "react-native-linear-gradient"; // Only if no expo
import { screens } from "../constants/screens";

const SubjectsScreen = () => {
	const isDarkMode = useColorScheme() === "dark";
	const dispatch = useDispatch();
	const subjects = useSelector(getSubjectsList);
	const profile = useSelector(getProfile);
	const Focus = useIsFocused();
	const navigation = useNavigation();

	useEffect(() => {
		dispatch(fetchSubjects());
	}, [Focus]);

	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
	};

	const handlePress = (id) => {
		dispatch(setSelectedSubject(id));
		navigation.navigate(screens.COURSE_LIST);
	};
	const renderItem = ({ item }) => {
		return (
			<ListItem
				Component={TouchableScale}
				onPress={() => handlePress(item.id)}
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
				<Text style={styles.main}>
					Hi,{" "}
					<Text style={styles.mainSub}>
						{profile?.res?.user_nicename || "Friend!"}
					</Text>
				</Text>
				<Text style={styles.mainSubDesc}>Select Subject</Text>
				<FlatList
					scrollEnabled
					data={subjects}
					renderItem={renderItem}
					showsVerticalScrollIndicator={false}
					keyExtractor={(item) => item.id}
					ListEmptyComponent={
						<Text style={styles.emptyList}>Nothing to Show here!</Text>
					}
				/>
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
