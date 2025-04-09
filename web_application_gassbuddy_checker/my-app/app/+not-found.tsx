import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NotFound() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>404 - Page Not Found</Text>
            <Text style={styles.message}>Sorry, the page you are looking for does not exist.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 10,
    },
});