import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

import { Ionicons } from '@expo/vector-icons'

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Sonic Studio</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log('Settings Clicked')}
        >
          <Ionicons name="settings" size={24} color="#fff" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    headerContainer: {
    padding: 16,
    backgroundColor: '#1e293b',
    // position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 10,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  button: {
    padding: 8,
    borderRadius: 9999,
    backgroundColor: '#1e293b',
  },
  icon: {
    width: 24,
    height: 24,
  },
})