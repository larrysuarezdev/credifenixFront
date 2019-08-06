import * as types from '../actions/types'
import Immutable from 'immutable'

const newRow = {
    id_interno: 0,
    valor: ''
}

const INITIAL_STATE = Immutable.fromJS({
    list: [],
    ids: [],
    selected: null,
    selectRow: null,
    newRowParametro: null
})



export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.GET_PARAMETROS:
            state = state.set('list', Immutable.fromJS(action.payload.data))
            return state
        case types.SELECCIONAR_PARAMETRO:
            state = state.set('selected', action.payload)
            state = state.set('selectRow', state.getIn(['list', String(action.payload), 'parametros_detalles']))
            state = state.set('ids', state.get('selectRow').sortBy(x => x.get('id')).keySeq().toList())
            return state
        case types.NEW_PARAMETRO:
            newRow.id_interno = state.get('selectRow').count() + 1;
            state = state.set('newRowParametro', Immutable.fromJS(newRow))
            return state
        case types.CHANGE_ATTR_LISTA_PARAMETRO:
            state = state.setIn(['selectRow', String(action.payload.id), String(action.payload.attr)], action.payload.value)
            state = state.setIn(['selectRow', String(action.payload.id), 'updated'], true)
            console.log(state.get('selectRow').toJS())
            return state
        case types.CHANGE_ATTR_PARAMETRO:
            state = state.setIn(['newRowParametro', String(action.payload.attr)], action.payload.value)
            return state
        case types.CLEAN_PARAMETRO:
            state = state.set('selectRow', INITIAL_STATE.get('selectRow'))
            state = state.set('selected', INITIAL_STATE.get('selected'))
            state = state.set('newRowParametro', INITIAL_STATE.get('newRowParametro'))
            return state
        default:
            return state
    }
}