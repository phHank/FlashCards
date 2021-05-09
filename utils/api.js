import AsyncStorage from '@react-native-async-storage/async-storage'

const DECK_KEY = 'FlashCards:decks'

export const getDeck = async (deckName=undefined) => {
    let jsonData = await AsyncStorage.getItem(DECK_KEY)
    let data = JSON.parse(jsonData)

    return deckName === undefined ? data : data[deckName]
}

export const createDeck = async (deckName) => {
    if (!deckName) {
        console.warn(`'${deckName}' is not a valid name for a deck. Please try again.`)
        return 
    }

    const jsonDeck = JSON.stringify({
        [deckName.trim()]: {
            questions: []
        }
    })

    let jsonData = await AsyncStorage.getItem(DECK_KEY)
    let data = JSON.parse(jsonData)

    if (data === null) {
        try {
            await AsyncStorage.setItem(DECK_KEY, jsonDeck)
          } catch (error) {
              console.warn(`Error saving new deck '${deckName}': `, error)
          }

        return 
    }

    await AsyncStorage.mergeItem(DECK_KEY, jsonDeck)
}

export const deleteDeck = async (deckName) => {
    if (!deckName) {
        console.warn(`'${deckName}' could not be deleted. Please try again.`)
        return 
    }

    let jsonData = await AsyncStorage.getItem(DECK_KEY)
    let data = JSON.parse(jsonData)

    delete data[deckName]

    await AsyncStorage.setItem(DECK_KEY, JSON.stringify(data))
}

export const createQuestion = async (deckName, question) => {
    if (!deckName) {
        console.warn(`Could not add question to '${deckName}'. Please try again.`)
        return 
    }

    let jsonData = await AsyncStorage.getItem(DECK_KEY)
    let data = JSON.parse(jsonData)

    data[deckName].questions.push(question)

    await AsyncStorage.mergeItem(DECK_KEY, JSON.stringify(data))
}

export const deleteQuestion = async (deckName, question) => {
    if (!deckName) {
        console.warn(`Could not delete that question from '${deckName}'. Please try again.`)
        return 
    }


    let jsonData = await AsyncStorage.getItem(DECK_KEY)
    let data = JSON.parse(jsonData)

    const filteredQuestions = data[deckName].questions.filter(targetQ => (
        targetQ.question !== question.question && targetQ.answer !== question.answer
        ))
    data[deckName].questions = filteredQuestions

    await AsyncStorage.setItem(DECK_KEY, JSON.stringify(data))
}