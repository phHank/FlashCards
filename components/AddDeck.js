import React, { useState } from 'react'
import { 
    KeyboardAvoidingView, 
    TextInput, 
    Button, 
    View, 
    StyleSheet 
} from 'react-native'
import { createDeck } from '../utils/api'
import { dark, light } from '../utils/helpers'

const AddDeck = () => {
    const [deckName, setDeckName] = useState('')

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView style={{flexDirection: 'row'}}>
                <TextInput 
                style={styles.inputField}
                value={deckName}
                onChangeText={text => setDeckName(text)}
                placeholder={"New Deck Name"}
                />
                <Button 
                title='ADD DECK' 
                color={dark}
                disabled={!deckName} 
                onPress={async () => {
                    await createDeck(deckName) 
                    setDeckName('')
                    }} 
                />
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: dark, 
        width: '100%', 
        padding: 20, 
        alignItems: 'center',
        borderRadius: 5
    },
    inputField: {
        borderWidth: 1, 
        borderRadius: 5,
        paddingHorizontal: 3,
        backgroundColor: light
    }
})

export default AddDeck