import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, ScrollView } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import Header from './Header';

interface Tutorial {
  title: string;
  duration: string;
  chapters: { title: string; completed: boolean }[];
  interactive: { exercises: string[] };
}

interface TutorialDetailProps {
    selectedTutorial: Tutorial;
    setSelectedTutorial: React.Dispatch<React.SetStateAction<Tutorial | null>>;
  }


const TutorialDetail: React.FC<TutorialDetailProps> = ({ selectedTutorial, setSelectedTutorial }) => {
    return (
        <View style={styles.container}>
            <Header />
        <ScrollView style={styles.scrollView}>
            <TouchableOpacity onPress={() => setSelectedTutorial(null)} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Back to Tutorials</Text>
            </TouchableOpacity>

            <View style={styles.tutorialContainer}>
            <Text style={styles.tutorialTitle}>{selectedTutorial.title}</Text>
            <View style={styles.tutorialDurationContainer}>
                <Ionicons name="time" size={16} color="#94a3b8" />
                <Text style={styles.tutorialDuration}>{selectedTutorial.duration}</Text>
            </View>

            <View>
                {selectedTutorial.chapters.map((chapter, index) => (
                <View key={index} style={styles.chapterContainer}>
                    <View style={styles.chapterInfo}>
                    <View style={[styles.chapterStatus, { backgroundColor: chapter.completed ? 'green' : '#475569' }]} />
                    <Text style={{color: "white"}}>{chapter.title}</Text>
                    </View>
                    <Button title={chapter.completed ? 'Review' : 'Start'} onPress={() => {}} color="blue" />
                </View>
                ))}
            </View>
            </View>

            <View style={styles.interactiveContainer}>
            <Text style={styles.interactiveTitle}>Interactive Exercises</Text>
            <View>
                {selectedTutorial.interactive.exercises.map((exercise, index) => (
                <View key={index} style={styles.exerciseContainer}>
                    <Text style={{color: "white"}}>{exercise}</Text>
                    <Button title="Try Now" onPress={() => {}} color="blue" />
                </View>
                ))}
            </View>
            </View>
        </ScrollView>
    </View>
    );
};

export default TutorialDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1f2937',
    },
    scrollView: {
        flex: 1,
    },
    backButton: {
        padding: 16,
    },
    backButtonText: {
        color: 'white',
    },
    tutorialContainer: {
        padding: 16,
    },
    tutorialTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    tutorialDurationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    tutorialDuration: {
        color: '#94a3b8',
        marginLeft: 8,
    },
    chapterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
    },
    chapterInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    chapterStatus: {
        width: 16,
        height: 16,
        borderRadius: 8,
        marginRight: 8,
    },
    interactiveContainer: {
        padding: 16,
    },
    interactiveTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    exerciseContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
    },

})