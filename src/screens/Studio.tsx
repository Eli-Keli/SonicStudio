import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Components
import Header from '../components/Header';
import VoiceInterface from '../components/VoiceInterface';
import Editor from '../components/CodeEditor';
import RecentRecordings from '../components/RecentRecordings';
import AIMusicGenerator from '../components/AIMusicGenerator';

const Studio = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [recordingStatus, setRecordingStatus] = useState('IDLE');
    const [audioPermission, setAudioPermission] = useState(false);
    const [recordings, setRecordings] = useState([]);
    const [generatedCode, setGeneratedCode] = useState('');

    return (
        <SafeAreaView className='flex-1 dark:bg-gray-800'>
                <Header />
            <ScrollView>
                <View className='px-4'>
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
                        setRecordings={setRecordings}
                    />
                    <RecentRecordings recordings={recordings} setRecordings={setRecordings} />
                    <AIMusicGenerator setGeneratedCode={setGeneratedCode} />
                    <Editor generatedCode={generatedCode} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Studio;