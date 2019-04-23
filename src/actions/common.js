import * as types from './types'
import { isFunction } from 'util'

export function toggleModal() {
    return (dispatch) => {
        dispatch({
            type: types.SHOW_MODAL
        })
    }
}

export function selectAction(id, next, tipo) {
    return (dispatch) => {
        dispatch({
            type: types[`SELECCIONAR_${tipo}`],
            payload: id
        })
        if (isFunction(next)) next()
    }
}

export function changeAttr(tipo, attr, value) {
    return (dispatch) => {
        dispatch({
            type: types[`CHANGE_ATTR_${tipo}`],
            payload: { attr, value}
        })
    }
}

export function newRow(tipo) {
    return (dispatch) => {
        dispatch({ type: types[`NEW_${tipo}`] })
    }
}