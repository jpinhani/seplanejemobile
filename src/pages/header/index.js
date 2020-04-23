import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function headerSePlaneje() {
    return (
        <LinearGradient
            colors={['#81d6f3', '#B6BAC5']}
            style={[{ flex: 0 }, styles.div]}
        >
            <Text style={styles.se}>Se<Text style={styles.planeje}>Planeje</Text></Text>
        </LinearGradient >
    )
}

const styles = StyleSheet.create({
    div: {
        alignItems: 'center',
        marginTop: 0,
        paddingTop: 25,
    },
    se: {
        fontSize: 38,
        fontWeight: 'bold',
        color: 'red',
    },
    planeje: {
        marginTop: 45,
        fontSize: 18,
        color: 'white',
    }
});
