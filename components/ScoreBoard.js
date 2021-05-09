import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const ScoreBoard = ({highScore, userScore, totalQuestions, endGame, questionsRemaining}) => {
    const finalScore = Math.round(userScore / totalQuestions * 100) 
    
    return (
        <View style={styles.scoreBoard}>
            {(userScore > highScore && endGame) && (
                <Text style={{color: '#ff6961'}}>Congratulations! New High Score!</Text>
            )}
            <Text>Your Score: {userScore}</Text>
            {totalQuestions !== undefined && (<Text>Percentage: {finalScore}%</Text>)}
            <Text>{(userScore > highScore && endGame) && 'Former'} High Score: {highScore}</Text>
            {questionsRemaining > 0 && (
            <Text>{endGame === true ? 'Unanswered' : 'Remaining'} Questions: {questionsRemaining}</Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    scoreBoard: {
        borderWidth: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: 35,
        marginBottom: 10,
        padding: 35,
        borderRadius: 100
    }
})

export default ScoreBoard