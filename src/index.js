import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'  
import { Router } from 'react-router'
import createHistory from 'history/createBrowserHistory'
import reduxThunk from 'redux-thunk'
import { Cookies } from 'react-cookie';
import { INICIAR_SESION } from './actions/types'
import routes from './routes'
import reducers from './reducers'
import { ToastContainer } from 'react-toastify'

//ui
import './css/fontawesome-free/css/all.css'
import './css/fonts.css'
import './css/sb-admin-2.css'
import './css/main.css'
import './css/tabs.css'
import './css/tables.css'
import './css/dNd.css'
import 'react-toastify/dist/ReactToastify.min.css'



const cookie = new Cookies();
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore)
const store = createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
const history = createHistory()

const token = cookie.get('token')
const user = cookie.get('user')

if (token) {
    store.dispatch({ type: INICIAR_SESION, payload: user })
}

window.root = window.document.getElementById('root')

ReactDOM.render(
    <Provider store={store}>
        <div>
            <Router history={ history }>
                { routes }
            </Router>
            <ToastContainer />
        </div>
    </Provider>,
    window.root
)
