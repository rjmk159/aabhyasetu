import 'react-native-gesture-handler';
import * as React from 'react';
import {Platform, StyleSheet, PermissionsAndroid} from 'react-native';
// import SplashScreen from 'react-native-splash-screen';

import TabBarButtom from './src/Routes/TabBar';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
// import MainApp

const App = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <TabBarButtom />
    </GestureHandlerRootView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
  },
});
export default App;
