import { combineReducers, createStore } from 'redux'

export const CONTADOR_UP = 'CONTADOR_UP'
export const CONTADOR_DOWN = 'CONTADOR_DOWN'
export const INIT = 'INIT'

export function contadorUpAction(delta = 1) {
    return {type: CONTADOR_UP, delta}
}
export function contadorDownAction(delta = 1) {
    return {type: CONTADOR_DOWN, delta}
}

export function initAction() {
    return {type: INIT}
}

export function contadorReducer(state = 0, action) {
    switch(action.type) {
        case CONTADOR_UP:
            return state + action.delta
        case CONTADOR_DOWN:
            return state - action.delta
        case INIT:
            return 0
        default:
            return state
    }
}

export const globalReducer = combineReducers({
    contador: contadorReducer
})

const initialState = { contador: 0 }

const store = createStore(globalReducer, initialState)

export default store
