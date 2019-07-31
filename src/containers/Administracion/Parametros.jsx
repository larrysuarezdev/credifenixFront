import React, { Component } from 'react';
import { connect } from 'react-redux'

//UI
import Card from '../../components/Common/Card'
import BoxButtonV1 from '../../components/Common/BoxButtonV1'
import ListaParametros from '../../components/Administracion/Parametros/ListaParametros'
import ListaDetalles from '../../components/Administracion/Parametros/ListaDetalles'

import { getParametros } from '../../actions/parametros'
import { selectAction, changeAttr2 } from '../../actions/common'


class Maestras extends Component {
  constructor(props) {
    super(props);

    this.lisActionClick = this.lisActionClick.bind(this);
    this.changeAction = this.changeAction.bind(this);

    this.state = {

    };
  }

  componentWillMount() {
    this.props.getParametros();
  }

  lisActionClick(id) {
    this.props.selectAction(id, null, 'PARAMETRO')
  }

  changeAction(tipo, id, attr, value) {
    this.props.changeAttr2(tipo, id, attr, value)
  }

  render() {
    const buttons = [
      <BoxButtonV1 key="bb[0][0]" name="plus" onClick={() => console.log('debe agregar')} title="Agregar" classCSS="success" disabled={this.props.editable ? false : true} />,
    ]

    const { list, ids, selectRow, editable, selected } = this.props;

    return (
      <div className="row">
        <div className="col-md-6 col-xs-12">
          <Card text="Configuración de parámetros" >
            <ListaParametros list={list} actionClick={this.lisActionClick} />
          </Card>
        </div>

        <div className="col-md-6 col-xs-12">
          <Card text="Detalles de parámetro" buttons={buttons} >
            {
              selectRow !== null ?
                <ListaDetalles list={selectRow} ids={ids} changeAction={this.changeAction} editable={editable} />
                :
                null
            }
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
    ids: state.parametros.get('ids'),
    editable: state.parametros.getIn(['list', String(state.parametros.get('selected')), 'editable']),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getParametros: () => dispatch(getParametros()),
    selectAction: (id, reloadGrid, tipo) => dispatch(selectAction(id, reloadGrid, tipo)),
    changeAttr2: (tipo, id, attr, value) => dispatch(changeAttr2(tipo, id, attr, value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Maestras)