import React, { useEffect } from 'react'
import {View, Text, StyleSheet, Button} from 'react-native'
import * as Permissions from 'expo-permissions'
import { 
    addNewHighScore, 
    clearNotifications, 
    setNotifications, 
    dark, 
    light 
} from '../utils/helpers'
import ScoreBoard from './ScoreBoard'

const QuizComplete = ({
    highScore, userScore, totalQuestions, endGame, navigation, deck, questionsRemaining
}) => {
    const [permission, askPermission, getPermission] = Permissions.usePermissions(Permissions.NOTIFICATIONS)

    // Reset Notifications Reminder
    useEffect(() => {
        if (!permission) {
            (async() => await getPermission())()
            return 
        } 

        if (permission.status === 'granted') {
            clearNotifications()
              .then(setNotifications())
        }
    }, [permission])

    // Update HighScore
    useEffect(() => {
        if (userScore > highScore) {
            const updateScores = async () => await addNewHighScore(deck, userScore)

            updateScores()
        }
    }, [])
    
    return (
        <View>
            <Text style={{alignSelf: 'center', fontSize: 35}}>Quiz Complete!</Text>
            <ScoreBoard 
              highScore={highScore} 
              userScore={userScore}
              totalQuestions={totalQuestions}
              endGame={endGame}
              questionsRemaining={questionsRemaining}
            /> 
            <Button 
              title='Go &#127968;' 
              color='#000'
              onPress={() => navigation.navigate('Decks') }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    displayButton: {
        padding: 10,
        margin: 1, 
        borderWidth: 1, 
        backgroundColor: dark, 
        color: light
    }
})

export default QuizComplete