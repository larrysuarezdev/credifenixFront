import React, { Component } from 'react';
import { connect } from 'react-redux'

// UI
import Card from '../../Common/Card'
import BoxButtonV1 from '../../Common/BoxButtonV1'

import { saveAction } from '../../../actions/clientes'
import { changeAttr } from '../../../actions/common'

class AddClientes extends Component {
    render() {
        const buttons = [
            <BoxButtonV1 key="bb[0][0]" name="plus" onClick={() => console.log('debe agregar')} title="Agregar referencia" classCSS="info" />,
        ]

        const { changeAttr, saveAction, selectRow, edit } = this.props;
        const tipo = "CLIENTE";

        return (
            <div className="col-md-12 col-xl-12" style={{ marginTop: 10 }}>
                <Card text="Información básica">
                    <div className="row">
                        <div className="col-md-4">
                            <label >Titular</label>
                            <input className="form-control form-control-sm" type="text" value={selectRow === null ? '' : selectRow.get('titular')} onChange={(e) => changeAttr(tipo, 'titular', e.target.value)} ></input>
                        </div>
                        <div className="col-md-2">
                            <label >Identificación</label>
                            <input className="form-control form-control-sm" type="number" value={selectRow === null ? '' : selectRow.get('cc_titular')} onChange={(e) => changeAttr(tipo, 'cc_titular', e.target.value)} ></input>
                        </div>
                        <div className="col-md-4">
                            <label >Fiador</label>
                            <input className="form-control form-control-sm" type="text" value={selectRow === null ? '' : selectRow.get('fiador')} onChange={(e) => changeAttr(tipo, 'fiador', e.target.value)}></input>
                        </div>
                        <div className="col-md-2">
                            <label >Identificación</label>
                            <input className="form-control form-control-sm" type="number" value={selectRow === null ? '' : selectRow.get('cc_fiador')} onChange={(e) => changeAttr(tipo, 'cc_fiador', e.target.value)} ></input>
                        </div>

                        <div className="col-md-6">
                            <label >Negocio titular</label>
                            <input className="form-control form-control-sm" type="text" value={selectRow === null ? '' : selectRow.get('neg_titular')} onChange={(e) => changeAttr(tipo, 'neg_titular', e.target.value)} ></input>
                        </div>
                        <div className="col-md-6">
                            <label >Negocio fiador</label>
                            <input className="form-control form-control-sm" type="text" value={selectRow === null ? '' : selectRow.get('neg_fiador')} onChange={(e) => changeAttr(tipo, 'neg_fiador', e.target.value)} ></input>
                        </div>
                    </div>

                    <hr></hr>

                    <div className="row">
                        <div className="col-md-4">
                            <label >Dirección de cobro </label>
                            <input className="form-control form-control-sm" type="text" value={selectRow === null ? '' : selectRow.get('dir_cobro')} onChange={(e) => changeAttr(tipo, 'dir_cobro', e.target.value)} ></input>
                        </div>
                        <div className="col-md-4">
                            <label >Barrio </label>
                            <input className="form-control form-control-sm" type="text" value={selectRow === null ? '' : selectRow.get('barrio_cobro')} onChange={(e) => changeAttr(tipo, 'barrio_cobro', e.target.value)} ></input>
                        </div>
                        <div className="col-md-4">
                            <label >Telefono </label>
                            <input className="form-control form-control-sm" type="number" value={selectRow === null ? '' : selectRow.get('tel_cobro')} onChange={(e) => changeAttr(tipo, 'tel_cobro', e.target.value)} ></input>
                        </div>

                        <div className="col-md-4">
                            <label >Dirección de casa </label>
                            <input className="form-control form-control-sm" type="text" value={selectRow === null ? '' : selectRow.get('dir_casa')} onChange={(e) => changeAttr(tipo, 'dir_casa', e.target.value)} ></input>
                        </div>
                        <div className="col-md-4">
                            <label >Barrio </label>
                            <input className="form-control form-control-sm" type="text" value={selectRow === null ? '' : selectRow.get('barrio_casa')} onChange={(e) => changeAttr(tipo, 'barrio_casa', e.target.value)} ></input>
                        </div>
                        <div className="col-md-4">
                            <label >Telefono </label>
                            <input className="form-control form-control-sm" type="number" value={selectRow === null ? '' : selectRow.get('tel_casa')} onChange={(e) => changeAttr(tipo, 'tel_casa', e.target.value)} ></input>
                        </div>
                        <hr></hr>
                        <div className="col-md-4">
                            <label >Dirección de fiador </label>
                            <input className="form-control form-control-sm" type="text" value={selectRow === null ? '' : selectRow.get('dir_fiador')} onChange={(e) => changeAttr(tipo, 'dir_fiador', e.target.value)} ></input>
                        </div>
                        <div className="col-md-4">
                            <label >Barrio </label>
                            <input className="form-control form-control-sm" type="text" value={selectRow === null ? '' : selectRow.get('barrio_fiador')} onChange={(e) => changeAttr(tipo, 'barrio_fiador', e.target.value)} ></input>
                        </div>
                        <div className="col-md-4">
                            <label >Telefono </label>
                            <input className="form-control form-control-sm" type="number" value={selectRow === null ? '' : selectRow.get('tel_fiador')} onChange={(e) => changeAttr(tipo, 'tel_fiador', e.target.value)} ></input>
                        </div>
                    </div>
                </Card>

                <div className="row">
                    <div className="col-md-6 col-xs-12">
                        <Card text="Referencias del titular" buttons={buttons} >
                            <div className="row col-md-12">
                                <table className="table table-sm">
                                    <thead>
                                        <tr>
                                            <th scope="col">Nombre</th>
                                            <th scope="col">Direccion</th>
                                            <th scope="col">Barrio</th>
                                            <th scope="col">Telefono</th>
                                            <th scope="col">Parentesco</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                            <td>@mdo1</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                            <td>@fat</td>
                                            <td>@fat1</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td>Larry</td>
                                            <td>Bird</td>
                                            <td>@twitter</td>
                                            <td>@twitter1</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </div>

                    <div className="col-md-6 col-xs-12">
                        <Card text="Referencias del fiador" buttons={buttons}>
                            <div className="row col-md-12">
                                <table className="table table-sm">
                                    <thead>
                                        <tr>
                                            <th scope="col">Nombre</th>
                                            <th scope="col">Direccion</th>
                                            <th scope="col">Barrio</th>
                                            <th scope="col">Telefono</th>
                                            <th scope="col">Parentesco</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                            <td>@mdo1</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                            <td>@fat</td>
                                            <td>@fat1</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td>Larry</td>
                                            <td>Bird</td>
                                            <td>@twitter</td>
                                            <td>@twitter1</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </div>
                </div>

                <div className="float-right">
                    <a className="btn btn-success btn-icon-split" href onClick={() => saveAction()}  >
                        <span className="icon text-white-50">
                            <i className="fas fa-save"></i>
                        </span>
                        <span className="text">
                            {edit ? "Actualizar" : "Guardar"}
                        </span>
                    </a>
                    <div className="my-3"></div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        selectRow: state.clientes.get('selectRow'),
        edit: state.clientes.get('edit'),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeAttr: (tipo, attr, value) => dispatch(changeAttr(tipo, attr, value)),
        saveAction: () => dispatch(saveAction()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddClientes)