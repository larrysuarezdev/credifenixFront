import * as types from './types'
import { signOutOn401 } from './auth'
// import { getInnerException } from '../utils/helpers'

export const API_URL = window.API_URL
export const CLIENT_ROOT_URL = window.CLIENT_ROOT_URL

export function clearMessage() {
    return (dispatch) => {
        dispatch({ type: types.LIMPIAR_MENSAJES })
    }
}

export function messageHandler(dispatch, error) {
    let theMessage = { type: 'warning', message: '' }
    
    if (error.response) {
        switch (error.response.status) {
            case 422:
                if (error.response.data) {
                    for (let property in error.response.data) {
                        if (error.response.data.hasOwnProperty(property)) {
                            for (let n = 0; n < error.response.data[property].length; n++) {
                                dispatch({ type: types.MOSTRAR_MENSAJE, payload: { type: 'warning', message: error.response.data[property][n] } })
                            }
                        }
                    }
                }
                break;

            default:
                console.log('error : ' + error.response.data)
                break;
        }
    }
    else {
        if (error.data) {
            theMessage.message = error.data.Message
        } else if (error.message) {
            theMessage.type = 'danger'
            theMessage.message = error.message
        } else if (error.success) {
            theMessage.type = 'success'
            theMessage.message = error.success
        } else if (error.warning) {
            theMessage.type = 'warning'
            theMessage.message = error.warning
        } else {
            theMessage.type = 'danger'
            theMessage.message = error
        }

        dispatch({ type: types.MOSTRAR_MENSAJE, payload: theMessage })

    }

    if (error.status === 401) {
        dispatch({ type: types.MOSTRAR_MENSAJE, payload: { type: 'danger', message: 'No esta autorizado. Por favor, inicie sesión y vuelva a intentarlo' } })
        signOutOn401(dispatch)
    }
}