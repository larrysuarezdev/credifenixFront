import * as types from '../actions/types'
import Immutable from 'immutable'
import objectifyArray from 'objectify-array'

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
    clientes_referencias: []
}

const newRowReferencia = {
    nombre: '',
    direccion: '',
    barrio: '',
    telefono: '',
    parentesco: '',
    new: true
}

const INITIAL_STATE = Immutable.fromJS({
    list: [],
    AllList: [],
    ids: [],
    selected: null,
    selectedFiador: null,
    selectedTitular: null,
    selectRow: null,
    selectRowReferencia: null,
    edit: false
})



export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.GET_CLIENTES:
            state = state.set('list', Immutable.fromJS(action.payload.data))
            state = state.set('AllList', Immutable.fromJS(action.payload.data))
            state = state.set('ids', state.get('list').sortBy(x => x.get('id')).keySeq().toList())
            return state
        case types.SELECCIONAR_CLIENTE:
            state = state.set('selected', action.payload)
            return state
        case types.SELECCIONAR_CLIENTE_FIADOR:
            state = state.set('selectedFiador', action.payload)
            return state
        case types.SELECCIONAR_CLIENTE_TITULAR:
            state = state.set('selectedTitular', action.payload)
            return state
        case types.NEW_CLIENTE:
            state = state.set('selectRow', Immutable.fromJS(newRow))
            state = state.set('tab', 1)
            return state
        case types.NEW_REFERENCIA:
            state = state.set('selectRowReferencia', Immutable.fromJS(newRowReferencia))
            return state
        case types.CHANGE_ATTR_CLIENTE:
            state = state.setIn(['selectRow', String(action.payload.attr)], action.payload.value)
            return state
        case types.CHANGE_ATTR_REFERENCIA:
            state = state.setIn(['selectRowReferencia', String(action.payload.attr)], action.payload.value)
            return state
        case types.CLEAN_CLIENTE:
            state = state.set('selectRow', Immutable.fromJS(newRow))
            state = state.set('selectRowReferencia', Immutable.fromJS(newRowReferencia))
            state = state.set('selected', INITIAL_STATE.get('selected'))
            state = state.set('edit', false)
            return state
        case types.EDIT_CLIENTE:
            state = state.set('selectRow', state.getIn(['list', String(action.payload.id)]))
            state = state.set('edit', true)
        case types.EDIT_REFERENCIA:

            state = state.set('selectRowReferencia', state.getIn(['selectRow', 'clientes_referencias', String(action.payload.id)]))
            return state
        case types.ADD_REFERENCIA:
            const referencias = state.getIn(['selectRow', 'clientes_referencias']).toList().toJS()
            const row = state.get('selectRowReferencia').toJS();
            row.tipo_referencia = action.payload;
            referencias.push(row)
            state = state.setIn(['selectRow', 'clientes_referencias'], Immutable.fromJS(referencias))
            state = state.set('selectRowReferencia', Immutable.fromJS(newRowReferencia))
            return state

        case types.UPDATED_MAESTRA_CLIENTES:
            const data = objectifyArray(action.payload, {
                by: ['id'],
                recursive: true
            })
            state = state.set('list', Immutable.fromJS(data))
            state = state.set('selected', null)
            state = state.set('ids', state.get('list').sortBy(x => x.get('id')).keySeq().toList())
            return state
        default:
            return state
    }
}