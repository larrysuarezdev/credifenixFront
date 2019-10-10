import * as types from '../actions/types'
import Immutable from 'immutable'

const INITIAL_STATE = Immutable.fromJS({
    dataCoteo: [],
    utilidades:[],
    recaudos: [],
    nuevos: [],
    renovaciones: []
})

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.GET_DATA_COTEO:
            state = state.set('dataCoteo', Immutable.fromJS(action.payload.list))
            state = state.set('utilidades', Immutable.fromJS(action.payload.utilidades))
            state = state.set('recaudos', Immutable.fromJS(action.payload.recaudos))            
            state = state.set('nuevos', Immutable.fromJS(action.payload.nuevos))            
            state = state.set('renovaciones', Immutable.fromJS(action.payload.renovaciones))            
            return state

        // case types.CHANGE_PERMISSION:
        //     // state = state.set('list', Immutable.fromJS(action.payload.list))
        //     const index = state.get('list').findIndex(x => x.get('pantalla') === action.payload.vista)
        //     // console.log(state.getIn(`list.${index}.ver`.split('.')))
        //     state = state.setIn(`list.${index}.ver`.split('.'), !state.getIn(`list.${index}.ver`.split('.')))

        //     return state

        default:
            return state
    }
}