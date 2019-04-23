import * as types from '../actions/types'
import Immutable from 'immutable'

const INITIAL_STATE = Immutable.fromJS({
    message: null,
    msgBox: {
        show: false,
        message: null
    },
    msgInfoBox: {
        show: false,
        message: null
    }
})

export default function (state = INITIAL_STATE, action) {
    switch(action.type) {
        case types.MOSTRAR_MENSAJE:
            console.log('reducer: ', action.payload)
            state = state.set('message', action.payload)
            return state
        case types.LIMPIAR_MENSAJES:
            state = state.set('message', null)
            return state
        case types.MOSTRAR_MESSAGE_BOX:
            state = state.setIn(['msgBox', 'show'], action.payload.show)
            state = state.setIn(['msgBox', 'message'], action.payload.message)
            return state
        case types.MOSTRAR_MESSAGE_INFO_BOX:
            state = state.setIn(['msgInfoBox', 'show'], action.payload.show)
            state = state.setIn(['msgInfoBox', 'message'], action.payload.message)
            return state
        default:
            return state
    }
}
