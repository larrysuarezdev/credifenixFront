import * as types from './types'
import { createAxiosInstance } from '../utils/helpers'
import { setLoading } from './common'

import { API_URL, messageHandler } from './index'
import objectifyArray from 'objectify-array'

const axios = createAxiosInstance();

export function getClientes() {
    return (dispatch) => {
        dispatch(setLoading(true));
        axios.get(`${API_URL}/clientes`, {})
            .then((res) => {
                const data = objectifyArray(res.data.data, {
                    by: ['id'],
                    recursive: true
                })
                dispatch(setLoading(false));
                dispatch({
                    type: types.GET_CLIENTES,
                    payload: {
                        data,
                        creditosActivos : res.data.creditosActivos
                    }
                })
            })
            .catch((err) => {
                dispatch(setLoading(false));
                messageHandler(dispatch, err)
            })
    }
}

export function saveAction() {
    return (dispatch, getState) => {
        dispatch(setLoading(true));
        const row = getState().clientes.get('selectRow').toJS()
        const newRow = getState().clientes.get('edit')
        if (!newRow) {
            axios.post(`${API_URL}/clientes`, row)
                .then(() => {
                    dispatch(getClientes());
                    dispatch({ type: types.CLEAN_CLIENTE })
                    messageHandler(dispatch, {
                        success: 'Se ha agregado un nuevo registro'
                    })
                })
                .catch(err => {
                    dispatch(setLoading(false));
                    messageHandler(dispatch, err)
                })
        } else {
            axios.put(`${API_URL}/clientes`, row)
                .then(() => {
                    dispatch(getClientes());
                    dispatch({ type: types.CLEAN_CLIENTE })
                    messageHandler(dispatch, {
                        success: 'Se ha actualizado el registro'
                    })
                })
                .catch(err => {
                    dispatch(setLoading(false));
                    messageHandler(dispatch, err)
                })
        }

    }
}

export function changeState(id) {
    return (dispatch) => {
        dispatch(setLoading(true));
        axios.post(`${API_URL}/clientes/${id}`)
            .then((res) => {
                dispatch(setLoading(false));
                const data = objectifyArray(res.data.data, {
                    by: ['id'],
                    recursive: true
                })
                dispatch({
                    type: types.GET_CLIENTES,
                    payload: {
                        data
                    }
                })

                messageHandler(dispatch, {
                    success: 'Se ha cambiado el estado al cliente'
                })
            })
            .catch(err => {
                dispatch(setLoading(false));
                messageHandler(dispatch, err)
            })
    }
}

export function saveActionReferencias(tipo) {
    return (dispatch) => {
        dispatch({ type: types.ADD_REFERENCIA, payload: tipo })
    }
}

export function editCliente(id) {
    return (dispatch) => {
        dispatch({ type: types.EDIT_CLIENTE, payload: { id } })
    }
}

export function cleanCliente() {
    return (dispatch) => {
        dispatch({ type: types.CLEAN_CLIENTE })
    }
}
