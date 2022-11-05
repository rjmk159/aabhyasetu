/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import { Provider } from "react-redux";
// import { typography } from "./src/utils/typography";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { LogBox } from "react-native";
export const persistor = persistStore(store);

import { store } from "./src/config/store";
import {name as appName} from './app.json';

const LearningApp = () => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<App />
			</PersistGate>
		</Provider>
	);
};

AppRegistry.registerComponent(appName, () => LearningApp);
