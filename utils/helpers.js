import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Notifications from 'expo-notifications'

// Quiz
export const shuffleAnswers = (questionsArray) => {
    const shuffledAnswers = questionsArray.map(question => question.answer)
      .sort(() => 0.5 - Math.random())

    
    return questionsArray.map((question, i) => ({
        question: question.question, 
        answer: shuffledAnswers[i]
    }))
}

// Scores
export const HIGH_SCORE = 'FlashCards:highscores'

export const addNewHighScore = async (deck, score) => {
  await AsyncStorage.mergeItem(HIGH_SCORE, JSON.stringify({[deck]: score}))
}

// Notifications 
export const NOTIFICATION_SET = 'FlashCards:notifications'

const createNotification = () => {
  return {
    title: "Time to Study?",
    body: "🤓 Don't forget to do your daily quiz",
    sound: true,
    vibrate: true
  }
}

export const clearNotifications = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync()
}

export const setNotifications = async (dismissed=false) => {
  if (dismissed === true) {
    await AsyncStorage.setItem(NOTIFICATION_SET, JSON.stringify(timestamp))
    return 
  }

  
  await Notifications.scheduleNotificationAsync({
    content: createNotification(),
    trigger: {
      seconds: 60 * 60 * 23, // every 23 hours,
      repeats: true
    }
  })

}

export const getNotifications = async() => {
  let jsonResponse = await AsyncStorage.getItem(NOTIFICATION_SET)

  return JSON.parse(jsonResponse)
}

// Colors
export const dark = '#000'
export const light = '#fff'