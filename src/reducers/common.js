import * as types from '../actions/types'
import Immutable from 'immutable'

const INITIAL_STATE = Immutable.fromJS({
    areas: [],
    modal: false,
    modalClientes: false
})

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.SHOW_MODAL:
            state = state.set('modal', !state.get('modal'))
            return state

        case types.SHOW_MODAL_CLIENTES:
            state = state.set('modalClientes', !state.get('modalClientes'))
            return state

        default:
            return state
    }
}