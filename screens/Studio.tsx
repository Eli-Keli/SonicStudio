import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

// Components
import Header from 'components/Header'
import VoiceInterface from 'components/VoiceInterface'
import RecordPlayAudio from 'components/RecordPlayAudio'
import Editor from 'components/CodeEditor'
import { SafeAreaView } from 'react-native-safe-area-context'

const Studio = () => {
  const [isRecording, setIsRecording] = React.useState(false)
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [recordingTime, setRecordingTime] = React.useState(0)


  return (
    <SafeAreaView style={styles.container}>
    <View>
      <Header />
      <View style={styles.innerContainer}>
      {/* <Text style={styles.title}>Welcome to Sonic Studio</Text> */}
      {/* <VoiceInterface
        isRecording={isRecording}
        setIsRecording={setIsRecording}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        recordingTime={recordingTime}
        setRecordingTime={setRecordingTime}
      /> */}
      {/* <RecordPlayAudio /> */}
      <Editor />
      </View>
    </View>
    </SafeAreaView>
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