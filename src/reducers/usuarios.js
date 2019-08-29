import * as types from '../actions/types'
import Immutable from 'immutable'

const newRow = {
    nombres: '',
    apellidos: '',
    telefono1: '',
    telefono2: '',
    login: false,
    email: '',
    username: '',
    password: '',
    ruta: 0,
    ruta: '',
}

const INITIAL_STATE = Immutable.fromJS({
    list: [],
    ids: [],
    roles: [],
    selected: null,
    selectRow: null,
    edit: false
})



export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.GET_USERS:
            state = state.set('list', Immutable.fromJS(action.payload.data))
            state = state.set('ids', state.get('list').sortBy(x => x.get('id')).keySeq().toList())
            return state
        case types.SELECCIONAR_USUARIO:
            state = state.set('edit', false)
            state = state.set('selected', action.payload)
            state = state.set('selectRow', state.getIn(['list', String(action.payload)]))
            return state
        case types.NEW_USUARIO:
            state = state.set('edit', true)
            state = state.set('selectRow', Immutable.fromJS(newRow))
            return state
        case types.CHANGE_ATTR_USUARIO:
            state = state.setIn(['selectRow', String(action.payload.attr)], action.payload.value)
            return state
        case types.CLEAN_USUARIO:
            state = state.set('selectRow', INITIAL_STATE.get('selectRow'))
            state = state.set('selected', INITIAL_STATE.get('selected'))
            return state
        case types.GET_LISTA_ROLES:
            state = state.set('roles', Immutable.fromJS(action.payload.data))
            return state
        default:
            return state
    }
}