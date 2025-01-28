import Header from 'components/Header';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native'

import TutorialDetail from 'components/TutorialDetail';

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
        title: "Kora Melodies in Code",
        duration: "20 min",
        progress: 30,
        chapters: [
            { title: "Introduction to Kora", completed: true },
            { title: "Basic Melodies", completed: false },
            { title: "Improvisation", completed: false }
        ],
        interactive: {
            exercises: ["Play Along", "Modify the Melody", "Create a Loop"],
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
    <View style={styles.container}>
      <Header />
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
    </View>
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