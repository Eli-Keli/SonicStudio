import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
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
        <View className='flex-1 dark:bg-gray-800 items-center'>
            <View className='flex-row items-center mb-4'>
                <Ionicons name="timer" size={24} color="black" className="p-2 dark:text-white" />
                <Text className='ml-2 dark:text-white'>
                    {recordingTime}s
                </Text>
            </View>
            <View className='flex-row justify-around w-full'>
                <TouchableOpacity
                    className={`p-7 rounded-full items-center justify-center mx-2 ${recordingStatus === 'RECORDING' ? 'bg-red-500' : 'bg-blue-500'}`}
                    onPress={handleRecordButtonPress}
                >
                    <Ionicons name={recordingStatus === 'RECORDING' ? 'stop' : 'mic'} size={48} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                    className={`p-7 rounded-full items-center justify-center mx-2 ${isPlaying ? 'bg-green-500' : 'bg-gray-700'}`}
                    onPress={handlePlayPauseButtonPress}
                >
                    <Ionicons name={isPlaying ? "pause" : "play"} size={48} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                    className='p-7 rounded-full items-center justify-center mx-2 bg-gray-700'
                    onPress={handleTranscribeButtonPress}
                >
                    <Ionicons name="text" size={48} color="#fff" />
                </TouchableOpacity>
            </View>
            <Text className='dark:text-white mt-4'>
                {`Recording status: ${recordingStatus}`}
            </Text>
            {
                transcription && <Text className='dark:text-white mt-4 px-4 text-center'>
                    {transcription}
                </Text>
            }
        </View>
    );
};

export default VoiceInterface;