/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {StatusBar, StyleSheet, Text, View} from 'react-native';

import {SafeAreaProvider} from 'react-native-safe-area-context';

const CommingSoon = () => {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'dark-content'} />
      <View style={styles.sectionContainer}>
        <Text>Comming Soon</Text>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fefefe',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CommingSoon;
