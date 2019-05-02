import React, { Component } from 'react';
import { connect } from 'react-redux'

//UI
import Card from '../../components/Common/Card'
import BoxButtonV1 from '../../components/Common/BoxButtonV1'
import ListaParametros from '../../components/Administracion/Parametros/ListaParametros'
import ListaDetalles from '../../components/Administracion/Parametros/ListaDetalles'

import { getParametros } from '../../actions/parametros'
import { selectAction } from '../../actions/common'


class Maestras extends Component {
  constructor(props) {
    super(props);
    
    this.lisActionClick = this.lisActionClick.bind(this);

    this.state = {

    };
  }

  componentWillMount() {
    this.props.getParametros();
  }

  lisActionClick(id) {
    this.props.selectAction(id, null, 'PARAMETRO')
  }

  render() {
    const buttons = [
      <BoxButtonV1 key="bb[0][0]" name="plus" onClick={() => console.log('debe agregar')} title="Agregar" classCSS="success" />,
      <BoxButtonV1 key="bb[0][1]" name="pencil-alt" onClick={() => console.log('debe actualizar')} title="Editar" classCSS="info" />,
    ]

    const { list, selectRow } = this.props;
    // const tipo = "CLIENTE";

    return (
      <div className="row">
        <div className="col-md-6 col-xs-12">
          <Card text="Configuración de parámetros" >
            <ListaParametros list={list} actionClick={this.lisActionClick} />
          </Card>
        </div>

        <div className="col-md-6 col-xs-12">
          <Card text="Detalles de parámetro" buttons={buttons} >
            <ListaDetalles list={selectRow}  />
          </Card>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    list: state.parametros.get('list'),
    selectRow: state.parametros.get('selectRow'),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getParametros: () => dispatch(getParametros()),
    selectAction: (id, reloadGrid, tipo) => dispatch(selectAction(id, reloadGrid, tipo)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Maestras)