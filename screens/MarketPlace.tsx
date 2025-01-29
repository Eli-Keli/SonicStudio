import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import MarketPlaceItem from 'components/MarketPlaceItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from 'components/Header';

const marketplace = [
  {
      title: "African Drums Pack",
      price: "500 KES",
      author: "James Kamau",
      rating: 4.5,
      reviews: [
          { user: "Michael", text: "Amazing authentic sounds!", rating: 5 },
          { user: "Sarah", text: "Great for traditional fusion", rating: 4 }
      ],
      downloads: 1200
  },
  {
      title: "Traditional Samples",
      price: "300 KES",
      author: "Maria Njeri",
      rating: 4.8,
      reviews: [
          { user: "David", text: "Perfect for modern African music", rating: 5 },
          { user: "Lisa", text: "High quality recordings", rating: 4.5 }
      ],
      downloads: 850
  },
  {
      title: "Synthwave Pack",
      price: "800 KES",
      author: "Chris Mwenda",
      rating: 4.2,
      reviews: [
          { user: "John", text: "Great for 80s inspired music", rating: 4 },
          { user: "Alice", text: "Good value for money", rating: 4.5 }
      ],
      downloads: 950
  },
];

const MarketPlace = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search sound packs..."
          placeholderTextColor="gray"
        />
      </View>
      {marketplace.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <MarketPlaceItem item={item} />
        </View>
      ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default MarketPlace

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1e293b',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#334155',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: 'white',
    padding: 8,
  },
  itemContainer: {
    marginBottom: 16,
  },
});