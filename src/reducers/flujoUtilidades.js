import * as types from '../actions/types'
import Immutable from 'immutable'

const newRow = {
    descripcion: '',
    fecha: new Date(),
    tipo: 1,
    valor: ''
}

const INITIAL_STATE = Immutable.fromJS({
    list: [],
    ids: [],
    total: 0,
    selected: null,
    selectRow: null,
})

export default function (state = INITIAL_STATE, action) {
    let creditos;
    switch (action.type) {
        case types.GET_FLUJO_UTILIDADES:
            state = state.set('total', action.payload.sum)
            state = state.set('list', Immutable.fromJS(action.payload.data))
            state = state.set('ids', state.get('list').sortBy(x => x.get('id')).keySeq().toList())
            return state
        case types.SELECCIONAR_FLUJO_UTILIDADES:
            state = state.set('selected', action.payload)
            return state
        case types.CHANGE_ATTR_FLUJO_UTILIDADES:
            state = state.setIn(['selectRow', String(action.payload.attr)], action.payload.value)
            return state
        case types.NEW_FLUJO_UTILIDADES:
            state = state.set('selectRow', Immutable.fromJS(newRow))
            return state
        case types.CLEAN_FLUJO_UTILIDADES:
            state = state.set('selectRow', INITIAL_STATE.get('selectRow'))
            state = state.set('selected', INITIAL_STATE.get('selected'))
        default:
            return state
    }
}