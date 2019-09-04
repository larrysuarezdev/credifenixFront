import * as types from './types'
import { createAxiosInstance } from '../utils/helpers'
import moment from 'moment'

import { API_URL, messageHandler } from './index'
import { setLoading } from './common'
import objectifyArray from 'objectify-array'

const axios = createAxiosInstance();

export function getFlujoCaja() {

    function getFlujoCaja() {
        return axios.get(`${API_URL}/flujoCaja`);
    }

    return (dispatch) => {
        dispatch(setLoading(true));
        Promise.all([getFlujoCaja()])
            .then((res) => {
                dispatch(setLoading(false));
                let sum = 0, entradas = 0, salidas = 0;
                for (let index = 0; index < res[0].data.data.length; index++) {
                    const item = res[0].data.data[index];
                    if (item.tipo == 1)
                        entradas += item["valor"];
                    else
                        salidas += item["valor"]
                }
                sum = entradas - salidas;
                const data = objectifyArray(res[0].data.data, {
                    by: ['id'],
                    recursive: true
                })

                dispatch({
                    type: types.GET_FLUJO_CAJA,
                    payload: {
                        data,
                        sum
                    }
                })
            })
            .catch((err) => {
                dispatch(setLoading(false));
                messageHandler(dispatch, err)
            })
    }
}

export function saveAction() {
    return (dispatch, getState) => {
        dispatch(setLoading(true));
        const row = getState().flujoCaja.get('selectRow').toJS();
        row.fecha = moment(row.fecha).format('YYYY-MM-DD');
        row.valor = row.valor * 1000;

        axios.post(`${API_URL}/flujoCaja`, row)
            .then(() => {
                dispatch(getFlujoCaja());
                dispatch({ type: types.CLEAN_FLUJO_CAJA })
                messageHandler(dispatch, {
                    success: 'Se ha agregado un nuevo registro'
                })
            })
            .catch(err => {
                dispatch(setLoading(false));
                messageHandler(dispatch, err)
            })

    }
}
