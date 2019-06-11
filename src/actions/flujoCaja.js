import * as types from './types'
import { createAxiosInstance } from '../utils/helpers'

import { API_URL, messageHandler } from './index'
import objectifyArray from 'objectify-array'

const axios = createAxiosInstance();


export function getFlujoCaja() {
    
    function getFlujoCaja() {
        return axios.get(`${API_URL}/flujoCaja`);
    }

    return (dispatch) => {
        Promise.all([getFlujoCaja()])
            .then((res) => {

                const data = objectifyArray(res[0].data.data, {
                    by: ['id'],
                    recursive: true
                })

                dispatch({
                    type: types.GET_FLUJO_CAJA,
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
