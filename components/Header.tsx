import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'

import { Ionicons } from '@expo/vector-icons'

import { View, Text } from '@/components/Themed'

const Header = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>
                    Sonic Studio
                </Text>
                <TouchableOpacity
                    style={styles.settingsButton}
                    onPress={() => console.log('Settings Clicked')}
                >
                    <Ionicons name="settings" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        padding: 16,
        width: '100%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    settingsButton: {
        padding: 8,
        borderRadius: 4,
    },
})