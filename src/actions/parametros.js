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
                // fn1(dispatch);
                messageHandler(dispatch, err)
            })
    }
}

// export function saveAction() {
//     return (dispatch, getState) => {
//         const row = getState().parametros.get('selectRow').toJS()
//         const newRow = getState().parametros.get('edit')

//         if (newRow) {
//             axios.post(`${API_URL}/parametros`, row)
//                 .then(() => {
//                     dispatch(getUsuarios());
//                     dispatch({ type: types.CLEAN_USUARIO })
//                     messageHandler(dispatch, {
//                         success: 'Se ha agregado un nuevo registro'
//                     })
//                 })
//                 .catch(err => {
//                     messageHandler(dispatch, err)
//                 })
//         } else {
//             axios.put(`${API_URL}/parametros`, row)
//                 .then(() => {
//                     dispatch(getUsuarios());
//                     dispatch({ type: types.CLEAN_USUARIO })
//                     messageHandler(dispatch, {
//                         success: 'Se ha actualizado el registro'
//                     })
//                 })
//                 .catch(err => {
//                     messageHandler(dispatch, err)
//                 })
//         }

//     }
// }

