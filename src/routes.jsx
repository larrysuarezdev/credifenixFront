import React from 'react'
import { Route, Switch } from 'react-router'

import Login from './containers/Login'
import Layout from './containers/Layout'

import Dashboard from './containers/Dashboard'
import Clientes from './containers/Administracion/Clientes'
import Personas from './containers/Administracion/Personas'
import Maestras from './containers/Administracion/Parametros'
import Roles from './containers/Administracion/Roles'
import Rutas from './containers/Cobros/Rutas'
import FlujoCaja from './containers/Cobros/FlujoCaja'
import FlujoUtilidades from './containers/Cobros/FlujoUtilidades'


import requireAuth from './lib/requireAuth'

export default (
	<Switch>
		<Route path="/login" component={Login} />
		<Layout>
			<Route exact path="/" component={ requireAuth(Dashboard) } />					
			<Route path="/administracion/clientes" component={ requireAuth(Clientes) } />					
			<Route path="/administracion/personas" component={ requireAuth(Personas) } />					
			<Route path="/administracion/maestras" component={ requireAuth(Maestras) } />					
			<Route path="/administracion/roles" component={ requireAuth(Roles) } />					
			<Route path="/cobros/rutas" component={ requireAuth(Rutas) } />					
			<Route path="/cobros/flujoCaja" component={ requireAuth(FlujoCaja) } />					
			<Route path="/cobros/flujoUtilidades" component={ requireAuth(FlujoUtilidades) } />					
			{/* <Route path="/rutaInstruccion/recetas" component={requireAuth(Recetas)} /> */}
		</Layout>
	</Switch>
)
