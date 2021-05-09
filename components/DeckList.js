import React, { useEffect, useState } from 'react'
import { 
    View,
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    ActivityIndicator, 
    FlatList 
} from 'react-native'
import { connect } from 'react-redux'
import { getData } from '../actions'
import * as Permissions from 'expo-permissions'
import { MaterialIcons } from '@expo/vector-icons'
import { getDeck } from '../utils/api'
import { getNotifications, setNotifications, dark, light } from '../utils/helpers'
import AddDeck from './AddDeck'
import DeckCard from './DeckCard'
import TextBtn from './TextBtn'
import WarningBox from './WarningBox'


const DeckList = ({deckData, dispatch, navigation}) => {
    // UI Hooks
    const [loading, setLoading] = useState(true)
    const [addNew, setAddNew] = useState(false)
    const [showHelp, setShowHelp] = useState(false)

    useEffect(() => {
        try {
            (async () => {
                dispatch(getData(await getDeck()))
            })()
            setLoading(false)
        } catch (error) {
            console.warn('Error retrieving deck info: ', error)
        }
    })

    // Notification Permissions Hooks
    const [permission, askPermission, getPermission] = Permissions.usePermissions(Permissions.NOTIFICATIONS)
    const [showWarning, setShowWarning] = useState(false)
    const [alreadyDismissed, setAlreadyDismissed] = useState(false)

    useEffect(() => {
        (async () => {
            setAlreadyDismissed( await getNotifications() )
        })()

        try {
            if (!permission) {
                (async () => { await getPermission() })()
            } else if (permission.status === 'undetermined') {
                askPermission()
                return 
            } else if (permission.status === 'denied') {
                setShowWarning(true)
                return 
            } else if (permission.status === 'granted' && alreadyDismissed === null) {
                (async() => await setNotifications())()
                return 
            } else {
                return
            }
        } catch (error) {
            console.warn('Error retrieving notification permissions: ', error)
        }
    }, [permission, showWarning, alreadyDismissed])
    
    if (showWarning && alreadyDismissed !== true) {
        return (
            <View style={styles.container}>
                <WarningBox />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={{alignSelf: 'flex-end', margin: 5}}>
                <TouchableOpacity onPress={() => setShowHelp(prevState => !prevState)}>
                    {!showHelp 
                      ? <MaterialIcons name="help" size={20} color='grey' />
                      : <MaterialIcons name='cancel' size={20} color='grey' />
                    }
                </TouchableOpacity>
            </View>
            {showHelp && (
            <View style={styles.helpContainer}>
                <Text style={{color: light}}>
                    &#x2022; Press a deck card to see its questions on the next screen.
                </Text>
                <Text style={{color: light}}>
                    &#x2022; Press and hold down on a deck card to see additional options.
                    Close the options by pressing and holding on the same card.  
                </Text>
                <Text style={{color: light}}>
                    &#x2022; Press and hold down on a question to delete it 
                    when looking at the questions in a deck on the next screen.
                </Text>
            </View>
            )}
            {loading === true
              ? (<ActivityIndicator color={dark} />) 
              : (
                <FlatList
                  style={{marginVertical: 10, width: '85%'}}
                  data={Object.keys(deckData ? deckData : {})}
                  keyExtractor={item => item}
                  renderItem={({item, index}) => (
                    <DeckCard 
                      questionCount={deckData[item].questions.length} 
                      index={index} 
                      deck={item}
                      navigation={navigation} /> 
                  )}
                />
                )
            }
                
            {addNew 
              ? (
                <View style={{alignItems: 'flex-end'}}>
                    <TouchableOpacity onPress={() => setAddNew(false)}>
                        <MaterialIcons name='cancel' size={24} color={dark} />
                    </TouchableOpacity>
                    <AddDeck />
                </View>
                )
              : (
                <View style={{marginBottom: 35}}>  
                    <TextBtn handlePress={() => {setAddNew(true)}} theme={'dark'}>
                        Add New Decks
                    </TextBtn>
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
    displayButton: {
        paddingHorizontal: 5, 
        borderWidth: 1, 
        backgroundColor: dark, 
        color: light
    },
    helpContainer: {
        backgroundColor: 'grey', 
        padding: 10, 
        margin: 5
    }
})

const mapStateToProps = ({deckData}) => ({deckData})  

export default connect(mapStateToProps)(DeckList)