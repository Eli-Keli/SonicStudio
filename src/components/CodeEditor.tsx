import React, { useState, useEffect } from 'react';
import CodeEditor, { CodeEditorSyntaxStyles } from '@rivascva/react-native-code-editor';
import { ActivityIndicator, Alert, Text, TouchableOpacity, View } from 'react-native';
import { sendToSonicPi } from '../util/oscHandler';

interface EditorProps {
    generatedCode: string;
}

const Editor: React.FC<EditorProps> = ({ generatedCode }) => {
    const [code, setCode] = useState<string>(`
        use_bpm 120
play :c4
sleep 1
play :d4
sleep 1
play :e4
sleep 1
play :f4
sleep 1

live_loop :bass do
  use_synth :tb303
  play :c3, release: 0.5
  sleep 1
end

sample :bd_haus, amp: 2
sleep 1
sample :bd_haus, amp: 2
sleep 1
sample :sn_dolf, amp: 1.5
sleep 0.5
        `);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (generatedCode) {
            console.log("Code:", generatedCode)
            setCode(generatedCode);
        }
    }, [generatedCode]);

    const handleSendCode = () => {
        setIsLoading(true);
        // Send the code to Sonic Pi
        sendToSonicPi('/run-code', [code]);
        setTimeout(() => {
            setIsLoading(false);
            Alert.alert('Code sent to Sonic Pi');
        }, 6000);
        console.log('Send code to Sonic Pi');
    };

    return (
        <View>
            <CodeEditor
                language='ruby'
                syntaxStyle={CodeEditorSyntaxStyles.monokai}
                showLineNumbers
                initialValue={code}
                // readOnly
                style={{
                    fontSize: 16,
                    inputLineHeight: 24,
                    highlighterLineHeight: 24,
                    height: 300,
                }}
            />
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <TouchableOpacity 
                    onPress={handleSendCode} 
                    style={ {
                        backgroundColor: 'yellow',
                        padding: 16,
                        borderRadius: 8,
                        alignItems: 'center',
                        marginVertical: 16,
                    }}
                >
                    <Text>Send to Sonic Pi</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default Editor;