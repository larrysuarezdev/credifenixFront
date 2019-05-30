import * as types from '../actions/types'
import Immutable from 'immutable'

const INITIAL_STATE = Immutable.fromJS({
    clientesNew: 0,
    // modal: false,
    // modalClientes: false
})

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.GET_DASHBOARD:
            console.log(action.payload)
            state = state.set('clientesNew', action.payload.clientesNew)
            return state

        // case types.SHOW_MODAL_CLIENTES:
        //     state = state.set('modalClientes', !state.get('modalClientes'))
        //     return state

        default:
            return state
    }
}