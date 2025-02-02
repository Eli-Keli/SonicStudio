import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import TutorialDetail from '../components/TutorialDetail';

const tutorials = [
  {
    id: 1,
    title: "Traditional Djembe Rhythms",
    duration: "15 min",
    progress: 60,
    chapters: [
      { title: "Basic Rhythms", completed: true },
      { title: "Pattern Variations", completed: true },
      { title: "Advanced Techniques", completed: false }
    ],
    interactive: {
      exercises: ["Match the Rhythm", "Complete the Pattern", "Create Your Variation"],
      currentExercise: 0
    }
  },
  {
    id: 2,
    title: "Amapiano Beats",
    duration: "20 min",
    progress: 30,
    chapters: [
      { title: "Introduction to Amapiano", completed: true },
      { title: "Basic Beats", completed: false },
      { title: "Creating Grooves", completed: false }
    ],
    interactive: {
      exercises: ["Play Along", "Modify the Beat", "Create a Groove"],
      currentExercise: 0
    }
  },
  {
    id: 3,
    title: "Beatboxing Basics",
    duration: "10 min",
    progress: 90,
    chapters: [
      { title: "Percussion Sounds", completed: true },
      { title: "Rhythmic Patterns", completed: true },
      { title: "Advanced Techniques", completed: true }
    ],
    interactive: {
      exercises: ["Match the Sound", "Create a Pattern", "Freestyle"],
      currentExercise: 0
    }
  },
  {
    id: 4,
    title: "Afrobeats Essentials",
    duration: "25 min",
    progress: 10,
    chapters: [
      { title: "Basic Rhythms", completed: false },
      { title: "Melodic Patterns", completed: false },
      { title: "Song Structure", completed: false }
    ],
    interactive: {
      exercises: ["Practice the Rhythm", "Create a Melody", "Compose a Song"],
      currentExercise: 0
    }
  },
  {
    id: 5,
    title: "Mbira Music Fundamentals",
    duration: "18 min",
    progress: 50,
    chapters: [
      { title: "Introduction to Mbira", completed: true },
      { title: "Basic Techniques", completed: true },
      { title: "Advanced Patterns", completed: false }
    ],
    interactive: {
      exercises: ["Play a Tune", "Improvise", "Create a Pattern"],
      currentExercise: 0
    }
  },
  {
    id: 6,
    title: "African Drumming Techniques",
    duration: "22 min",
    progress: 40,
    chapters: [
      { title: "Basic Drumming", completed: true },
      { title: "Complex Rhythms", completed: false },
      { title: "Group Performance", completed: false }
    ],
    interactive: {
      exercises: ["Follow the Beat", "Create a Rhythm", "Perform with Others"],
      currentExercise: 0
    }
  },
  {
    id: 7,
    title: "Kalimba Melodies",
    duration: "12 min",
    progress: 70,
    chapters: [
      { title: "Introduction to Kalimba", completed: true },
      { title: "Simple Tunes", completed: true },
      { title: "Advanced Melodies", completed: false }
    ],
    interactive: {
      exercises: ["Play a Melody", "Compose a Tune", "Improvise"],
      currentExercise: 0
    }
  },
  {
    id: 8,
    title: "African Vocal Techniques",
    duration: "30 min",
    progress: 20,
    chapters: [
      { title: "Basic Vocal Warm-ups", completed: true },
      { title: "Traditional Songs", completed: false },
      { title: "Harmonization", completed: false }
    ],
    interactive: {
      exercises: ["Sing Along", "Practice Harmonies", "Create a Song"],
      currentExercise: 0
    }
  }
];

const Learn = () => {
  const [selectedTutorial, setSelectedTutorial] = useState(null);

  if (selectedTutorial) {
    return (
      <TutorialDetail
        selectedTutorial={selectedTutorial}
        setSelectedTutorial={setSelectedTutorial}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Text style={{ color: 'white', fontSize: 24, margin: 16 }}>Learn Music Coding</Text>
      <ScrollView style={styles.scrollView}>
        {tutorials.map((tutorial) => (
          <TouchableOpacity
            key={tutorial.id}
            style={styles.tutorialContainer}
            onPress={() => setSelectedTutorial(tutorial)}
          >
            <Text style={styles.tutorialTitle}>{tutorial.title}</Text>
            <View style={styles.tutorialDurationContainer}>
              <Text style={styles.tutorialDuration}>{tutorial.duration}</Text>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progress,
                    { width: `${tutorial.progress}%` },
                  ]}
                />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Learn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f2937',
  },
  scrollView: {
    flex: 1,
  },
  tutorialContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  tutorialTitle: {
    fontSize: 18,
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
    marginRight: 8,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#334155',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#3B82F6',
  },
});