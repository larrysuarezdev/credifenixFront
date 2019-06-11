import * as types from '../actions/types'
import Immutable from 'immutable'

// const newRow = {
//     cliente: null,
//     fecha: new Date(),
//     prestamo: null,
//     cuota: null,
//     dias: null,
//     observaciones: null
// }

const INITIAL_STATE = Immutable.fromJS({
    list: [],
    ids: [],
    selected: null,
    selectRow: null,
})

export default function (state = INITIAL_STATE, action) {
    let creditos;
    switch (action.type) {
        case types.GET_FLUJO_CAJA:
            console.log(action.payload.data, 'reducer')
            state = state.set('list', Immutable.fromJS(action.payload.data))
            state = state.set('ids', state.get('list').sortBy(x => x.get('id')).keySeq().toList())
            return state
        case types.SELECCIONAR_FLUJO_CAJA:
            state = state.set('selected', action.payload)
            return state
        default:
            return state
    }
}