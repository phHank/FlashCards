import {LOAD_DATA} from '../actions'

const questions = (state={}, action) => {
    switch (action.type) {
        case LOAD_DATA:
            return {
                ...state, 
                deckData: {
                    ...action.deckData
                }
            }
        default:
            return state
    }
}

export default questions