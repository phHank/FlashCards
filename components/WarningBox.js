import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import TextBtn from './TextBtn'
import { setNotifications } from '../utils/helpers'


const WarningBox = ({children, deck, setConfirmDelete}) => {
    return (
        <View style={styles.warningBox}>
            {children === undefined 
                ? 
                (
                <View>    
                    <Text style={{fontWeight: 'bold'}}>Notifications have been disabled!</Text>
                    <Text>FlashCards works best using notifications.</Text>
                    <Text style={{marginBottom: 35}}>Change permissions in your device's settings.</Text>
                    <TextBtn 
                        theme={'dark'} 
                        handlePress={async () => {await setNotifications(true)}}
                    >
                        Dismiss
                    </TextBtn>
                </View>
                )
                :
                (
                <Text>{children}</Text>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    warningBox: {
        backgroundColor: '#ff6961',
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: 35,
        marginBottom: 10,
        padding: 35,
        borderRadius: 100
    }
})

export default WarningBox