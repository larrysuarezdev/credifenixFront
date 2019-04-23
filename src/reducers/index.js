import { combineReducers } from 'redux'
import messages from './messageHandling'
import auth from './auth'
import common from './common'
import roles from './roles'
import rutas from './rutas'
import usuarios from './usuarios'


const appReducer = combineReducers({
    messages,
    auth,
    common,
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

