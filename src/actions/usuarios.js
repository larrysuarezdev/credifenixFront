import * as types from './types'
import { createAxiosInstance } from '../utils/helpers'

import { API_URL, messageHandler } from '../actions/index'
import objectifyArray from 'objectify-array'

const axios = createAxiosInstance();

export function getUsuarios() {
    return (dispatch) => {
        axios.get(`${API_URL}/usuarios`, {})
            .then((res) => {
                const data = objectifyArray(res.data.data, {
                    by: ['id'],
                    recursive: true
                })

                dispatch({
                    type: types.GET_USERS,
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

export function saveAction() {
    return (dispatch, getState) => {
        const row = getState().usuarios.get('selectRow').toJS()
        const newRow = getState().usuarios.get('edit')
        
        if (newRow) {
            axios.post(`${API_URL}/usuarios`, row)
                .then(() => {
                    dispatch(getUsuarios());
                    messageHandler(dispatch, {
                        success: 'Se ha agregado un nuevo registro'
                    })
                })
                .catch(err => {
                    messageHandler(dispatch, err)
                })
        } else {
            axios.put(`${API_URL}/usuarios`, row)
                .then(() => {
                    dispatch(getUsuarios());
                    messageHandler(dispatch, {
                        success: 'Se ha actualizado el registro'
                    })
                })
                .catch(err => {
                    messageHandler(dispatch, err)
                })
        }

    }
}

