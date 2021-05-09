import 'react-native-gesture-handler'
import React from 'react'
import { createStore } from 'redux'
import reducer from './reducers'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { dark, light } from './utils/helpers'
import DeckList from './components/DeckList'
import QuestionList from './components/QuestionList'
import Quiz from './components/Quiz'

const Stack = createStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      {<Provider store={createStore(reducer)}>
        <Stack.Navigator screenOptions={options} initialRouteName='Decks'>
          <Stack.Screen name="Decks" component={DeckList} />
          <Stack.Screen 
            name='Questions' 
            component={QuestionList} 
            options={({ route }) => ({ title: route.params.deck })} />
          <Stack.Screen 
            name="Quiz" 
            component={Quiz} 
            options={({ route }) => ({ title: `${route.params.deck} Quiz` })}
            />
        </Stack.Navigator>
      </Provider>}
    </NavigationContainer>
  )
}

const options = {
  headerStyle: {backgroundColor: dark},
  headerTintColor: light,
  headerTitleStyle: { alignSelf: 'center' }
}

export default App