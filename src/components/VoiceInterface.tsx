import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { Ionicons } from '@expo/vector-icons';
import { transcribeAudio } from '../util/speechToText';

interface VoiceInterfaceProps {
    isRecording: boolean;
    setIsRecording: (value: boolean) => void;
    isPlaying: boolean;
    setIsPlaying: (value: boolean) => void;
    recordingTime: number;
    setRecordingTime: (value: number | ((prevTime: number) => number)) => void;
    audioPermission: boolean;
    setAudioPermission: (value: boolean) => void;
    recordingStatus: string;
    setRecordingStatus: (value: string) => void;
    setRecordings: (value: any) => void;
}

const VoiceInterface: React.FC<VoiceInterfaceProps> = ({
    isRecording,
    setIsRecording,
    isPlaying,
    setIsPlaying,
    recordingTime,
    setRecordingTime,
    audioPermission,
    setAudioPermission,
    recordingStatus,
    setRecordingStatus,
    setRecordings,
}) => {
    const [recording, setRecording] = useState<Audio.Recording | null>(null);
    const [playbackObject, setPlaybackObject] = useState<Audio.Sound | null>(null);
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
    const [transcription, setTranscription] = useState<string | null>(null);

    useEffect(() => {
        // Get permission to record audio
        async function getAudioPermission() {
            const permission = await Audio.requestPermissionsAsync();
            console.log("Permission granted: ", permission.granted);
            setAudioPermission(permission.granted);
        }

        getAudioPermission();

        return () => {
            if (recording) {
                stopRecording();
            }
            if (timer) {
                clearInterval(timer);
            }
        };
    }, []);

    async function startRecording() {
        try {
            if (audioPermission) {
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: true,
                    playsInSilentModeIOS: true,
                });

                const newRecording = new Audio.Recording();
                console.log("Starting recording");
                await newRecording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HighQuality);
                await newRecording.startAsync();
                setRecording(newRecording);
                setRecordingStatus('RECORDING');
                setIsRecording(true);
                console.log("Recording started");

                // Start timer
                setRecordingTime(0);
                const newTimer = setInterval(() => {
                    setRecordingTime((prevTime: number) => prevTime + 1);
                }, 1000);
                setTimer(newTimer);
            }
        } catch (error) {
            console.log("Error starting recording: ", error);
        }
    }

    async function stopRecording() {
        try {
            if (recordingStatus === 'RECORDING') {
                console.log("Stopping recording");
                if (recording) {
                    await recording.stopAndUnloadAsync();
                }
                const recordingUri = recording ? recording.getURI() : null;

                const fileName = `recording-${Date.now()}.caf`;
                await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'recordings/', { intermediates: true });
                await FileSystem.moveAsync({
                    from: recordingUri || '',
                    to: FileSystem.documentDirectory + `recordings/${fileName}`,
                });

                const newPlaybackObject = new Audio.Sound();
                await newPlaybackObject.loadAsync({ uri: FileSystem.documentDirectory + `recordings/${fileName}` });
                setPlaybackObject(newPlaybackObject);

                // Save the recording
                setRecordings((prevRecordings: { uri: string; name: string }[]) => [
                    ...prevRecordings,
                    { uri: FileSystem.documentDirectory + `recordings/${fileName}`, name: fileName },
                ]);

                setRecording(null);
                setRecordingStatus('STOPPED');
                setIsRecording(false);

                // Stop timer
                if (timer) {
                    clearInterval(timer);
                    setTimer(null);
                }
            }
        } catch (error) {
            console.log("Error stopping recording: ", error);
        }
    }

    async function handleRecordButtonPress() {
        if (recordingStatus === 'RECORDING') {
            await stopRecording();
        } else {
            await startRecording();
        }
    }

    async function handlePlayPauseButtonPress() {
        if (playbackObject) {
            if (isPlaying) {
                await playbackObject.pauseAsync();
                setIsPlaying(false);
            } else {
                await playbackObject.playAsync();
                setIsPlaying(true);
            }
        }
    }

    async function handleTranscribeButtonPress() {
        if (recording) {
            const recordingUri = recording.getURI();
            if (recordingUri) {
                const fileUri = FileSystem.documentDirectory + `recordings/${recordingUri.split('/').pop()}`;
                const file = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.Base64 });
                const buffer = Buffer.from(file, 'base64');
                try {
                    const result = await transcribeAudio(buffer);
                    setTranscription(result.text);
                    Alert.alert("Transcription", result.text);
                } catch (error) {
                    console.error("Transcription error:", error);
                    Alert.alert("Error", "Failed to transcribe audio.");
                }
            }
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.timerContainer}>
                <Ionicons name="timer" size={24} color="#fff" />
                <Text style={styles.timerText}>{recordingTime}s</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, recordingStatus === 'RECORDING' ? styles.recordingButton : styles.record]}
                    onPress={handleRecordButtonPress}
                >
                    <Ionicons name={recordingStatus === 'RECORDING' ? 'stop' : 'mic'} size={48} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, isPlaying ? styles.playingButton : styles.play]}
                    onPress={handlePlayPauseButtonPress}
                >
                    <Ionicons name={isPlaying ? "pause" : "play"} size={48} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleTranscribeButtonPress}
                >
                    <Ionicons name="text" size={48} color="#fff" />
                </TouchableOpacity>
            </View>
            <Text style={styles.recordingStatusText}>{`Recording status: ${recordingStatus}`}</Text>
            {transcription && <Text style={styles.transcriptionText}>{transcription}</Text>}
        </View>
    );
};

export default VoiceInterface;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1f2937',
        alignItems: 'center',
    },
    timerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    timerText: {
        color: '#fff',
        marginLeft: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    button: {
        padding: 28,
        borderRadius: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 8,
    },
    recordingButton: {
        backgroundColor: '#EF4444',
    },
    play: {
        backgroundColor: '#334155',
    },
    playingButton: {
        backgroundColor: '#22C55E',
    },
    recordingStatusText: {
        color: 'white',
        marginTop: 16,
    },
    record:{
        backgroundColor: '#3B82F6',
    },
    transcriptionText: {
        color: 'white',
        marginTop: 16,
        paddingHorizontal: 16,
        textAlign: 'center',
    },
});