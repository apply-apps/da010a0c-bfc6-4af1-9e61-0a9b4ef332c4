// Filename: index.js
// Combined code from all files

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';

const colors = ['red', 'blue', 'green', 'yellow'];

const ColorItem = ({ color, onPress, disabled }) => {
    return (
        <TouchableOpacity onPress={() => onPress(color)} disabled={disabled} style={{ opacity: disabled ? 0.3 : 1 }}>
            <View style={[styles.colorItem, { backgroundColor: color }]} />
        </TouchableOpacity>
    );
};

export default function App() {
    const [selectedColor, setSelectedColor] = useState(colors[0]);
    const [collectedColors, setCollectedColors] = useState([]);

    const handleColorSelect = (color) => {
        if (color === selectedColor) {
            setCollectedColors([...collectedColors, color]);
            setSelectedColor(colors[collectedColors.length + 1] || 'done');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Sort the Colors</Text>
            {selectedColor !== 'done' ? (
                <Text style={styles.currentColorText}>Select the {selectedColor} item</Text>
            ) : (
                <Text style={styles.successText}>All colors collected!</Text>
            )}
            <View style={styles.itemsContainer}>
                {colors.map((color) => (
                    <ColorItem
                        key={color}
                        color={color}
                        onPress={handleColorSelect}
                        disabled={collectedColors.includes(color)}
                    />
                ))}
            </View>
            {selectedColor === 'done' && <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} />}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    currentColorText: {
        fontSize: 18,
        marginBottom: 20,
    },
    successText: {
        fontSize: 18,
        marginBottom: 20,
        color: 'green',
    },
    itemsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    colorItem: {
        width: 100,
        height: 100,
        margin: 10,
        borderRadius: 10,
    },
});