
import React from 'react';
import { ScrollView, StyleSheet, TextInput } from 'react-native';

import { useThemeColor, View } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';
import MarketPlaceItem from '@/components/MarketPlaceItem';
import { marketplace } from '@/constants/data';

export default function MarketPlace() {
  const [isSearchFocused, setSearchFocused] = React.useState(false);

  const backgroundColor = useThemeColor(
    { light: 'rgba(194, 195, 203, 0.5)', dark: '#1E1E1E' },
    'background'
  );

  const borderColor = useThemeColor(
    { light: '#ccc', dark: '#1E1E1E' },
    'border'
  );

  const textColor = useThemeColor({}, 'text');

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[
          styles.searchContainer,
          { backgroundColor, borderColor: isSearchFocused ? textColor : borderColor },
          isSearchFocused && styles.seachContainerFocused
        ]}>
          <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search sound packs..."
            placeholderTextColor="gray"
            onFocus={() => setSearchFocused(true)}
          />
        </View>
        {marketplace.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <MarketPlaceItem item={item} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    padding: 8,
    marginVertical: 16,
    backgroundColor: '#333',
  },
  seachContainerFocused: {
    borderWidth: 1,
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
