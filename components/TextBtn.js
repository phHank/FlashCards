import React from 'react'
import {Text, TouchableOpacity, StyleSheet} from 'react-native'
import { dark, light } from '../utils/helpers'

const TextBtn = ({children, handlePress, theme}) => {
    return (
    <TouchableOpacity onPress={() => handlePress()}>
        <Text style={styles[theme]}>{children}</Text>
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    dark: {
        padding: 10,
        margin: 1, 
        borderWidth: 1, 
        borderColor: light, 
        backgroundColor: dark, 
        color: light,
        borderRadius: 5
    },
    light: {
        padding: 10,
        margin: 1, 
        borderWidth: 1, 
        backgroundColor: light, 
        color: dark,
        borderRadius: 5
    }
})

export default TextBtn