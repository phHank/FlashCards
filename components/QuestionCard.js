import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { deleteQuestion } from '../utils/api'
import { dark, light } from '../utils/helpers'
import TextBtn from './TextBtn'

const QuestionCard = ({question, index, deck, handlePressCorrect, handlePressIncorrect}) => {
    const [showing, setShowing] = useState('question')

    return (
        <View>
        <TouchableOpacity 
          style={index % 2 === 0 ? styles.darkContainer : styles.lightContainer}
          onLongPress={async () => handlePressCorrect ? undefined : await deleteQuestion(deck, question)}
          onPress={() => setShowing(showing === 'question' ? 'answer' : 'question')}
          >
            <Text style={index % 2 === 0 ? styles.darkText  : styles.lightText }>
                {`${showing === 'question' ? 'Q:' : 'A:'} ${question[showing]}`} 
            </Text>
        </TouchableOpacity>
        { handlePressCorrect !== undefined && 
            (
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 35}}>
                <TextBtn
                    handlePress={() => {
                        handlePressCorrect()
                        setShowing('question')
                    }}
                    theme={'dark'}
                >
                    Correct
                </TextBtn>
                <TextBtn 
                    handlePress={() => {
                        handlePressIncorrect()
                        setShowing('question')
                    }}
                    theme={'light'}
                >
                    Incorrect
                </TextBtn>
            </View>
            )
        }
        </View>
    )
}

const styles = StyleSheet.create({
    darkContainer: {
        backgroundColor: dark,
        borderWidth: 2, 
        borderColor: light,
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 15
    },
    lightContainer: {
        backgroundColor: light,
        borderWidth: 1, 
        borderColor: dark,
        paddingVertical: 5,
        paddingHorizontal: 20 ,
        borderRadius: 15
    },
    darkText: {
        color: light, 
        alignSelf: 'center', 
        fontSize: 24
    },
    lightText: {
        alignSelf: 'center', 
        fontSize: 24,
        color: dark
    }
})

export default QuestionCard