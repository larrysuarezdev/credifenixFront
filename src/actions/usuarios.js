import * as types from './types'
import { createAxiosInstance } from '../utils/helpers'

import { API_URL, messageHandler } from '../actions/index'
import objectifyArray from 'objectify-array'
import {setLoading} from './common'

const axios = createAxiosInstance();

export function getUsuarios() {
    return (dispatch) => {
        dispatch(setLoading(true));
        axios.get(`${API_URL}/usuarios`, {})
            .then((res) => {
                const data = objectifyArray(res.data.data, {
                    by: ['id'],
                    recursive: true
                })
                dispatch(setLoading(false));
                dispatch({
                    type: types.GET_USERS,
                    payload: {
                        data
                    }
                })
            })
            .catch((err) => {
                dispatch(setLoading(false));
                messageHandler(dispatch, err)
            })
    }
}

export function getListRoles() {
    return (dispatch) => {

        axios.get(`${API_URL}/parametros/roles`)
            .then((res) => {
                dispatch({
                    type: types.GET_LISTA_ROLES,
                    payload: {
                        data: res.data.data
                    }
                })

            })
            .catch((err) => {
                messageHandler(dispatch, err)
            });
    }
}

export function saveAction() {
    return (dispatch, getState) => {
        dispatch(setLoading(true));

        const row = getState().usuarios.get('selectRow').toJS()
        const newRow = getState().usuarios.get('edit')

        if (newRow) {
            axios.post(`${API_URL}/usuarios`, row)
                .then(() => {
                    dispatch(getUsuarios());
                    dispatch(setLoading(false));
                    dispatch({ type: types.CLEAN_USUARIO })
                    messageHandler(dispatch, {
                        success: 'Se ha agregado un nuevo registro'
                    })
                })
                .catch(err => {
                    dispatch(setLoading(false));
                    messageHandler(dispatch, err)
                })
        } else {
            axios.put(`${API_URL}/usuarios`, row)
                .then(() => {
                    dispatch(getUsuarios());
                    dispatch(setLoading(false));
                    dispatch({ type: types.CLEAN_USUARIO })
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

