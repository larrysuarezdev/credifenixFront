import React, { Component } from 'react';
import { connect } from 'react-redux'

//UI
import Card from '../../components/Common/Card'
import Modal from '../../components/Common/Modal'
import BoxButtonV1 from '../../components/Common/BoxButtonV1'
import BoxButtonV2 from '../../components/Common/BoxButtonV2'
import ListaParametros from '../../components/Administracion/Parametros/ListaParametros'
import ListaDetalles from '../../components/Administracion/Parametros/ListaDetalles'

import { getParametros, saveAction, updatedAction } from '../../actions/parametros'
import { selectAction, changeAttr2, changeAttr, toggleModal, newRow } from '../../actions/common'

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

  newParametro() {
    this.props.toggleModal();
    this.props.newRow('PARAMETRO');
  }

  saveAction(){
    this.props.saveAction();
    this.props.toggleModal();
  }

  render() {
    const buttons = [
      <BoxButtonV1 key="bb[0][0]" name="plus" onClick={() => this.newParametro()} title="Agregar" classCSS="success" disabled={this.props.editable ? false : true} />,
      <BoxButtonV1 key="bb[0][1]" name="save" onClick={() => this.props.updatedAction()} title="Guardar cambios" classCSS="success" disabled={this.props.editable ? false : true} />,
    ]

    const buttons1 = [
      <BoxButtonV2 key="bb[1][0]" name="save" onClick={() => this.saveAction()} title="Guardar" />,
    ]

    const { list, ids, selectRow, editable, selected, newRowParametro, changeAttr } = this.props;

    // console.log(selectRow)
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
        <Modal title="Agregar Paramámetros" brand={true} buttons={buttons1}  >
          <div className="row">
            <div className="col">
              <label htmlFor="id_interno">Identificador interno</label>
              <input className="form-control form-control-sm" type="number" id="id_interno" readOnly value={newRowParametro !== null ? newRowParametro.get('id_interno') : ''} disabled />
            </div>
            <div className="col">
              <label htmlFor="valor">Valor</label>
              <input className="form-control form-control-sm" type="text" id="valor" value={newRowParametro !== null ? newRowParametro.get('valor') : ''} onChange={(e) => changeAttr("PARAMETRO", 'valor', e.target.value)} />
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    list: state.parametros.get('list'),
    selectRow: state.parametros.get('selectRow'),
    newRowParametro: state.parametros.get('newRowParametro'),
    ids: state.parametros.get('ids'),
    editable: state.parametros.getIn(['list', String(state.parametros.get('selected')), 'editable']),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getParametros: () => dispatch(getParametros()),
    toggleModal: () => dispatch(toggleModal()),
    newRow: (tipo) => dispatch(newRow(tipo)),
    saveAction: () => dispatch(saveAction()),
    updatedAction: () => dispatch(updatedAction()),    
    selectAction: (id, reloadGrid, tipo) => dispatch(selectAction(id, reloadGrid, tipo)),
    changeAttr2: (tipo, id, attr, value) => dispatch(changeAttr2(tipo, id, attr, value)),
    changeAttr: (tipo, attr, value) => dispatch(changeAttr(tipo, attr, value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Maestras)