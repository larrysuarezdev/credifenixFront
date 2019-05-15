// import * as types from '../actions/types'
import Immutable from 'immutable'

const INITIAL_STATE = Immutable.fromJS({
    list: [
        { Nombre : 'Nombre1', Orden : 1, Color : '' },
        { Nombre : 'Nombre2', Orden : 2, Color : '' },
        { Nombre : 'Nombre3', Orden : 3, Color : '' },
        { Nombre : 'Nombre4', Orden : 4, Color : '' },
        { Nombre : 'Nombre5', Orden : 5, Color : '' },
        { Nombre : 'Nombre6', Orden : 6, Color : '' },
        { Nombre : 'Nombre7', Orden : 7, Color : '' },
        { Nombre : 'Nombre8', Orden : 8, Color : '' },
        { Nombre : 'Nombre9', Orden : 9, Color : '' },
        { Nombre : 'Nombre10', Orden : 10, Color : '' },
        { Nombre : 'Nombre11', Orden : 11, Color : '' },
        { Nombre : 'Nombre12', Orden : 12, Color : '' },
        { Nombre : 'Nombre13', Orden : 13, Color : '' },
        { Nombre : 'Nombre14', Orden : 14, Color : '' },
    ],
    selected: null,
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