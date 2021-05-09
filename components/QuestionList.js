import React, { useState } from 'react'
import {
    View, 
    StyleSheet, 
    FlatList, 
    TouchableOpacity 
} from 'react-native'
import { connect } from 'react-redux'
import { MaterialIcons } from '@expo/vector-icons'
import { dark, light } from '../utils/helpers'
import QuestionCard from './QuestionCard'
import AddQuestion from './AddQuestion'
import TextBtn from './TextBtn'

const QuestionList = ({deckData, navigation, route}) => {
    const [addNew, setAddNew] = useState(false)
    const {deck} = route.params

    const questions = deckData[deck].questions

    return (
        <View style={styles.container}>
            <FlatList
            style={{marginVertical: 35, width: '85%'}}
            data={questions}
            keyExtractor={({question, answer}) => `${question}_${answer}`}
            renderItem={({item, index}) => (
                <QuestionCard question={item} index={index} deck={deck} />
            )}
            />

            {addNew 
              ? 
              (
                <View style={{alignItems:'flex-end'}}>
                    <TouchableOpacity onPress={() => setAddNew(false)}>
                        <MaterialIcons name="cancel" size={24} color={dark} />
                    </TouchableOpacity>
                    <AddQuestion deck={deck} />
                </View>
              )
              : 
              (
                <View style={styles.buttonContainer}>
                    <TextBtn 
                      handlePress={() => setAddNew(true)}
                      theme={'dark'}
                    >
                        Add Question
                    </TextBtn>
                {questions.length > 0 && 
                    (
                    <TextBtn 
                      handlePress={() => navigation.navigate('Quiz', {deck})}
                      theme={'light'}
                    >
                        Quiz
                    </TextBtn>
                    )}
                </View>
              )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    inputField: {
        borderWidth: 1, 
        borderRadius: 5,
        paddingHorizontal: 3
    },    
    displayButton: {
        padding: 10,
        margin: 1, 
        borderWidth: 1, 
        backgroundColor: dark, 
        color: light
    },
    buttonContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-evenly',
        marginBottom: 35 
    }
})

const mapStateToProps = ({deckData}) => ({deckData})  

export default connect(mapStateToProps)(QuestionList)