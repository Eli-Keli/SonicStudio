import Header from '../components/Header';
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native'

import TutorialDetail from '../components/TutorialDetail';
import { SafeAreaView } from 'react-native-safe-area-context';

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


interface Tutorial {
    id: number;
    title: string;
    duration: string;
    progress: number;
    chapters: { title: string; completed: boolean }[];
    interactive: { exercises: string[]; currentExercise: number };
}


const Learn = () => {
  const [selectedTutorial, setSelectedTutorial] = React.useState<Tutorial | null>(null);


  return selectedTutorial ? (
    <TutorialDetail selectedTutorial={selectedTutorial} setSelectedTutorial={setSelectedTutorial} />
  ) : (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView>
      <Text style={styles.title}>Learn Music Coding</Text>
      <View style={styles.tutorialList}>
        {tutorials.map((tutorial) => (
          <View
            key={tutorial.id}
            style={styles.tutorialCard}
            onTouchEnd={() => setSelectedTutorial(tutorial)}
          >
            <View style={styles.tutorialHeader}>
              <Text style={styles.tutorialTitle}>{tutorial.title}</Text>
              <Text style={styles.tutorialDuration}>{tutorial.duration}</Text>
            </View>
            <View style={styles.progressBarBackground}>
              <View
                style={[styles.progressBarForeground, { width: `${tutorial.progress}%` }]}
              />
            </View>
          </View>
        ))}
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Learn

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1f2937",
  },
  tutorialList: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 16,
    textAlign: 'center',
  },
  tutorialCard: {
    backgroundColor: '#374151',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  tutorialHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  tutorialTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  tutorialDuration: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  progressBarBackground: {
    height: 10,
    backgroundColor: '#4B5563',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBarForeground: {
    height: '100%',
    backgroundColor: '#10B981',
  },
});