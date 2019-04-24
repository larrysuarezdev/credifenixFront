import * as types from '../actions/types'
import Immutable from 'immutable'

const newRow = {
    titular: '',
    cc_titular: '',
    fiador: '',
    cc_fiador: '',
    neg_titular: '',
    neg_fiador: '',
    dir_cobro: '',
    barrio_cobro: '',
    tel_cobro: '',
    dir_casa: '',
    barrio_casa: '',
    tel_casa: '',
    dir_fiador: '',
    barrio_fiador: '',
    tel_fiador: '',
}

const INITIAL_STATE = Immutable.fromJS({
    list: [],
    ids: [],
    selected: null,
    selectRow: null,
    edit: false
})



export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.GET_CLIENTES:
            state = state.set('list', Immutable.fromJS(action.payload.data))
            state = state.set('ids', state.get('list').sortBy(x => x.get('id')).keySeq().toList())
            return state
        case types.SELECCIONAR_CLIENTE:
            state = state.set('selected', action.payload)
            return state
        case types.NEW_CLIENTE:
            state = state.set('selectRow', Immutable.fromJS(newRow))
            state = state.set('tab', 1)
            return state
        case types.CHANGE_ATTR_CLIENTE:
            state = state.setIn(['selectRow', String(action.payload.attr)], action.payload.value)
            return state
        case types.CLEAN_CLIENTE:
            state = state.set('selectRow', Immutable.fromJS(newRow))
            state = state.set('selected', INITIAL_STATE.get('selected'))
            state = state.set('edit', false)
            return state
        case types.EDIT_CLIENTE:
            state = state.set('selectRow', state.getIn(['list', String(action.payload.id)]))    
            state = state.set('edit', true)
            return state
        default:
            return state
    }
}