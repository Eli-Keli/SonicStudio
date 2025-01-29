import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const recordings = [
    "Recording 1",
    "Recording 2",
    "Recording 3",
    "Recording 4",
    "Recording 5",
]

const RecentRecordings = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Recordings</Text>
      <View style={styles.recordingsList}>
        {recordings.map((recording) => (
          <View key={recording} style={styles.recordingItem}>
            <Text style={styles.recordingText}>{recording}</Text>
            <View style={styles.buttonsContainer}>
              <Ionicons name="play" size={24} color="white" style={styles.icon} />
              <Ionicons name="download" size={24} color="white" style={styles.icon} />
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}

export default RecentRecordings

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e293b',
    marginTop: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 8,
    color: 'white',
  },
  recordingsList: {
    marginBottom: 8,
  },
  recordingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
    backgroundColor: '#334155',
    borderRadius: 8,
    marginBottom: 8,
  },
  recordingText: {
    color: 'white',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  icon: {
    padding: 8,
  },
})