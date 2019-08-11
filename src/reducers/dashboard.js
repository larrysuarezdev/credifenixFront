import * as types from '../actions/types'
import Immutable from 'immutable'

const INITIAL_STATE = Immutable.fromJS({
    clientesNew: [],
    cantNew: 0,
    cantRen: 0
    // labels: [],
    // data_N: [],
    // data_R: []
})

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.GET_DASHBOARD:
            // console.log(action.payload)
            state = state.set('cantNew',  action.payload.cantNew)
            state = state.set('cantRen',  action.payload.cantRen)
            state = state.set('label1',  action.payload.label1)
            state = state.set('label2',  action.payload.label2)
            state = state.set('data_N',  action.payload.data_N)
            state = state.set('data_R',  action.payload.data_R)
            return state

        // case types.SHOW_MODAL_CLIENTES:
        //     state = state.set('modalClientes', !state.get('modalClientes'))
        //     return state

        default:
            return state
    }
}