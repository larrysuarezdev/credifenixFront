import React, { Component } from 'react';
import { connect } from 'react-redux'

// UI
import Card from '../../Common/Card'
import BoxButtonV1 from '../../Common/BoxButtonV1'
import BoxButtonV2 from '../../Common/BoxButtonV2'
import TableVirtualized from '../../Common/TableVirtualized'
import Modal from '../../Common/Modal'

import { changeAttr, toggleModal, selectAction, newRow, editRow } from '../../../actions/common'
import { saveAction, saveActionReferencias } from '../../../actions/clientes'
import { tableColumnsReferenciasCliente } from '../../../utils/headersColumns'

class AddClientes extends Component {

    constructor(props) {
        super(props);
        this.actionClick = this.actionClick.bind(this);

        this.state = {
            tipoRef: ''
        }
    }

    toggle(tipo) {
        this.setState({ tipoRef: tipo })
        this.props.newRow("REFERENCIA");
        this.props.toggleModal();
    }

    save() {
        this.props.saveActionReferencias(this.state.tipoRef)
    }

    actionClick(id) {
        this.props.editRow("REFERENCIA", id);
        this.props.toggleModal();
    }

    render() {
        let listTitular, idsTitular, listFiador, idsFiador;
        const buttonsTitular = [
            <BoxButtonV1 key="bb[0][0]" name="plus" onClick={() => this.toggle('TITULAR')} title="Agregar referencia" classCSS="info" />,
        ]

        const buttonsFiador = [
            <BoxButtonV1 key="bb[1][0]" name="plus" onClick={() => this.toggle('FIADOR')} title="Agregar referencia" classCSS="info" />,
        ]

        const buttonsModal = [
            <BoxButtonV2 key="bb[2][0]" name="save" onClick={() => this.save()} title="Agregar referencia" classCSS="info" />,
        ]

        const { changeAttr, saveAction, selectRow, selectRowReferencia, edit, selectedTitular, selectedFiador, selectAction, showReferencias } = this.props;
        const tipo = "CLIENTE";
        const list = selectRow.get('clientes_referencias');

        if (list !== undefined) {
            listTitular = list.filter(x => x.get('tipo_referencia') === 'TITULAR');
            idsTitular = listTitular.sortBy(x => x.get('id')).keySeq().toList();
            listFiador = list.filter(x => x.get('tipo_referencia') === 'FIADOR');
            idsFiador = listFiador.sortBy(x => x.get('id')).keySeq().toList();
        }

        return (
            <div className="col-md-12 col-xl-12" style={{ marginTop: 10 }}>
                <Card text="Información básica">
                    <div className="row">
                        <div className="col-md-4">
                            <label >Titular</label>
                            <input className={`form-control form-control-sm ${selectRow === null ? '' : selectRow.get('titular') !== "" ? 'is-valid' : 'is-invalid'}`} type="text" value={selectRow === null ? '' : selectRow.get('titular')} onChange={(e) => changeAttr(tipo, 'titular', e.target.value)} required></input>
                        </div>
                        <div className="col-md-2">
                            <label >Identificación</label>
                            <input className={`form-control form-control-sm ${selectRow === null ? '' : selectRow.get('cc_titular') !== "" ? 'is-valid' : 'is-invalid'}`} type="number" value={selectRow === null ? '' : selectRow.get('cc_titular')} onChange={(e) => changeAttr(tipo, 'cc_titular', e.target.value)} required></input>
                        </div>
                        <div className="col-md-4">
                            <label >Fiador</label>
                            <input className={`form-control form-control-sm ${selectRow === null ? '' : selectRow.get('fiador') !== "" ? 'is-valid' : 'is-invalid'}`} type="text" value={selectRow === null ? '' : selectRow.get('fiador')} onChange={(e) => changeAttr(tipo, 'fiador', e.target.value)} required></input>
                        </div>
                        <div className="col-md-2">
                            <label >Identificación</label>
                            <input className={`form-control form-control-sm ${selectRow === null ? '' : selectRow.get('cc_fiador') !== "" ? 'is-valid' : 'is-invalid'}`} type="number" value={selectRow === null ? '' : selectRow.get('cc_fiador')} onChange={(e) => changeAttr(tipo, 'cc_fiador', e.target.value)} required></input>
                        </div>

                        <div className="col-md-6">
                            <label >Negocio titular</label>
                            <input className={`form-control form-control-sm ${selectRow === null ? '' : selectRow.get('neg_titular') !== "" ? 'is-valid' : 'is-invalid'}`} type="text" value={selectRow === null ? '' : selectRow.get('neg_titular')} onChange={(e) => changeAttr(tipo, 'neg_titular', e.target.value)} required></input>
                        </div>
                        <div className="col-md-6">
                            <label >Negocio fiador</label>
                            <input className={`form-control form-control-sm ${selectRow === null ? '' : selectRow.get('neg_fiador') !== "" ? 'is-valid' : 'is-invalid'}`} type="text" value={selectRow === null ? '' : selectRow.get('neg_fiador')} onChange={(e) => changeAttr(tipo, 'neg_fiador', e.target.value)} required></input>
                        </div>
                    </div>

                    <hr></hr>

                    <div className="row">
                        <div className="col-md-4">
                            <label >Dirección de cobro </label>
                            <input className={`form-control form-control-sm ${selectRow === null ? '' : selectRow.get('dir_cobro') !== "" ? 'is-valid' : 'is-invalid'}`} type="text" value={selectRow === null ? '' : selectRow.get('dir_cobro')} onChange={(e) => changeAttr(tipo, 'dir_cobro', e.target.value)} required></input>
                        </div>
                        <div className="col-md-4">
                            <label >Barrio </label>
                            <input className={`form-control form-control-sm ${selectRow === null ? '' : selectRow.get('barrio_cobro') !== "" ? 'is-valid' : 'is-invalid'}`} type="text" value={selectRow === null ? '' : selectRow.get('barrio_cobro')} onChange={(e) => changeAttr(tipo, 'barrio_cobro', e.target.value)} required></input>
                        </div>
                        <div className="col-md-4">
                            <label >Telefono </label>
                            <input className={`form-control form-control-sm ${selectRow === null ? '' : selectRow.get('tel_cobro') !== "" ? 'is-valid' : 'is-invalid'}`} type="number" value={selectRow === null ? '' : selectRow.get('tel_cobro')} onChange={(e) => changeAttr(tipo, 'tel_cobro', e.target.value)} required></input>
                        </div>
                        <div className="col-md-4">
                            <label >Dirección de casa </label>
                            <input className={`form-control form-control-sm ${selectRow === null ? '' : selectRow.get('dir_casa') !== "" ? 'is-valid' : 'is-invalid'}`} type="text" value={selectRow === null ? '' : selectRow.get('dir_casa')} onChange={(e) => changeAttr(tipo, 'dir_casa', e.target.value)} required></input>
                        </div>
                        <div className="col-md-4">
                            <label >Barrio </label>
                            <input className={`form-control form-control-sm ${selectRow === null ? '' : selectRow.get('barrio_casa') !== "" ? 'is-valid' : 'is-invalid'}`} type="text" value={selectRow === null ? '' : selectRow.get('barrio_casa')} onChange={(e) => changeAttr(tipo, 'barrio_casa', e.target.value)} required></input>
                        </div>
                        <div className="col-md-4">
                            <label >Telefono </label>
                            <input className={`form-control form-control-sm ${selectRow === null ? '' : selectRow.get('tel_casa') !== "" ? 'is-valid' : 'is-invalid'}`} type="number" value={selectRow === null ? '' : selectRow.get('tel_casa')} onChange={(e) => changeAttr(tipo, 'tel_casa', e.target.value)} required></input>
                        </div>
                        <hr></hr>
                        <div className="col-md-4">
                            <label >Dirección de fiador </label>
                            <input className={`form-control form-control-sm ${selectRow === null ? '' : selectRow.get('dir_fiador') !== "" ? 'is-valid' : 'is-invalid'}`} type="text" value={selectRow === null ? '' : selectRow.get('dir_fiador')} onChange={(e) => changeAttr(tipo, 'dir_fiador', e.target.value)} required></input>
                        </div>
                        <div className="col-md-4">
                            <label >Barrio </label>
                            <input className={`form-control form-control-sm ${selectRow === null ? '' : selectRow.get('barrio_fiador') !== "" ? 'is-valid' : 'is-invalid'}`} type="text" value={selectRow === null ? '' : selectRow.get('barrio_fiador')} onChange={(e) => changeAttr(tipo, 'barrio_fiador', e.target.value)} required></input>
                        </div>
                        <div className="col-md-4">
                            <label >Telefono </label>
                            <input className={`form-control form-control-sm ${selectRow === null ? '' : selectRow.get('tel_fiador') !== "" ? 'is-valid' : 'is-invalid'}`} type="number" value={selectRow === null ? '' : selectRow.get('tel_fiador')} onChange={(e) => changeAttr(tipo, 'tel_fiador', e.target.value)} required></input>
                        </div>
                    </div>
                </Card>

                {
                    showReferencias ?
                        <div className="row">
                            <div className="col-md-6 col-xs-12">
                                <Card text="Referencias del titular" buttons={buttonsTitular} >
                                    <div style={{ height: 180, maxHeight: 180 }} >
                                        {
                                            list !== undefined ?
                                                <TableVirtualized
                                                    tableColumns={tableColumnsReferenciasCliente}
                                                    ids={idsTitular}
                                                    list={listTitular}
                                                    keyVal="id"
                                                    actionSelect={selectAction}
                                                    actionClick={this.actionClick}
                                                    selected={selectedTitular}
                                                    tipo="CLIENTE_TITULAR"
                                                />
                                                : null
                                        }
                                    </div>
                                </Card>
                            </div>

                            <div className="col-md-6 col-xs-12">
                                <Card text="Referencias del fiador" buttons={buttonsFiador}>
                                    <div style={{ height: 180, maxHeight: 180 }} >
                                        {
                                            list !== undefined ?
                                                <TableVirtualized
                                                    tableColumns={tableColumnsReferenciasCliente}
                                                    ids={idsFiador}
                                                    list={listFiador}
                                                    keyVal="id"
                                                    actionSelect={selectAction}
                                                    actionClick={this.actionClick}
                                                    selected={selectedFiador}
                                                    tipo="CLIENTE_FIADOR"
                                                />
                                                : null
                                        }
                                    </div>
                                </Card>
                            </div>
                        </div>
                        : null
                }
                <div className="float-right">
                    <a className="btn btn-success btn-icon-split" href="#" onClick={() => saveAction()}  >
                        <span className="icon text-white-50">
                            <i className="fas fa-save"></i>
                        </span>
                        <span className="text">
                            {edit ? "Actualizar" : "Guardar"}
                        </span>
                    </a>
                    <div className="my-3"></div>
                </div>

                <Modal title={"Agregar referencia " + this.state.tipoRef} buttons={buttonsModal} brand={true} >
                    <div className="row">
                        <div className="col-md-6">
                            <label>Nombre </label>
                            <input className="form-control form-control-sm" value={selectRowReferencia === undefined || selectRowReferencia === null ? '' : selectRowReferencia.get('nombre')} onChange={(e) => changeAttr("REFERENCIA", 'nombre', e.target.value)} ></input>
                        </div>
                        <div className="col-md-6">
                            <label>Dirección </label>
                            <input className="form-control form-control-sm" value={selectRowReferencia === undefined || selectRowReferencia === null ? '' : selectRowReferencia.get('direccion')} onChange={(e) => changeAttr("REFERENCIA", 'direccion', e.target.value)} ></input>
                        </div>
                        <div className="col-md-4">
                            <label>Barrio </label>
                            <input className="form-control form-control-sm" value={selectRowReferencia === undefined || selectRowReferencia === null ? '' : selectRowReferencia.get('barrio')} onChange={(e) => changeAttr("REFERENCIA", 'barrio', e.target.value)} ></input>
                        </div>
                        <div className="col-md-4">
                            <label>Teléfono </label>
                            <input className="form-control form-control-sm" value={selectRowReferencia === undefined || selectRowReferencia === null ? '' : selectRowReferencia.get('telefono')} onChange={(e) => changeAttr("REFERENCIA", 'telefono', e.target.value)} ></input>
                        </div>
                        <div className="col-md-4">
                            <label>Parentesco </label>
                            <input className="form-control form-control-sm" value={selectRowReferencia === undefined || selectRowReferencia === null ? '' : selectRowReferencia.get('parentesco')} onChange={(e) => changeAttr("REFERENCIA", 'parentesco', e.target.value)} ></input>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        selectRow: state.clientes.get('selectRow'),
        selectRowReferencia: state.clientes.get('selectRowReferencia'),
        edit: state.clientes.get('edit'),
        selectedFiador: state.clientes.get('selectedFiador'),
        selectedTitular: state.clientes.get('selectedTitular'),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeAttr: (tipo, attr, value) => dispatch(changeAttr(tipo, attr, value)),
        saveAction: () => dispatch(saveAction()),
        saveActionReferencias: (tipo) => dispatch(saveActionReferencias(tipo)),
        selectAction: (id, reloadGrid, tipo) => dispatch(selectAction(id, reloadGrid, tipo)),
        toggleModal: () => dispatch(toggleModal()),
        newRow: (tipo) => dispatch(newRow(tipo)),
        editRow: (tipo, id) => dispatch(editRow(tipo, id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddClientes)