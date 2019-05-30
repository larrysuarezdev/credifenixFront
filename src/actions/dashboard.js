import * as types from './types'
import { API_URL, messageHandler } from './index'
import { createAxiosInstance } from '../utils/helpers'

const axios = createAxiosInstance();

export function getNewClientes(){
    function newClientes() {
        return axios.get(`${API_URL}/dashboard/newclientes`);
    }

    return (dispatch) => {
        Promise.all([newClientes()])
            .then((res) => {
                dispatch({
                    type: types.GET_DASHBOARD,
                    payload: {
                        clientesNew: res[0].data.clientesNew
                    }
                })
            })
            .catch((err) => {
                messageHandler(dispatch, err)
            })
    }
}