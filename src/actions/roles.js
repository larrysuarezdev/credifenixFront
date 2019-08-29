import * as types from './types'
import { createAxiosInstance } from '../utils/helpers'
import { API_URL, messageHandler } from './index'
import { setLoading } from './common'

const axios = createAxiosInstance();


export function getPermisoByRol(id) {
    return (dispatch) => {
        dispatch(setLoading(true));
        axios.get(`${API_URL}/roles/${id}`)
            .then((res) => {
                dispatch(setLoading(false));
                dispatch({
                    type: types.GET_ROLES_BY_ID,
                    payload: {
                        list: res.data.data
                    }
                });
            })
            .catch((err) => {
                dispatch(setLoading(false));
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

export function updatedAction() {
    return (dispatch, getState) => {
        dispatch(setLoading(true));

        const rows = getState().roles.get('list').toJS()

        axios.put(`${API_URL}/roles`, { 'data': rows })
            .then(() => {
                dispatch(setLoading(false));
                messageHandler(dispatch, {
                    success: 'Se han actualizado los permisos'
                })
            })
            .catch(err => {
                dispatch(setLoading(false));
                messageHandler(dispatch, err)
            })
    }
}