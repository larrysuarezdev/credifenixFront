import { combineReducers } from 'redux'
import messages from './messageHandling'
import auth from './auth'
import clientes from './clientes'
import common from './common'
import parametros from './parametros'
import roles from './roles'
import rutas from './rutas'
import usuarios from './usuarios'


const appReducer = combineReducers({
    messages,
    auth,
    clientes,
    common,
    parametros,
    roles,
    rutas,
    usuarios
})

const rootReducer = (state, action) => {
    if (action.type === 'CERRAR_SESION') {
        state = undefined
    }

    return appReducer(state, action)
}

export default rootReducer


