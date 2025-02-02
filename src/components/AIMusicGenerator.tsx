import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { generateMusicCode, modifyMusicCode } from '../util/geminiAI';

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
        <View style={styles.container}>
            <Text style={styles.codeTitle}>Enter a prompt to generate music code:</Text>
            <TextInput
                style={styles.input}
                placeholder="Describe the music you want to generate"
                placeholderTextColor="#ccc"
                value={prompt}
                onChangeText={setPrompt}
            />
            {isGenerating ? (
                <ActivityIndicator size="large" color="#3B82F6" />
            ) : (
                <>
                <TouchableOpacity style={styles.button} onPress={handleGenerateCode}>
                    <Text style={styles.buttonText}>Generate Code</Text>
                </TouchableOpacity>
                {result && (<View style={styles.editorContainer}>
                    <Text style={styles.editorText}>{formatGeneratedCode(result)}</Text>
                </View>)}
                </>
            )}
        </View>
    );
};

export default AIMusicGenerator;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1f2937',
        padding: 16,
    },
    input: {
        backgroundColor: '#334155',
        color: 'white',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
    },
    button: {
        backgroundColor: '#3B82F6',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 16,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    codeText: {
        color: 'white',
        marginTop: 16,
        paddingHorizontal: 16,
        textAlign: 'center',
    },
    codeTitle: {
        color: 'white',
        fontSize: 16,
        marginBottom: 16,
    },
    editorContainer: {
        backgroundColor: '#111827',
        padding: 16,
        borderRadius: 8,
        marginTop: 16,
    },
    editorText: {
        color: 'white',
        fontFamily: 'monospace',
    },
});