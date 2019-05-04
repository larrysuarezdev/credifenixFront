import * as types from '../actions/types'
import Immutable from 'immutable'
import { recalculate } from '../utils/helpers'

const newRow = {
    cliente: null,
    fecha: new Date(),
    prestamo: 0,
    cuota: 0,
    dias: 0
}

const INITIAL_STATE = Immutable.fromJS({
    list: [],
    ids: [],
    clientes: [],
    selected: null,
    selectRow: null,
})

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.GET_RUTAS:
            state = state.set('list', recalculate(Immutable.fromJS(action.payload.data), 'id'))
            state = state.set('ids', state.get('list').sortBy(x => x.get('id')).keySeq().toList())
            return state
        case types.GET_CLIENTES_RUTA:
            state = state.set('clientes', Immutable.fromJS(action.payload.data))
            return state
        case types.SELECCIONAR_RUTA:
            state = state.set('selected', action.payload)
            return state
        case types.CHANGE_ATTR_LISTA_RUTA:
            state = state.setIn(['list', String(action.payload.id), String(action.payload.attr)], action.payload.value)
            state = state.set('list', recalculate(state.get('list'), 'id'))
            return state
        case types.CHANGE_ATTR_RUTA:
            state = state.setIn(['selectRow', String(action.payload.attr)], action.payload.value)
            return state
        case types.NEW_RUTA:
            state = state.set('selectRow', Immutable.fromJS(newRow))
            return state
        case types.SELECT_CLIENTE:
            state = state.setIn(['selectRow', 'cliente'], state.getIn(['clientes', String(action.payload.id)]))
            return state

        default:
            return state
    }
}