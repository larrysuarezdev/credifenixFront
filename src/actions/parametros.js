import * as types from './types'
import { createAxiosInstance } from '../utils/helpers'

import { API_URL, messageHandler } from './index'
import objectifyArray from 'objectify-array'

const axios = createAxiosInstance();

export function getParametros() {
    return (dispatch) => {
        axios.get(`${API_URL}/parametros`, {})
            .then((res) => {
                const data = objectifyArray(res.data.data, {
                    by: ['id'],
                    recursive: true
                })

                dispatch({
                    type: types.GET_PARAMETROS,
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

export function saveAction() {
    return (dispatch, getState) => {
        const row = getState().parametros.get('newRowParametro').toJS()
        row.parametro_id = getState().parametros.get('selected');

        axios.post(`${API_URL}/parametros`, row)
            .then(() => {
                dispatch(getParametros());
                dispatch({ type: types.CLEAN_PARAMETRO })
                messageHandler(dispatch, {
                    success: 'Se ha agregado un nuevo registro'
                })
            })
            .catch(err => {
                messageHandler(dispatch, err)
            })


    }
}

export function updatedAction() {
    return (dispatch, getState) => {
        const rows = getState().parametros.get('selectRow').toJS()

        axios.put(`${API_URL}/parametros`, { 'cambios': rows })
            .then(() => {
                dispatch(getParametros());
                dispatch({ type: types.CLEAN_PARAMETRO })
                messageHandler(dispatch, {
                    success: 'Se ha actualizado los registros'
                })
            })
            .catch(err => {
                messageHandler(dispatch, err)
            })
    }
}