import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { generateMusicCode } from '../util/geminiAI';

interface AIMusicGeneratorProps {
    setGeneratedCode: (code: string) => void;
}

const AIMusicGenerator: React.FC<AIMusicGeneratorProps> = ({ setGeneratedCode }) => {
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const [result, setResult] = useState('')

    const formatGeneratedCode = (code: string): string => {
        return code.replace(/```ruby|```/g, '').trim();
    };

    const handleGenerateCode = async () => {
        try {
            setIsGenerating(true);
            const result = await generateMusicCode(prompt);
            const formattedCode = formatGeneratedCode(result.code);
            setGeneratedCode(formattedCode);
            setResult(formattedCode);
            Alert.alert("Your music code has been generated!");
        } catch (error) {
            console.error("Code generation error:", error);
            Alert.alert("Error", "Failed to generate music code.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <View className="flex-1 p-4 dark:bg-gray-900">
            <Text className='mb-4 px-4 dark:text-white'>Enter a prompt to generate music code:</Text>
            <TextInput
                className='dark:bg-gray-800 bg-gray-300 dark:text-white p-4 rounded-lg mb-4'
                placeholder="Describe the music you want to generate"
                placeholderTextColor="#374151"
                value={prompt}
                onChangeText={setPrompt}
            />
            {isGenerating ? (
                <ActivityIndicator size="large" color="#3B82F6" />
            ) : (
                <>
                <TouchableOpacity className="bg-blue-500 p-4 rounded-lg items-center mb-4" onPress={handleGenerateCode}>
                    <Text className="dark:text-white text-lg">Generate Code</Text>
                </TouchableOpacity>
                {result && (
                    <View className="bg-gray-900 p-4 rounded-lg mt-4">
                        <Text className="text-white font-mono">{formatGeneratedCode(result)}</Text>
                    </View>
                )}
                </>
            )}
        </View>
    );
};

export default AIMusicGenerator;