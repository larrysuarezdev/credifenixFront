import * as types from './types'
import { isFunction } from 'util'
import { messageHandler } from './index'

export function toggleModal() {
    return (dispatch) => {
        dispatch({
            type: types.SHOW_MODAL
        })
    }
}

export function toggleModalClientes() {
    return (dispatch) => {
        dispatch({
            type: types.SHOW_MODAL_CLIENTES
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

export function changeAttr2(tipo, id, attr, value) {
    return (dispatch) => {
        dispatch({
            type: types[`CHANGE_ATTR_LISTA_${tipo}`],
            payload: { attr, value, id }
        })
    }
}

export function newRow(tipo) {
    return (dispatch) => {
        dispatch({ type: types[`NEW_${tipo}`] })
    }
}

export function editRow(tipo, id) {
    return (dispatch) => {
        dispatch({ type: types[`EDIT_${tipo}`], payload: { id } })
    }
}

export function setLoading(estado) {
    return (dispatch) => {
        dispatch({ type: types.SET_LOADING, payload: estado })
    }
}

export function changePage(tipo, page) {
    return (dispatch) => {
        dispatch({ type: types[`CAMBIAR_PAGINA_${tipo}`], payload:  page  })
    }
}

export function toogleSidebar() {
    return (dispatch) => {
        dispatch({ type: types.TOOGLE_SIDEBAR  })
    }
}

