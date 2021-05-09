export const LOAD_DATA = 'LOAD_DATA'

export const getData = deckData => {
    return {
        type: LOAD_DATA,
        deckData
    }
}