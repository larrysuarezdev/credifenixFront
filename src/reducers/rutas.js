import * as types from '../actions/types'
import Immutable from 'immutable'

const INITIAL_STATE = Immutable.fromJS({
    list: [],
    ids: [],
})

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        // case types.SHOW_MODAL:
        //     state = state.set('modal', !state.get('modal'))
        //     return state

        default:
            return state
    }
}