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


import requireAuth from './lib/requireAuth'

export default (
	<Switch>
		<Route exact path="/login" component={Login} />
		<Layout>
			<Route exact path="/" component={ requireAuth(Dashboard) } />					
			<Route exact path="/administracion/clientes" component={ requireAuth(Clientes) } />					
			<Route exact path="/administracion/personas" component={ requireAuth(Personas) } />					
			<Route exact path="/administracion/maestras" component={ requireAuth(Maestras) } />					
			<Route exact path="/administracion/roles" component={ requireAuth(Roles) } />					
			<Route exact path="/cobros/rutas" component={ requireAuth(Rutas) } />					
			<Route exact path="/cobros/flujoCaja" component={ requireAuth(FlujoCaja) } />					
			{/* <Route path="/rutaInstruccion/recetas" component={requireAuth(Recetas)} /> */}
		</Layout>
	</Switch>
)
