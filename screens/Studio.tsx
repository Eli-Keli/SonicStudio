import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

// Components
import Header from 'components/Header'
import VoiceInterface from 'components/VoiceInterface'

const Studio = () => {
  const [isRecording, setIsRecording] = React.useState(false)
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [recordingTime, setRecordingTime] = React.useState(0)


  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.innerContainer}>
      {/* <Text style={styles.title}>Welcome to Sonic Studio</Text> */}
      <VoiceInterface
        isRecording={isRecording}
        setIsRecording={setIsRecording}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        recordingTime={recordingTime}
        setRecordingTime={setRecordingTime}
      />
      </View>
    </View>
  )
}

export default Studio

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1f2937",
  },
  innerContainer: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 16,
  },
});