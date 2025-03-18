import { StyleSheet } from "react-native"

import { Text, useThemeColor, View } from '@/components/Themed';
import { Ionicons } from "@expo/vector-icons";

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

    const backgroundColor = useThemeColor({
        light: "#f3f4f6",
        dark: "#1e1e1e",
    }, "background");

    const textColor = useThemeColor({}, 'text');

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <View style={[styles.header, { backgroundColor }]}>
                <View style={{ backgroundColor}}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.author}>By {item.author}</Text>
                </View>
                <View style={styles.priceButton}>
                    <Text style={styles.priceText}>{item.price}</Text>
                </View>
            </View>

            <View style={[styles.stats, { backgroundColor }]}>
                <View style={[styles.statItem, { backgroundColor }]}>
                    <Ionicons name="star" size={16} color="orange" />
                    <Text style={styles.statText}>{item.rating}</Text>
                </View>
                <View style={[styles.statItem, { backgroundColor }]}>
                    <Ionicons name="download" size={16} color={textColor} />
                    <Text style={styles.statText}>{item.downloads}</Text>
                </View>
            </View>

            <View style={{ backgroundColor }}>
                {item.reviews.map((review, index) => (
                    <View key={index} style={[styles.review, { backgroundColor }]}>
                        <View style={[styles.reviewHeader, { backgroundColor }]}>
                            <Text style={styles.reviewUser}>{review.user}</Text>
                            <View style={[styles.reviewRating, { backgroundColor }]}>
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
                        <Text style={{ backgroundColor }}>{review.text}</Text>
                    </View>
                ))}
            </View>

            <View style={[styles.reviewButton, { backgroundColor }]}>
                <Ionicons name="chatbox" size={16} color="#3B82F6" />
                <Text style={styles.reviewButtonText}>Write a Review</Text>
            </View>
        </View>
    )
}

export default MarketPlaceItem

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderRadius: 8,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    title: {
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
        marginLeft: 4,
    },
    review: {
        marginBottom: 16,
    },
    reviewHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    reviewUser: {
        fontWeight: "bold",
    },
    reviewRating: {
        flexDirection: "row",
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