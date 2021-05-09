import React, { useState } from 'react'
import { 
    KeyboardAvoidingView, 
    TextInput, 
    Button, 
    View, 
    StyleSheet 
} from 'react-native'
import { createQuestion } from '../utils/api'
import { dark, light } from '../utils/helpers'

const AddDeck = ({deck}) => {
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView>
                <TextInput 
                  style={styles.inputField}
                  value={question}
                  onChangeText={text => setQuestion(text)}
                  placeholder="New Question"
                />
                <TextInput 
                  style={styles.inputField}
                  value={answer}
                  onChangeText={text => setAnswer(text)}
                  placeholder="Answer"
                />
                <Button 
                  title='ADD QUESTION' 
                  color={dark}
                  disabled={!question || !answer} 
                  onPress={async () => {
                    await createQuestion(deck, {question, answer}) 
                    setQuestion('')
                    setAnswer('')
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