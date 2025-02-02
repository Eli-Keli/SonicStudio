import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Editor from '../components/CodeEditor';

export const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Editor />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});