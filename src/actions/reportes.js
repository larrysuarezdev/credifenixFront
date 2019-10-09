import * as types from './types'
import { createAxiosInstance } from '../utils/helpers'
import { API_URL, messageHandler } from './index'
import { setLoading } from './common'

const axios = createAxiosInstance();

export function getCoteos(firstDay, lastDay) {
    return (dispatch) => {
        dispatch(setLoading(true));

        axios.get(`${API_URL}/reportes/coteos`, {
            params: {
                'fechaIni': firstDay,
                'fechaFin': lastDay,
            }
          })
            .then((res) => {
                dispatch(setLoading(false));
                dispatch({
                    type: types.GET_DATA_COTEO,
                    payload: {
                        list: res.data.data,
                        utilidades: res.data.utilidades,
                        recaudos: res.data.recaudos
                    }
                });
            })
            .catch((err) => {
                dispatch(setLoading(false));
                messageHandler(dispatch, err)
            })
    }
}