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
                        id,
                        cobrador: res[0].data.cobrador
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

export function getListPeriodos() {
    return (dispatch) => {

        axios.get(`${API_URL}/parametros/periodos`)
            .then((res) => {
                dispatch({
                    type: types.GET_LISTA_PERIODOS,
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
        axios.get(`${API_URL}/creditos/clientes`)
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
        console.log(row)
        if (row.cliente !== null) {
            row.cliente_id = row.cliente.id;
            row.mod_cuota = row.cuota * 1000;
            row.mod_dias = row.dias;
            row.valor_prestamo = row.prestamo * 1000;
            row.inicio_credito = moment(row.fecha).format('YYYY-MM-DD');
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
                            id: row.cliente.id,
                            cobrador: res.data.cobrador
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


export function saveAbonos(entrada, salida) {
    return (dispatch, getState) => {
        let rows = getState().rutas.get('list').valueSeq().toJS();
        const id = getState().rutas.get('idRuta');

        const dataToSend = []
        const renovaciones = []
        rows.map((x, i) => {
            dataToSend.push({ id: x.id, cuota: x.cuota ? Number(x.cuota) * 1000 : null, orden: x.orden })
            if (x.renovacion) {
                renovaciones.push({ id: x.id, excedente: x.renovacion.monto * 1000, observaciones: x.renovacion.observaciones, modalidad: x.renovacion.modalidad })
            }
        });

        console.log(renovaciones);

        axios.post(`${API_URL}/creditos/abonos`, { 'cuotas': dataToSend, 'idRuta': id, 'renovaciones': renovaciones, 'flujoCaja': { 'entrada': entrada, 'salida': salida } })
            .then((res) => {
                const data = objectifyArray(res.data.data, {
                    by: ['id'],
                    recursive: true
                })

                dispatch({
                    type: types.GET_RUTAS,
                    payload: {
                        data,
                        id,
                        cobrador: res.data.cobrador
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

export function saveRenovacion(id) {
    return (dispatch, getState) => {

        axios.post(`${API_URL}/creditos/renovaciones`, { 'id': id })
            .then((res) => {
                dispatch({
                    type: types.SET_RENOVACION,
                    payload: {
                        id
                    }
                });
                dispatch(toggleModal());
            })
            .catch((err) => {
                messageHandler(dispatch, err)
            })
    }
}

export function getDetallesRuta() {
    return (dispatch) => {
        dispatch({
            type: types.GET_DETALLES_RUTAS
        })
    }
}

export function getDetallesRenovaciones() {
    return (dispatch) => {
        dispatch({
            type: types.GET_DETALLE_RENOVACION
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

export function cleanDataRutas() {
    return (dispatch) => {
        dispatch({ type: types.CLEAN_DATA_RUTA })
    }
}

export function cleanRenovacion() {
    return (dispatch) => {
        dispatch({ type: types.CLEAN_DATA_RENOVACION })
    }
}

export function reorderList(list) {
    return (dispatch) => {
        dispatch({ type: types.REORDER_LIST_RUTA, payload: list })
    }
}

export function reorderData() {
    return (dispatch) => {
        dispatch({ type: types.REORDER_DATA_RUTA })
    }
}
