import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

interface Item {
    title: string;
    author: string;
    price: string;
    rating: number;
    downloads: number;
    reviews: {
      user: string;
      rating: number;
      text: string;
    }[];
  }


  const MarketPlaceItem = ({ item }: { item: Item }) => {
    return (
        <View style={styles.container}>
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.author}>By {item.author}</Text>
            </View>
            <View style={styles.priceButton}>
              <Text style={styles.priceText}>{item.price}</Text>
            </View>
          </View>
          
          <View style={styles.stats}>
            <View style={styles.statItem}>
              <Ionicons name="star" size={16} color="yellow" />
              <Text style={styles.statText}>{item.rating}</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="download" size={16} color="white" />
              <Text style={styles.statText}>{item.downloads}</Text>
            </View>
          </View>
        
          <View style={styles.reviews}>
            {item.reviews.map((review, index) => (
              <View key={index} style={styles.review}>
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewUser}>{review.user}</Text>
              <View style={styles.reviewRating}>
                {[...Array(5)].map((_, i) => (
                  <Ionicons
                key={i}
                name="star"
                size={12}
                color={i < review.rating ? "#f59e0b" : "gray"}
                  />
                ))}
              </View>
            </View>
            <Text style={styles.reviewText}>{review.text}</Text>
              </View>
            ))}
          </View>
        
          <View style={styles.reviewButton}>
            <Ionicons name="chatbox" size={16} color="#3B82F6" />
            <Text style={styles.reviewButtonText}>Write a Review</Text>
          </View>
        </View>
    )
}

export default MarketPlaceItem

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#333",
      padding: 16,
      borderRadius: 8,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 16,
    },
    title: {
      color: "white",
      fontSize: 20,
      fontWeight: "bold",
    },
    author: {
        color: "gray",
        fontSize: 16,
    },
    priceButton: {
      backgroundColor: "#3B82F6",
      padding: 8,
      borderRadius: 4,
    },
    priceText: {
      color: "white",
      fontWeight: "bold",
    },
    stats: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 16,
    },
    statItem: {
      flexDirection: "row",
      alignItems: "center",
    },
    statText: {
      color: "white",
      marginLeft: 4,
    },
    reviews: {},
    review: {
      marginBottom: 16,
    },
    reviewHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 8,
    },
    reviewUser: {
      color: "white",
      fontWeight: "bold",
    },
    reviewRating: {
      flexDirection: "row",
    },
    reviewText: {
      color: "white",
    },
    reviewButton: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 16,
    },
    reviewButtonText: {
      color: "#3B82F6",
      marginLeft: 8,
    },
})