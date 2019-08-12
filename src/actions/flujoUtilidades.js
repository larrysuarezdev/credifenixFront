import * as types from './types'
import { createAxiosInstance } from '../utils/helpers'
import moment from 'moment'

import { API_URL, messageHandler } from './index'
import objectifyArray from 'objectify-array'

const axios = createAxiosInstance();

export function getFlujoUtilidades() {

    function getFlujoUtilidades() {
        return axios.get(`${API_URL}/flujoUtilidades`);
    }

    return (dispatch) => {
        Promise.all([getFlujoUtilidades()])
            .then((res) => {

                const data = objectifyArray(res[0].data.data, {
                    by: ['id'],
                    recursive: true
                })

                dispatch({
                    type: types.GET_FLUJO_UTILIDADES,
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
        const row = getState().flujoUtilidades.get('selectRow').toJS();
        row.fecha = moment(row.fecha).format('YYYY-MM-DD');
        row.valor = row.valor * 1000;
        
        axios.post(`${API_URL}/flujoUtilidades`, row)
            .then(() => {
                dispatch(getFlujoUtilidades());
                dispatch({ type: types.CLEAN_FLUJO_UTILIDADES })
                messageHandler(dispatch, {
                    success: 'Se ha agregado un nuevo registro'
                })
            })
            .catch(err => {
                messageHandler(dispatch, err)
            })

    }
}
