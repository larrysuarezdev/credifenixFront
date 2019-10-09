import * as types from '../actions/types'
import Immutable from 'immutable'
import { recalculate } from '../utils/helpers'
import objectifyArray from 'objectify-array'
import Swal from 'sweetalert2'

const newRow = {
    cliente: null,
    fecha: new Date(),
    prestamo: null,
    cuota: null,
    dias: null,
    observaciones: null,
    modalidad: 1,
}

const newRenovacion = {
    observaciones: '',
    valor: '',
    cuota: '',
    dias: '',
    monto: '',
    modalidad: 1
}

const INITIAL_STATE = Immutable.fromJS({
    list: [],
    AllList: [],
    detalles: [],
    renovaciones: [],
    ids: [],
    clientes: [],
    cartera: 0,
    nuevo: 0,
    nuevos: [],
    cobrador: 'Sin asignar',
    rutas: [],
    periodos: [],
    obs_dias: [],
    idRuta: null,
    detalle_selected: null,
    renovacion_selected: null,
    selected: null,
    selectRow: null,
    reorder: [],
    renovacion: null
})

export default function (state = INITIAL_STATE, action) {
    let creditos, row;
    switch (action.type) {
        case types.GET_RUTAS:
            creditos = recalculate(Immutable.fromJS(action.payload.data), 'id', true)
            state = state.set('list', creditos.list)
            state = state.set('AllList', creditos.list)
            state = state.set('reorder', creditos.list.sortBy(x => x.get('orden')).toList().toJS())
            state = state.set('ids', state.get('list').sortBy(x => x.get('orden')).keySeq().toList())
            state = state.set('idRuta', action.payload.id)
            state = state.set('cartera', creditos.cartera)
            if (action.payload.nuevo > 0) {
                state = state.update('nuevos', filter => filter.push(Immutable.fromJS({ id: action.payload.idCredito, valor: Number(action.payload.nuevo) })))
            }
            else {
                state = state.set('nuevos', INITIAL_STATE.get('nuevos'))
            }

            if (action.payload.cobrador !== null)
                state = state.set('cobrador', action.payload.cobrador)
            else
                state = state.set('cobrador', 'Sin asignar')

            return state
        case types.GET_LISTA_RUTAS:
            state = state.set('rutas', Immutable.fromJS(action.payload.data))
            return state
        case types.GET_LISTA_PERIODOS:
            state = state.set('periodos', Immutable.fromJS(action.payload.data))
            state = state.set('obs_dias', Immutable.fromJS(action.payload.obs_dias))            
            return state
        case types.GET_CLIENTES_RUTA:
            state = state.set('clientes', Immutable.fromJS(action.payload.data))
            return state
        case types.SELECCIONAR_RUTA:
            state = state.set('selected', action.payload)
            return state
        case types.SELECCIONAR_DETALLE_RUTA:
            state = state.set('detalle_selected', action.payload)
            return state
        case types.SELECCIONAR_DETALLE_RENOVACION:
            state = state.set('renovacion_selected', action.payload)
            return state
        case types.CHANGE_ATTR_LISTA_RUTA:
            if (state.getIn(['list', String(action.payload.id), 'renovacion']) !== undefined) {

            } else {
                if ((action.payload.value * 1000) > state.getIn(['list', String(action.payload.id), "saldo"])) {
                    alert("No puede digitar un valor mayor al saldo!");
                } else {
                    state = state.setIn(['list', String(action.payload.id), String(action.payload.attr)], action.payload.value)
                    creditos = recalculate(state.get('list'), 'id')
                    state = state.set('list', creditos.list)
                    state = state.set('cartera', creditos.cartera)
                }
            }
            return state
        case types.CHANGE_ATTR_RUTA:
            state = state.setIn(['selectRow', String(action.payload.attr)], action.payload.value)
            return state
        case types.CHANGE_ATTR_RENOVACION:
            state = state.setIn(['renovacion', String(action.payload.attr)], action.payload.value)
            if (action.payload.attr == 'valor') {
                const renovacion = state.get('renovacion').toJS();
                state = state.setIn(['renovacion', 'monto'], Number(renovacion.valor) - renovacion.saldo)
            }
            return state
        case types.NEW_RUTA:
            state = state.set('selectRow', Immutable.fromJS(newRow))
            return state
        case types.SELECT_CLIENTE:
            state = state.setIn(['selectRow', 'cliente'], state.getIn(['clientes', String(action.payload.id)]))
            return state
        case types.GET_DETALLES_RUTAS:
            state = state.set('detalles', state.getIn(['list', String(state.get('selected')), 'creditos_detalles']))
            return state
        case types.GET_DETALLE_RENOVACION:
            state = state.set('renovaciones', state.getIn(['list', String(state.get('selected')), 'creditos_renovaciones']))
            return state
        case types.CLEAN_DATA_RUTA:
            state = INITIAL_STATE
            return state
        case types.CLEAN_DATA_RENOVACION:
            row = state.getIn(['list', String(action.payload.id)]).toJS();
            newRenovacion.valor = row.valor_prestamo / 1000;
            newRenovacion.cuota = row.mod_cuota / 1000;
            newRenovacion.dias = row.mod_dias;
            newRenovacion.saldo = row.saldo / 1000;
            newRenovacion.monto = newRenovacion.valor - newRenovacion.saldo;
            newRenovacion.utilidad = (newRenovacion.dias * newRenovacion.cuota) - newRenovacion.valor;
            newRenovacion.editable = true;

            state = state.set('renovacion', Immutable.fromJS(newRenovacion))
            return state
        case types.REORDER_LIST_RUTA:
            state = state.set('reorder', action.payload)
            return state;
        case types.REORDER_DATA_RUTA:
            state.get('reorder').map((item) => {
                state = state.setIn(['list', String(item.id), 'orden'], item.NewOrden)
            })
            const list = state.get('list').sortBy(x => x.get('orden')).toList().toJS();
            creditos = recalculate(Immutable.fromJS(list), 'id', true)
            state = state.set('list', INITIAL_STATE.get('list'))
            state = state.set('list', creditos.list)
            state = state.set('ids', state.get('list').sortBy(x => x.get('orden')).keySeq().toList())
            return state;

        case types.SET_RENOVACION:
            const renovacion = state.get('renovacion').toJS();
            state = state.setIn(['list', String(action.payload.id), 'valor_prestamo'], renovacion.valor * 1000);
            state = state.setIn(['list', String(action.payload.id), 'mod_cuota'], renovacion.cuota * 1000);
            state = state.setIn(['list', String(action.payload.id), 'mod_dias'], renovacion.dias);
            state = state.setIn(['list', String(action.payload.id), 'valor_total'], renovacion.dias * (renovacion.cuota * 1000));
            state = state.setIn(['list', String(action.payload.id), 'renovacion'], renovacion);
            state = state.setIn(['list', String(action.payload.id), 'cuota'], null);
            return state;

        case types.SET_DATA_RENOVACION:
            row = state.getIn(['list', String(action.payload.id)]).toJS()
            state = state.set('renovacion', Immutable.fromJS({ observaciones: "RENOVACION AUTOMATICA", monto: (row.valor_prestamo - row.saldo) / 1000, modalidad: row.modalidad, cuota: row.mod_cuota / 1000, dias: row.mod_dias, valor: row.valor_prestamo / 1000, editable: false }))
            state = state.setIn(['list', String(action.payload.id), 'renovacion'], state.get('renovacion'));
            state = state.setIn(['list', String(action.payload.id), 'cuota'], null);
            return state;

        case types.DELETE_RENOVACION:
            state = state.setIn(['list', String(action.payload.id), 'renovacion'], null);
            return state;

        case types.DELETE_CREDITO:
            state = state.setIn(['list', String(action.payload.id), 'delete'], true);

            const index = state.get('nuevos').findIndex(x => x.get('id') === Number(action.payload.id))

            if (index !== -1)
                state = state.deleteIn(['nuevos', index]);

            return state;


        case types.UPDATED_MAESTRA_RUTAS:
            const data = objectifyArray(action.payload, {
                by: ['id'],
                recursive: true
            })
            state = state.set('list', Immutable.fromJS(data))
            state = state.set('selected', null)
            state = state.set('ids', state.get('list').sortBy(x => x.get('id')).keySeq().toList())
            return state
        default:
            return state
    }
}