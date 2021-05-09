import React, { useEffect, useState, useCallback } from 'react'
import { View, StyleSheet, Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { connect } from 'react-redux'
import { shuffleAnswers, HIGH_SCORE, dark, light } from '../utils/helpers'
import QuestionCard from './QuestionCard'
import QuizComplete from './QuizComplete'
import ScoreBoard from './ScoreBoard'

const Quiz = ({deckData, route, navigation}) => {    
    const {deck} = route.params
    const questions = deckData[deck].questions
    
    const [highScore, setHighScore] = useState(0)
    const [questionsAnswered, setQuestionsAnswered] = useState(0)
    const [correctCount, setCorrectCount] = useState(0)
    const [endGame, setEndGame] = useState(false)
    const shuffledQuestions = useCallback(shuffleAnswers(questions), [endGame])

    useEffect(() => {
        const getHighScore = async () => {
            let jsonScores = await AsyncStorage.getItem(HIGH_SCORE)
            let scores = JSON.parse(jsonScores)
        
            if (scores === null) {
                setHighScore(0)
                return 
            } else if (scores[deck] === undefined) {
                setHighScore(0)
                return
            }
            
            setHighScore(scores[deck])
        }
        getHighScore()
    }, [])

    const stopper = Math.min(questionsAnswered, questions.length -1)

    const handlePressCorrect = () => {
        setQuestionsAnswered(count => ++count)

        if (questions[stopper].answer === shuffledQuestions[stopper].answer) {
            setCorrectCount(count => ++count)
        }

        if (stopper === questions.length - 1) {
            setEndGame(true)
        }
    }

    const handlePressIncorrect = () => {
        setQuestionsAnswered(count => ++count)

        if (questions[stopper].answer !== shuffledQuestions[stopper].answer) {
            setCorrectCount(count => ++count)
        }

        if (stopper >= questions.length - 1) {
            setEndGame(true)
        }
    }

    return (
        <View style={styles.container}>
            {endGame 
              ? (<QuizComplete  
                    userScore={correctCount}
                    highScore={highScore}
                    totalQuestions={questions.length}
                    endGame={endGame}
                    navigation={navigation}
                    deck={deck}
                    questionsRemaining={questions.length - questionsAnswered}
                />) 
              : (
              <View>
                <QuestionCard 
                  question={shuffledQuestions[stopper]} 
                  index={stopper} 
                  handlePressCorrect={handlePressCorrect}
                  handlePressIncorrect={handlePressIncorrect}
                />
                <ScoreBoard 
                  highScore={highScore} 
                  userScore={correctCount}
                  endGame={endGame}
                  questionsRemaining={questions.length - questionsAnswered}
                />
                {questionsAnswered > 0 && (
                    <View style={{marginTop: 35, width: '25%', alignSelf: 'center'}}>
                        <Button 
                        title='End Quiz'
                        color='#ff6961'
                        onPress={() => {
                            setEndGame(true)
                        }}
                        />
                    </View>
                )}
            </View>
            )}
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

const mapStateToProps = state => state

export default connect(mapStateToProps)(Quiz)