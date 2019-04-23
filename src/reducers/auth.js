import * as types from '../actions/types'

const INITIAL_STATE = { isAuthenticated: false, user: null }

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.INICIAR_SESION:
            return { isAuthenticated: true, user: action.payload }
        case types.CERRAR_SESION:
            return { isAuthenticated: false, user: null }
        default:
            return state
    }
}