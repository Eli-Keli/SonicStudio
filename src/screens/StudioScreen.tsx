import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const StudioScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Studio Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});