import { axiosNoAuth as axios } from '../utils/helpers'
import { Cookies } from 'react-cookie';
import {
    API_URL, CLIENT_ROOT_URL, messageHandler
} from './index'
import * as types from './types'

const cookie = new Cookies();

export function signIn({ username, password }, callback) {
    return function (dispatch) {
        axios
            .post(`${API_URL}/account/signin`, { username, password })
            .then((res) => {

                cookie.set('token', res.data.token, { path: '/' })
                cookie.set('user', res.data.user, { path: '/' })
                dispatch({ type: types.INICIAR_SESION, payload: res.data.user })

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

export function signOut() {
    return function (dispatch) {
        dispatch({ type: types.CERRAR_SESION })
        cookie.remove('token', { path: '/' })
        cookie.remove('user', { path: '/' })
        window.location.href = `${CLIENT_ROOT_URL}/login`
    }
}

export function signOutOn401(dispatch) {
    cookie.remove('token', { path: '/' })
    cookie.remove('user', { path: '/' })
    dispatch({ type: types.CERRAR_SESION })
}
