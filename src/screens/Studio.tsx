import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Components
import Header from '../components/Header';
import VoiceInterface from '../components/VoiceInterface';
import Editor from '../components/CodeEditor';
import RecentRecordings from '../components/RecentRecordings';

const Studio = () => {
    const [isRecording, setIsRecording] = React.useState(false);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [recordingTime, setRecordingTime] = React.useState(0);
    const [recordingStatus, setRecordingStatus] = React.useState('IDLE');
    const [audioPermission, setAudioPermission] = React.useState(false);
    const [recordings, setRecordings] = React.useState([]);

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Header />
                <ScrollView style={styles.innerContainer}>
                    <VoiceInterface
                        isRecording={isRecording}
                        setIsRecording={setIsRecording}
                        isPlaying={isPlaying}
                        setIsPlaying={setIsPlaying}
                        recordingTime={recordingTime}
                        setRecordingTime={setRecordingTime}
                        audioPermission={audioPermission}
                        setAudioPermission={setAudioPermission}
                        recordingStatus={recordingStatus}
                        setRecordingStatus={setRecordingStatus}
                        setRecordings={setRecordings} // Pass setRecordings prop
                    />
                    <Editor />
                    <RecentRecordings recordings={recordings} setRecordings={setRecordings} />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default Studio;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1f2937",
    },
    innerContainer: {
        paddingHorizontal: 16,
    },
});