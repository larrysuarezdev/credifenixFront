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
                const data_N = [], data_R = [];
                let label1 = [], label2 = [];

                res[0].data.clientesNew.forEach(x => {
                    label1.push(x.label);
                    data_N.push(x.value)
                });

                res[0].data.clientesRen.forEach(x => {
                    label2.push(x.label);
                    data_R.push(x.value)
                });

                // labels =  labels.filter((v, i, a) => a.indexOf(v) === i);
                // console.log(labels, data_N, data_R)
                dispatch({
                    type: types.GET_DASHBOARD,
                    payload: {
                        cantNew: res[0].data.cantNew,
                        cantRen: res[0].data.cantRen,
                        label1,
                        label2,
                        data_N,
                        data_R
                    }
                })
            })
            .catch((err) => {
                messageHandler(dispatch, err)
            })
    }
}