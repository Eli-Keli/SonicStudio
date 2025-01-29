import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { Audio } from 'expo-av'
import * as FileSystem from 'expo-file-system'
import { Ionicons } from '@expo/vector-icons'

const RecordPlayAudio = () => {
    const [recording, setRecording] = React.useState(null);
    const [recordingStatus, setRecordingStatus] = React.useState('IDLE');
    const [audioPermission, setAudioPermission] = React.useState(null);

    useEffect(() => {
        // Get permission to record audio
        async function getAudioPermission() {
            await Audio.requestPermissionsAsync().then((permission) => {
                console.log("Permission granted: ", permission.granted);
                setAudioPermission(permission.granted);
            }).catch((error) => {
                console.log("Error getting audio permission: ", error);
            });
        }

        // call function to get audio permission
        getAudioPermission();
        // cleanup upon first render
        return () => {
            if (recording) {
                stopRecording(); // stop recording if it is still recording
            }
        };

    }, [])

    async function startRecording() {
        try {
            // needed for ios
            if (audioPermission) {
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: true, // iOS only
                    playsInSilentModeIOS: true, // iOS only
                });
            }

            const newRecording = new Audio.Recording();
            console.log("Starting recording");
            await newRecording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HighQuality);
            await newRecording.startAsync();
            setRecording(newRecording);
            setRecordingStatus('RECORDING');
            console.log("Recording started");

        } catch (error) {
            console.log("Error starting recording: ", error);
        }
    }

    async function stopRecording() {
        try {

            if (recordingStatus === 'RECORDING') {
                console.log("Stopping recording");
                await recording.stopAndUnloadAsync();
                const recordingUri = recording.getURI();

                // create a new file name for the recording
                const fileName = `recording-${Date.now()}.caf`;

                // Move the recording to the new directory with the new file name
                await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'recordings/', { intermediates: true });
                await FileSystem.moveAsync({
                    from: recordingUri,
                    to: FileSystem.documentDirectory + `recordings/${fileName}`,
                });

                // This is for simply playing the recording back
                const playbackObject = new Audio.Sound();
                await playbackObject.loadAsync({ uri: FileSystem.documentDirectory + `recordings/${fileName}` });
                await playbackObject.playAsync();

                // Reset our recording states
                setRecording(null);
                setRecordingStatus('STOPPED');
            }

        } catch (error) {
            console.log("Error stopping recording: ", error);
        }
    }

    async function handleRecordButtonPress() {
        if (recording) {
            const recordingUri = recording.getURI();
            if (recordingUri) {
                console.log("Saving recording to: ", recordingUri);
            }
        } else {
            await startRecording();
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={recording ? stopRecording : startRecording}>
                <Ionicons name={recording ? 'stop' : 'radio-button-on'} size={64} color="white" />
            </TouchableOpacity>
            <Text style={styles.recordingStatusText}>{`Recording status: ${recordingStatus}`}</Text>
        </View>
    )
}

export default RecordPlayAudio

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1f2937',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 128,
        height: 128,
        borderRadius: 64,
        backgroundColor: 'red',
    },
    recordingStatusText: {
        color: 'white',
        marginTop: 16,
    },
})