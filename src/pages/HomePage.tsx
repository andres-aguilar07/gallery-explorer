import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export const HomePage = () => {
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.title}>HomePage</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    }
})