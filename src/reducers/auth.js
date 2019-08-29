import * as types from '../actions/types'

const INITIAL_STATE = { isAuthenticated: false, user: null, rol : null }

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.INICIAR_SESION:
            return { isAuthenticated: true, user: action.payload.user, rol : action.payload.rol }
        case types.CERRAR_SESION:
            return { isAuthenticated: false, user: null, rol : null }
        default:
            return state
    }
}