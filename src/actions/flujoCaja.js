import * as types from './types'
import { createAxiosInstance } from '../utils/helpers'
import moment from 'moment'

import { API_URL, messageHandler } from './index'
import { setLoading } from './common'
// import objectifyArray from 'objectify-array'

const axios = createAxiosInstance();

export function getFlujoCaja(page = 1) {

    function getFlujoCaja() {
        return axios.get(`${API_URL}/flujoCaja?page=`+ page);
    }

    return (dispatch) => {
        dispatch(setLoading(true));
        Promise.all([getFlujoCaja()])
            .then((res) => {
                dispatch(setLoading(false));
                res[0].data.data.data.map((x) => {
                    x.fecha = moment(x.fecha).format('YYYY-MM-DD');
                    x.tipo = x.tipo === 1 ? 'Entrada' : 'Salida' ;
                })
                console.log(res[0].data.sum)
                dispatch({
                    type: types.GET_FLUJO_CAJA,
                    payload: {
                        data: res[0].data.data.data,
                        countRows: res[0].data.data.total,
                        per_page: res[0].data.data.per_page,                        
                        sum: res[0].data.sum
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
        let row = []
        try {
            row = getState().flujoCaja.get('selectRow').toJS();
            console.log(row)

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
        catch{
            messageHandler(dispatch, { warning: 'Debe completar toda la información primero' });
            dispatch(setLoading(false));
        }

    }
}
