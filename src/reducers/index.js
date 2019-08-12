import { combineReducers } from 'redux'
import messages from './messageHandling'
import dashboard from './dashboard'
import auth from './auth'
import clientes from './clientes'
import common from './common'
import parametros from './parametros'
import roles from './roles'
import rutas from './rutas'
import flujoCaja from './flujoCaja'
import flujoUtilidades from './flujoUtilidades'
import usuarios from './usuarios'


const appReducer = combineReducers({
    messages,
    dashboard,
    auth,
    clientes,
    common,
    parametros,
    roles,
    rutas,
    flujoCaja,
    flujoUtilidades,
    usuarios
})

const rootReducer = (state, action) => {
    if (action.type === 'CERRAR_SESION') {
        state = undefined
    }

    return appReducer(state, action)
}

export default rootReducer


