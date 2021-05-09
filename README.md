# FlashCards Project

This is the final assessment project for Udacity's React Native course.

The app allows android users to create decks of flashcards and add questions to a deck. Users can delete single questions and entire decks, a user will be requested to confirm a deck deletion if it contains questions, the same sanity check is not performed when the deck is empty. Users can quiz themselves on a deck and receive a score at upon termination of the quiz. High scores are stored in the devices local memory.

[React Navigation](https://github.com/react-navigation) facilitates navigation between views.

Hooks are used in this project as the version of React is > v16.8. 

This project utilise state management, in the form of Redux. Decks and Questions are managed by the store which facilitates consistant information display throughout the app. 


## Suggested Improvements:

- Fix a known bug: a warning appears on first start up due to a unresolved promise (API to local storage).
- Create a view to list highscore per deck and ability to clear scores.
- The app is an eyesore and better styling would not go amiss.
- The app was built solely using an android device. The iOS version was buggy.
- The app has some latency and would benefit from performance optimisation.
- Update the dependencies to latest versions.  

## Testing Locally
    - Download the project files. 
        - cd into the project's root directory
        - `npm install`
        - `expo start`


## Data

There are two types of objects stored in local storage:

* Decks
* Questions

## Create React Native App

This project was bootstrapped with [Create React Native App](https://github.com/expo/create-react-native-app).