import * as types from './types'
import { createAxiosInstance } from '../utils/helpers'
import { toggleModal } from './common'

import { API_URL, messageHandler } from './index'
import objectifyArray from 'objectify-array'
import moment from 'moment'

const axios = createAxiosInstance();


export function getCreditos(id) {
    id = id.value;
    function getCredit() {
        return axios.get(`${API_URL}/creditos/${id}`);
    }

    return (dispatch) => {
        Promise.all([getCredit()])
            .then((res) => {

                const data = objectifyArray(res[0].data.data, {
                    by: ['id'],
                    recursive: true
                })

                dispatch({
                    type: types.GET_RUTAS,
                    payload: {
                        data,
                        id
                    }
                })
            })
            .catch((err) => {
                messageHandler(dispatch, err)
            })
    }
}

export function getListRutas() {
    return (dispatch) => {

        axios.get(`${API_URL}/parametros/rutas`)
            .then((res) => {
                dispatch({
                    type: types.GET_LISTA_RUTAS,
                    payload: {
                        data: res.data.data
                    }
                })

            })
            .catch((err) => {
                messageHandler(dispatch, err)
            });
    }
}

export function getClientes() {
    return (dispatch) => {
        axios.get(`${API_URL}/clientes`, {})
            .then((res) => {
                const data = objectifyArray(res.data.data, {
                    by: ['id'],
                    recursive: true
                })
                dispatch({
                    type: types.GET_CLIENTES_RUTA,
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

export function saveCredito() {
    return (dispatch, getState) => {
        let row = getState().rutas.get('selectRow').toJS();
        if (row.cliente !== null) {
            row.cliente_id = row.cliente.id;
            row.mod_cuota = row.cuota * 1000;
            row.mod_dias = row.dias;
            row.inicio_credito = moment(row.fecha).format('YYYY-MM-DD');          
            row.valor_prestamo = row.prestamo;            
            row.ruta_id = getState().rutas.get('idRuta');

            axios.post(`${API_URL}/creditos`, row)
                .then((res) => {

                    const data = objectifyArray(res.data.data, {
                        by: ['id'],
                        recursive: true
                    })

                    dispatch(toggleModal());
                    dispatch({
                        type: types.GET_RUTAS,
                        payload: {
                            data,
                            id : row.cliente.id
                        }
                    })

                    messageHandler(dispatch, {
                        success: 'Se ha agregado un nuevo registro'
                    })
                })
                .catch((err) => {
                    messageHandler(dispatch, err)
                })
        }
        else {
            messageHandler(dispatch, {
                warning: 'El cliente no puede estar vacío'
            })
        }
    }
}


export function saveAbonos() {
    return (dispatch, getState) => {
        let rows = getState().rutas.get('list').valueSeq().toJS();
        const id = getState().rutas.get('idRuta');

        const dataToSend = []
        rows.map((x, i) => {
            if (x.cuota) {
                dataToSend.push({ id : x.id, cuota : Number(x.cuota) * 1000 })
            }
        });
        console.log(dataToSend);

        axios.post(`${API_URL}/creditos/abonos`, { 'cuotas' : dataToSend, 'idRuta' : id })
        .then((res) => {
            
            const data = objectifyArray(res.data.data, {
                by: ['id'],
                recursive: true
            })
            
            dispatch({
                type: types.GET_RUTAS,
                payload: {
                    data,
                    id
                }
            })
            messageHandler(dispatch, {
                success: 'Se han guadado los abonos de la ruta'
            })
        })
        .catch((err) => {
            messageHandler(dispatch, err)
        })
    }
}

export function getDetallesRuta() {
    return (dispatch) => {
        // console.log('Hola')
        dispatch({
            type: types.GET_DETALLES_RUTAS
        })
    }
}

export function selectCliente(id) {
    return (dispatch) => {
        dispatch({
            type: types.SELECT_CLIENTE,
            payload: {
                id
            }
        })
    }
}