import React, { Component } from 'react';
import { connect } from 'react-redux'
import moment from 'moment'

//UI
import SelectorInput from '../../Common/SelectorInput'
import ModalClientes from '../../Cobros/Rutas/ModalClientes'

import { changeAttr, toggleModalClientes } from '../../../actions/common'

class AddCredito extends Component {



    render() {
        const { selectRow, changeAttr, periodos } = this.props;
        const tipo = "RUTA"

        return (
            <div className="row">
                <div className="col-md-5">
                    <label >Cliente</label>
                    <SelectorInput
                        value={selectRow.getIn(['cliente', 'titular'])}
                        onClick={() => this.props.toggleModalClientes()} />
                    {/* <input className="form-control form-control-sm" type="text" value={ selectRow.get('cliente') } ></input> */}
                </div>
                <div className="col-md-3">
                    <a className="btn btn-sm btn-success btn-icon-split padding-bottom" href="#" onClick={() => this.props.action()} style={{ marginTop: 27 }} >
                        <span className="icon text-white-50">
                            <i className="fas fa-male"></i>
                        </span>
                        <span className="text">
                            Cliente nuevo
                        </span>
                    </a>
                </div>
                <div className="col-md-4">
                    <label >Días</label>
                    <select className="form-control form-control-sm" id="obs_dia" onChange={(e) => changeAttr(tipo, 'obs_dia', e.target.value)} >
                            <option value="" key={0}>Seleccione..</option>
                            {
                                this.props.obs_dias.map((x, i) => {
                                    return (
                                        <option value={x.get("value")} key={i}>{x.get("value")}</option>
                                    )
                                })
                            }
                        </select>
                    {/* <input className="form-control form-control-sm" type="date" value={selectRow !== null ? moment(selectRow.get('fecha')).format('YYYY-MM-DD') : ''} onChange={(e) => changeAttr(tipo, 'fecha', e.target.value)} /> */}
                </div>
                <div className="col-md-4">
                    <label >Fecha del crédito</label>
                    <input className="form-control form-control-sm" type="date" value={selectRow !== null ? moment(selectRow.get('fecha')).format('YYYY-MM-DD') : ''} onChange={(e) => changeAttr(tipo, 'fecha', e.target.value)} />
                </div>
                <div className="col-md-4">
                    <label >Valor a prestar</label>
                    <input className="form-control form-control-sm" type="number" value={selectRow.get('prestamo')} onChange={(e) => changeAttr(tipo, 'prestamo', e.target.value)} />
                </div>
                <div className="col-md-4">
                    <label >Modalidad</label>
                    <select className="form-control form-control-sm" value={selectRow.get('modalidad')} onChange={(e) => changeAttr(tipo, 'modalidad', e.target.value)} >
                        {
                            periodos.map((x) => {
                                return (
                                    <option value={x.get("value")} key={x.get("label")}>{ x.get("label") }</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className="col-md-4">
                    <label >Cuota</label>
                    <input className="form-control form-control-sm" type="number" value={selectRow.get('cuota')} onChange={(e) => changeAttr(tipo, 'cuota', e.target.value)} />
                </div>
                <div className="col-md-4">
                    <label >Dias</label>
                    <input className="form-control form-control-sm" type="number" value={selectRow.get('dias')} onChange={(e) => changeAttr(tipo, 'dias', e.target.value)} />
                </div>
                <div className="col-md-4">
                    <label >Valor total</label>
                    <input className="form-control form-control-sm" type="number" value={(selectRow.get('cuota') * selectRow.get('dias')) * 1000} readOnly disabled ></input>
                </div>
                <div className="col-md-12">
                    <label >Observaciones</label>
                    <textarea className="form-control form-control-sm" id="observaciones" rows="3" value={selectRow.get('observaciones')} onChange={(e) => changeAttr(tipo, 'observaciones', e.target.value)}></textarea>
                </div>
                <ModalClientes />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        selectRow: state.rutas.get('selectRow'),
        periodos: state.rutas.get('periodos'),
        // ids: state.rutas.get('ids'),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        // getRutas: () => dispatch(getRutas()),
        // selectAction: (id, reloadGrid, tipo) => dispatch(selectAction(id, reloadGrid, tipo)),
        changeAttr: (tipo, attr, value) => dispatch(changeAttr(tipo, attr, value)),
        toggleModalClientes: () => dispatch(toggleModalClientes()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCredito)