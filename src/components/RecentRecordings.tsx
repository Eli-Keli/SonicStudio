import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';

interface Recording {
    uri: string;
    name: string;
}

interface RecentRecordingsProps {
    recordings: Recording[];
    setRecordings: React.Dispatch<React.SetStateAction<Recording[]>>;
}

const RecentRecordings: React.FC<RecentRecordingsProps> = ({ recordings, setRecordings }) => {
    const [playbackObject, setPlaybackObject] = useState<Audio.Sound | null>(null);
    const [playingUri, setPlayingUri] = useState<string | null>(null);

    interface HandlePlayPauseParams {
      uri: string;
    }

    const handlePlayPause = async ({ uri }: HandlePlayPauseParams): Promise<void> => {
      if (playbackObject && playingUri === uri) {
        if (playbackObject._loaded) {
          await playbackObject.pauseAsync();
          setPlayingUri(null);
        } else {
          await playbackObject.playAsync();
          setPlayingUri(uri);
        }
      } else {
        if (playbackObject) {
          await playbackObject.unloadAsync();
        }
        const newPlaybackObject = new Audio.Sound();
        await newPlaybackObject.loadAsync({ uri });
        setPlaybackObject(newPlaybackObject);
        await newPlaybackObject.playAsync();
        setPlayingUri(uri);
      }
    };

    interface HandleDownloadParams {
      uri: string;
      name: string;
    }

    const handleDownload = async ({ uri, name }: HandleDownloadParams): Promise<void> => {
      const downloadUri = FileSystem.documentDirectory + name;
      await FileSystem.downloadAsync(uri, downloadUri);
      console.log('Downloaded to:', downloadUri);
    };

    interface HandleDeleteParams {
      uri: string;
      name: string;
    }

    const handleDelete = async ({ uri, name }: HandleDeleteParams): Promise<void> => {
      await FileSystem.deleteAsync(uri);
      setRecordings((prevRecordings) => prevRecordings.filter(recording => recording.uri !== uri));
      console.log('Deleted:', name);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recent Recordings</Text>
            <View style={styles.recordingsList}>
                {recordings.length === 0 ? (
                  <Text style={styles.recordingText}>No recordings available.</Text>
                ) : (
                  recordings.map((recording) => (
                    <View key={recording.name} style={styles.recordingItem}>
                      <Text style={styles.recordingText}>{recording.name}</Text>
                      <View style={styles.buttonsContainer}>
                        <TouchableOpacity onPress={() => handlePlayPause({ uri: recording.uri })}>
                          <Ionicons name={playingUri === recording.uri ? "pause" : "play"} size={24} color="white" style={styles.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDownload({ uri: recording.uri, name: recording.name })}>
                          <Ionicons name="download" size={24} color="white" style={styles.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDelete({ uri: recording.uri, name: recording.name })}>
                          <Ionicons name="trash" size={24} color="white" style={styles.icon} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))
                )}
            </View>
        </View>
    );
};

export default RecentRecordings;

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
});