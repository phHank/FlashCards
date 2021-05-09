import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Button, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { MaterialIcons } from '@expo/vector-icons'
import { deleteDeck } from '../utils/api'
import { dark, light } from '../utils/helpers'
import TextBtn from './TextBtn'
import AddQuestion from './AddQuestion'
import WarningBox from './WarningBox'


const DeckCard = ({questionCount, index, deck, navigation}) => {
    const [showOptions, setShowOptions] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [addNew, setAddNew] = useState(false)

    const confirmDeleteDeck = async (questionCount, deck) => {
        if (questionCount > 0) {
            setConfirmDelete(true)
            return
        }

        await deleteDeck(deck)
    }
    
    return (
        <View>
            {addNew === true && (
            <View style={{alignItems:'flex-end'}}>
                <TouchableOpacity onPress={() => setAddNew(false)}>
                    <MaterialIcons name="cancel" size={24} color={dark} />
                </TouchableOpacity>
                <AddQuestion deck={deck} />
            </View>
            )}
            {confirmDelete === false 
              ? 
              (
              <TouchableOpacity 
                style={index % 2 === 0 ? styles.darkContainer : styles.lightContainer}
                onLongPress={() => setShowOptions(prevState => !prevState)}
                onPress={() => {
                    setShowOptions(false)
                    navigation.navigate('Questions', {deck})
                }}
                >
                    <Text style={index % 2 === 0 ? styles.darkText  : styles.lightText }>
                        <Text style={{fontWeight: 'bold'}}>{deck}</Text>
                    </Text>
                    <Text style={index % 2 === 0 ? {color: light} : {color: dark} }>
                        Questions: {questionCount}
                    </Text>
                    {showOptions && 
                    (
                    <View style={styles.optionsContainer}>
                        <TextBtn theme={'dark'} handlePress={() => setAddNew(true)}>
                            ADD Q
                        </TextBtn>
                        <Button 
                        title='Delete' 
                        onPress={async () => confirmDeleteDeck(questionCount, deck)}
                        color='#ff6961'
                        />
                        {questionCount > 0 && (
                            <TextBtn theme={'light'} handlePress={() => navigation.navigate('Quiz', {deck})}>
                                QUIZ
                            </TextBtn>
                        )}
                    </View>   
                    )
                    }
              </TouchableOpacity>
              )
              : 
              (
              <View>
                  <WarningBox>{`Sure you want to delete ${deck}?`}</WarningBox>
                  <View style={styles.optionsContainer}>
                    <TextBtn
                        theme={'dark'} 
                        handlePress={async () => {await deleteDeck(deck)}}
                    >
                        Yes
                    </TextBtn>
                    <TextBtn
                        theme={'light'} 
                        handlePress={() => setConfirmDelete(false)}
                    >
                        No
                    </TextBtn>
                  </View>
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
        borderRadius: 15, 
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    lightContainer: {
        backgroundColor: light,
        borderWidth: 1, 
        borderColor: dark,
        borderRadius: 15, 
        paddingVertical: 5,
        paddingHorizontal: 10 
    },
    darkText: {
        color: light, 
        alignSelf: 'center', 
        fontSize: 24
    },
    lightText: {
        color: dark,
        alignSelf: 'center', 
        fontSize: 24
    },
    optionsContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-around'
    }
})

const mapStateToProps = (state, {questionCount, index, deck, navigation}) => ({
    deck, 
    questionCount, 
    index,
    navigation
})

export default connect(mapStateToProps)(DeckCard)