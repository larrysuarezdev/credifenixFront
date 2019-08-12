import * as types from './types'
import { createAxiosInstance } from '../utils/helpers'
import { API_URL, messageHandler } from './index'
import objectifyArray from 'objectify-array'

const axios = createAxiosInstance();


export function getPermisoByRol(id) {
    return (dispatch) => {
        axios.get(`${API_URL}/roles/${id}`)
            .then((res) => {
                dispatch({
                    type: types.GET_ROLES_BY_ID,
                    payload: {
                        list: res.data.data
                    }
                });
            })
            .catch((err) => {
                messageHandler(dispatch, err)
            })
    }
}

export function changePermision(vista) {
    return (dispatch) => {
        dispatch({
            type: types.CHANGE_PERMISSION,
            payload: {
                vista
            }
        });
    }
}