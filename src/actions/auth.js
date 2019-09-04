import { axiosNoAuth as axios, createAxiosInstance } from '../utils/helpers'
import { Cookies } from 'react-cookie';
import {
    API_URL, CLIENT_ROOT_URL, messageHandler
} from './index'

import { setLoading }  from './common'
import * as types from './types'

const axios1 = createAxiosInstance();
const cookie = new Cookies();

export function signIn({ username, password }, callback) {
    return function (dispatch) {
        axios
            .post(`${API_URL}/account/signin`, { username, password })
            .then((res) => {
                cookie.set('token', res.data.token, { path: '/' })
                cookie.set('user', res.data.user, { path: '/' })
                cookie.set('rol', res.data.rol, { path: '/' })
                
                dispatch({ type: types.INICIAR_SESION, payload: { user : res.data.user, rol : res.data.rol } })

                window.location.href = `${CLIENT_ROOT_URL}`

                if (callback instanceof Function) {
                    callback()
                }
            })
            .catch((err) => {
                if (err.response && err.response.status === 401) {
                    dispatch({ type: types.MOSTRAR_MENSAJE, payload: { type: 'danger', message: 'Nombre de usuario o contraseña incorrectas' } })
                } else {
                    messageHandler(dispatch, err)
                }
                if (callback instanceof Function) {
                    callback()
                }
            })
    }
}

export function changePassword(pass){
    return function (dispatch, getState) {
        dispatch(setLoading(true));
        const user = getState().auth.user;
        const data = { userId : user.id, password : pass}
        axios1.post(`${API_URL}/usuarios/changePassword`, data)
                .then(() => {
                    dispatch(setLoading(false));
                    messageHandler(dispatch, {
                        success: 'Se ha modificado la contraseña'
                    })
                })
                .catch(err => {
                    dispatch(setLoading(false));
                    messageHandler(dispatch, err);
                })  
    }
}

export function signOut() {
    return function (dispatch) {
        dispatch({ type: types.CERRAR_SESION })
        cookie.remove('token', { path: '/' })
        cookie.remove('user', { path: '/' })
        cookie.remove('rol', { path: '/' })
        window.location.href = `${CLIENT_ROOT_URL}/login`
    }
}

export function signOutOn401(dispatch) {
    cookie.remove('token', { path: '/' })
    cookie.remove('user', { path: '/' })
    cookie.remove('rol', { path: '/' })
    dispatch({ type: types.CERRAR_SESION })
}
