import CodeEditor, { CodeEditorSyntaxStyles } from '@rivascva/react-native-code-editor';
import { useKeyboard } from '@react-native-community/hooks';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const Editor = (): JSX.Element => {
    const keyboard = useKeyboard()
    const insets = useSafeAreaInsets()

    return (
            <CodeEditor
                style={{
                    ...{
                        fontSize: 20,
                        inputLineHeight: 26,
                        highlighterLineHeight: 26,
                        backgroundColor: '#1f2937',
                        highlighterColor: 'white',
                    },
                    ...(keyboard.keyboardShown
                        ? { marginBottom: keyboard.keyboardHeight - insets.bottom }
                        : {}),
                }}
                language="ruby"
                syntaxStyle={CodeEditorSyntaxStyles.github}
                initialValue={`use_osc "127.0.0.1", 4560

live_loop :receive_notes do
  use_real_time
  note = sync "/osc/play_note"
  synth :piano, note: note[0]
end`}
                showLineNumbers
                readOnly
            />
    );
};

export default Editor;