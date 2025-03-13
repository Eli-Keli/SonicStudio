import { Text, View, TouchableOpacity } from 'react-native';
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
        <View className="mt-4 dark:bg-gray-900">
            <Text className="text-lg font-medium mb-2 dark:text-white">Recent Recordings</Text>
            <View className="mb-2">
          {recordings.length === 0 ? (
            <Text className="text-black dark:text-white">No recordings available.</Text>
          ) : (
            recordings.map((recording) => (
              <View key={recording.name} className="flex flex-row items-center justify-between p-2 rounded-lg mb-2 dark:bg-gray-800">
                <Text className="dark:text-white">{recording.name}</Text>
                <View className="flex flex-row ml-2">
            <TouchableOpacity onPress={() => handlePlayPause({ uri: recording.uri })}>
              <Ionicons name={playingUri === recording.uri ? "pause" : "play"} size={24} color="black" className="p-2 dark:text-white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDownload({ uri: recording.uri, name: recording.name })}>
              <Ionicons name="download" size={24} color="black" className="p-2 dark:text-white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete({ uri: recording.uri, name: recording.name })}>
              <Ionicons name="trash" size={24} color="black" className="p-2 dark:text-white" />
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