import * as types from '../actions/types'
import Immutable from 'immutable'
import objectifyArray from 'objectify-array'

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
    pageNumber: 1,
    per_page: 1000,
    countRows: 0
})

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.GET_FLUJO_CAJA:
            state = state.set('total', action.payload.sum)
            state = state.set('list', action.payload.data)
            state = state.set('countRows', action.payload.countRows)
            state = state.set('per_page', action.payload.per_page)
            // state = state.set('ids', state.get('list').sortBy(x => x.get('id')).keySeq().toList())
            return state
        case types.SELECCIONAR_FLUJO_CAJA:
            state = state.set('selected', action.payload)
            return state
        case types.CHANGE_ATTR_FLUJO_CAJA:
            state = state.setIn(['selectRow', String(action.payload.attr)], action.payload.value)
            return state
        case types.NEW_FLUJO_CAJA:
            state = state.set('selectRow', Immutable.fromJS(newRow))
            return state
        case types.CLEAN_FLUJO_CAJA:
            state = state.set('selectRow', INITIAL_STATE.get('selectRow'))
            state = state.set('selected', INITIAL_STATE.get('selected'))
            return state
        case types.CAMBIAR_PAGINA_FLUJO_CAJA:
            state = state.set('pageNumber', action.payload)
            return state
        default:
            return state
    }
}