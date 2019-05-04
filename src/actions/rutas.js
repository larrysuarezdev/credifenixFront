import * as types from './types'
import { createAxiosInstance } from '../utils/helpers'

import { API_URL, messageHandler } from './index'
import objectifyArray from 'objectify-array'

const axios = createAxiosInstance();

export function getRutas() {
    return (dispatch) => {
        axios.get(`${API_URL}/creditos`, {})
            .then((res) => {
                const data = objectifyArray(res.data.data, {
                    by: ['id'],
                    recursive: true
                })
                dispatch({
                    type: types.GET_RUTAS,
                    payload: {
                        data
                    }
                })
            })
            .catch((err) => {
                // fn1(dispatch);
                messageHandler(dispatch, err)
            })
    }
}

export function getClientes() {
    return (dispatch) => {
        axios.get(`${API_URL}/clientes`, {})
            .then((res) => {
                const data = objectifyArray(res.data.data, {
                    by: ['id'],
                    recursive: true
                })
                dispatch({
                    type: types.GET_CLIENTES_RUTA,
                    payload: {
                        data
                    }
                })
            })
            .catch((err) => {
                messageHandler(dispatch, err)
            })
    }
}

export function selectCliente(id) {
    return (dispatch) => {
        dispatch({
            type: types.SELECT_CLIENTE,
            payload: {
                id
            }
        })
    }
}