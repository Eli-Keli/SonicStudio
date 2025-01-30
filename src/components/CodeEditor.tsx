import CodeEditor, { CodeEditorSyntaxStyles } from '@rivascva/react-native-code-editor';
import { Text, TouchableOpacity, View } from 'react-native';
import { sendToSonicPi } from '../util/oscHandler';

const Editor = () => {

    const initialCode = 
    `# Welcome to Sonic Pi
    use_bpm 120

    live_loop :simple_loop do
        sample :bd_haus, amp: 2
        sleep 1
    end`

    const handleSendCode = () => {
        // Send the code to Sonic Pi
        sendToSonicPi('/run-code', [initialCode]);
        console.log('Send code to Sonic Pi');
    }

    return (
        <View>
        <CodeEditor
            language='ruby'
            syntaxStyle={CodeEditorSyntaxStyles.monokai}
            initialValue={initialCode}
            showLineNumbers
            readOnly
            style={{
                ...{
                    fontSize: 16,
                    inputLineHeight: 24,
                    highlighterLineHeight: 24,
                    height: 300,
                }
            }}
        />
        <TouchableOpacity 
            onPress={handleSendCode} 
            style={{ backgroundColor: 'yellow', padding: 10, borderRadius: 5 }}
        >
            <Text>Send to Sonic Pi</Text>
        </TouchableOpacity>
        </View>
    );
}

export default Editor;