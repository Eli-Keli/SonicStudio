import React, { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface VoiceProps {
    isRecording: boolean;
    setIsRecording: (isRecording: boolean) => void;
    isPlaying: boolean;
    setIsPlaying: (isPlaying: boolean) => void;
    recordingTime: number;
    setRecordingTime: (recordingTime: number | ((prevTime: number) => number)) => void;
}

const VoiceInterface = ({ isRecording, setIsRecording, isPlaying, setIsPlaying, recordingTime, setRecordingTime }: VoiceProps) => {

    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isRecording) {
            intervalRef.current = setInterval(() => {
                setRecordingTime((prevTime: number) => prevTime + 1); // Increment recording time
            }, 1000)
        } else {
            clearInterval(intervalRef.current as NodeJS.Timeout);
            setRecordingTime(0); // Reset recording time
        }

        return () => {
            clearInterval(intervalRef.current as NodeJS.Timeout);
        }
    }, [isRecording, setRecordingTime])

    return (
        <View style={styles.container}>
            <View style={styles.timerContainer}>
                <Ionicons name="timer" size={24} color="#fff" />
                <Text style={styles.timerText}>{recordingTime}s</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, isRecording ? styles.recordingButton : styles.record]}
                    onPress={() => setIsRecording(!isRecording)}
                >
                    <Ionicons name="mic" size={48} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, isPlaying ? styles.playingButton : styles.play ]}
                    onPress={() => setIsPlaying(!isPlaying)}
                >
                    <Ionicons name={isPlaying ? "pause" : "play"} size={48} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 16,
    },
    timerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    timerText: {
        fontSize: 24,
        marginLeft: 8,
        color: "white",
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        // spaceBetween: 16,
    },
    button: {
        padding: 48,
        borderRadius: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 8,
    },
    play: {
        backgroundColor: "#334155",
    },
    record: {
        backgroundColor: "#3B82F6",
    },
    recordingButton: {
        backgroundColor: '#EF4444',
    },
    playingButton: {
        backgroundColor: '#22C55E',
    },
});

export default VoiceInterface;