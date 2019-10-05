import * as types from './types'
import {
    createModalFilterFunction
} from '../utils/helpers'

// import { getArticulos } from "./articulosMaestras";

export function showHideModalFilter(state, columnas = [], mode = null, searchBack = false) {
    return (dispatch) => {
        dispatch({
            type: types.SHOW_HIDE_MODAL_MAESTRAS,
            payload: {
                state,
                columnas,
                mode,
                searchBack
            }
        })
    }
}

export function addModalFilterCriteria() {
    return (dispatch) => {
        dispatch({
            type: types.ADICIONAR_CRITERIO_FILTRADO_MAESTRAS
        })
    }
}

export function updateModalFilterCriteria(index, attr, value) {
    return (dispatch) => {
        dispatch({
            type: types.MODIFICAR_CRITERIO_FILTRADO_MAESTRAS,
            payload: {
                index,
                attr,
                value
            }
        })
    }
}

export function toggleCheckedModalFilterCriterias(index, checked) {
    return (dispatch) => {
        dispatch({
            type: types.CONMUTAR_SELECCION_CRITERIO_FILTRADO_MAESTRAS,
            payload: {
                index,
                checked
            }
        })
    }
}

export function removeCheckedModalFilterCriterias() {
    return (dispatch) => {
        dispatch({
            type: types.ELIMINAR_CRITERIO_FILTRADO_MAESTRAS
        })
    }
}

export function applyModalFilterCriterias() {
    return (dispatch, getState) => {
        const searchBack = getState().common.get('searchBack')

        if (!searchBack) {
            const mode = getState().common.get('mode')
            
            let data = getState()[mode].get('AllList').valueSeq().toJS()
            console.log(data)
            if (getState().common.get('modalFilters').size > 0) {
                getState().common.get('modalFilters').forEach(x => {
                    data = data.filter(createModalFilterFunction(x))
                })
            }

            dispatch({
                type: types[`UPDATED_MAESTRA_${mode.toUpperCase()}`],
                payload: data
            })
        }else{
            console.log("debe buscar...")
            // dispatch(getArticulos());
        }
    }
}