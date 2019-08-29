import * as types from '../actions/types'
import Immutable from 'immutable'

const INITIAL_STATE = Immutable.fromJS({
    areas: [],
    modal: false,
    modalClientes: false,
    columnas: [],
    mode: null,
    modalFilter: false,
    modalFilters: [],
    waiting: false,
    searchBack: false
})

export default function (state = INITIAL_STATE, action) {
    let tmp
    switch (action.type) {
        case types.SHOW_MODAL:
            state = state.set('modal', !state.get('modal'))
            return state

        case types.SHOW_MODAL_CLIENTES:
            state = state.set('modalClientes', !state.get('modalClientes'))
            return state

        case types.SHOW_HIDE_MODAL_MAESTRAS:
            if (state.get('mode') !== action.payload.mode && action.payload.mode !== null)
                state = state.set('modalFilters', INITIAL_STATE.get('modalFilters'))

            state = state.set('modalFilter', action.payload.state)
            state = state.set('columnas', Immutable.fromJS(action.payload.columnas))
            state = state.set('searchBack', Immutable.fromJS(action.payload.searchBack))

            if (action.payload.mode !== null)
                state = state.set('mode', Immutable.fromJS(action.payload.mode))
            return state

        case types.ADICIONAR_CRITERIO_FILTRADO_MAESTRAS:
            state = state.update('modalFilters', filter => filter
                .push(Immutable.fromJS({
                    column: state.getIn('columnas.0.value'.split('.')),
                    operator: '===',
                    value: '',
                    checked: false,
                    comparison: state.getIn('columnas.0.format'.split('.')),
                }))
            )
            return state

        case types.MODIFICAR_CRITERIO_FILTRADO_MAESTRAS:
            if (action.payload.attr === 'column') {
                tmp = state.get('columnas').find(item => item.get('STRING') !== undefined ? item.get('STRING') === action.payload.value : item.get('VALUE') === action.payload.value).get('format')
                state = state.setIn(`modalFilters.${action.payload.index}.comparison`.split('.'), tmp)
                tmp = null
            }
            state = state.setIn(`modalFilters.${action.payload.index}.${action.payload.attr}`.split('.'), action.payload.value)
            return state

        case types.ELIMINAR_CRITERIO_FILTRADO_MAESTRAS:
            state = state.set('modalFilters', state.get('modalFilters').filter(item => !item.get('checked')))
            return state

        case types.CONMUTAR_SELECCION_CRITERIO_FILTRADO_MAESTRAS:
            state = state.setIn(`modalFilters.${action.payload.index}.checked`.split('.'), action.payload.checked)
            return state

        case types.SET_LOADING:
            state = state.set("waiting", action.payload)
            return state

        default:
            return state
    }
}