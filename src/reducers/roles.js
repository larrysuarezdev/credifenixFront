import * as types from '../actions/types'
import Immutable from 'immutable'

const INITIAL_STATE = Immutable.fromJS({
    list: [],
    selected: null,
})

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.GET_ROLES_BY_ID:
            state = state.set('list', Immutable.fromJS(action.payload.list))
            return state

        case types.CHANGE_PERMISSION:
            // state = state.set('list', Immutable.fromJS(action.payload.list))
            const index = state.get('list').findIndex(x => x.get('pantalla') === action.payload.vista)
            // console.log(state.getIn(`list.${index}.ver`.split('.')))
            state = state.setIn(`list.${index}.ver`.split('.'), !state.getIn(`list.${index}.ver`.split('.')))

            return state

        default:
            return state
    }
}