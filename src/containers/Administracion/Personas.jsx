import React, { Component } from 'react';
import { connect } from 'react-redux'
import { tableColumnsUsuarios as tableColumns } from '../../utils/headersColumns'

//UI
import Card from '../../components/Common/Card'
import BoxButton from '../../components/Common/BoxButtonV1'
import TableVirtualized from '../../components/Common/TableVirtualized'

//DATA
import { getUsuarios, saveAction } from '../../actions/usuarios'
import { selectAction, changeAttr, newRow } from '../../actions/common'

class Personas extends Component {

    componentWillMount() {
        this.props.getUsuarios();
    }

    render() {
        const { list, ids, selected, selectRow, changeAttr, saveAction, newRow } = this.props;
        const tipo = "USUARIO";

        const buttons = [
            <BoxButton key="bp[0][0]" name="plus" onClick={() => newRow(tipo)} title="Agregar nuevo" classCSS="info" />,
            <BoxButton key="bp[0][1]" name="save" onClick={() => saveAction()} title="Guardar" classCSS="success" disabled={selectRow !== null ? false : true} />,
        ]

        return (
            <div className="row">
                <div className="col-md-12 col-xs-12">
                    <Card text="Administración de usuarios y personas" buttons={buttons} >
                        <div className="row" style={{ height: "calc(100vh - 255px)", maxHeight: "calc(100vh - 255px)" }}>
                            <div className="col-md-7">
                                <TableVirtualized
                                    tableColumns={tableColumns}
                                    ids={ids}
                                    list={list}
                                    keyVal="id"
                                    actionSelect={this.props.selectAction}
                                    selected={selected}
                                    tipo={tipo}
                                />
                            </div>
                            {
                                selectRow !== null ?
                                    <div className="col-md-5">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label >Nombres</label>
                                                <input className="form-control form-control-sm" type="text" value={selectRow.get('nombres')} onChange={(e) => changeAttr(tipo, 'nombres', e.target.value)} ></input>
                                            </div>
                                            <div className="col-md-6">
                                                <label >Apelldios</label>
                                                <input className="form-control form-control-sm" type="text" value={selectRow.get('apellidos')} onChange={(e) => changeAttr(tipo, 'apellidos', e.target.value)}></input>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label >Telefono 1</label>
                                                <input className="form-control form-control-sm" type="text" value={selectRow.get('telefono1')} onChange={(e) => changeAttr(tipo, 'telefono1', e.target.value)}></input>
                                            </div>
                                            <div className="col-md-6">
                                                <label >Telefono 2</label>
                                                <input className="form-control form-control-sm" type="text" value={selectRow.get('telefono2')} onChange={(e) => changeAttr(tipo, 'telefono2', e.target.value)}></input>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-auto my-1">
                                                <div className="custom-control custom-switch">
                                                    <input type="checkbox" className="custom-control-input" id="login" checked={selectRow.get('login')} onChange={(checked) => changeAttr(tipo, 'login', checked.target.checked)} />
                                                    <label className="custom-control-label" htmlFor="login">Es usuario de la aplicación?</label>
                                                </div>
                                            </div>
                                        </div>
                                        {
                                            selectRow.get('login') ?
                                                <div className="row">
                                                    <div className="col-md-8">
                                                        <label >Email</label>
                                                        <input className="form-control form-control-sm" type="text" value={selectRow.get('email')} onChange={(e) => changeAttr(tipo, 'email', e.target.value)}></input>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label >Nombre de usuario</label>
                                                        <input className="form-control form-control-sm" type="text" value={selectRow.get('username')} onChange={(e) => changeAttr(tipo, 'username', e.target.value)} ></input>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label >Contraseña</label>
                                                        <input className="form-control form-control-sm" type="password" value={selectRow.get('password')} onChange={(e) => changeAttr(tipo, 'password', e.target.value)} ></input>
                                                    </div>
                                                </div>
                                                : null
                                        }
                                    </div>
                                    : null
                            }

                        </div>
                    </Card>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        list: state.usuarios.get('list'),
        ids: state.usuarios.get('ids'),
        selected: state.usuarios.get('selected'),
        selectRow: state.usuarios.get('selectRow'),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getUsuarios: () => dispatch(getUsuarios()),
        selectAction: (id, reloadGrid, tipo) => dispatch(selectAction(id, reloadGrid, tipo)),
        newRow: (tipo) => dispatch(newRow(tipo)),
        saveAction: () => dispatch(saveAction()),
        changeAttr: (tipo, attr, value) => dispatch(changeAttr(tipo, attr, value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Personas)