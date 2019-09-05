import React, { Component } from 'react';
import { connect } from 'react-redux'
import moment from 'moment'
import numeral from 'numeral'


//UI
import BoxButton from '../../components/Common/BoxButtonV2'
import BrandButton from '../../components/Common/BrandButton'
import TableVirtualized from '../../components/Common/TableVirtualized'
// import ModalClientes from '../../Cobros/Rutas/ModalClientes'

import { getFlujoCaja, saveAction } from '../../actions/flujoCaja'
import { selectAction, changeAttr, newRow } from '../../actions/common'
import { tableColumnsFlujoCaja } from '../../utils/headersColumns'

class FlujoCaja extends Component {

    componentWillMount() {
        this.props.getFlujoCaja();
    }

    render() {
        const { ids, list, selected, selectAction, selectRow, changeAttr, total } = this.props;
        var today = moment((new Date())).format('YYYY-MM-DD');

        const buttons = [
            <BoxButton key="bfc[0][0]" name="plus" onClick={() => this.props.newRow(tipo)} title="Agregar nuevo" classCSS="info" />,
            <BoxButton key="bfc[0][1]" name="save" onClick={() => this.props.saveAction()} title="Guardar" classCSS="success" />,
        ]

        const tipo = "FLUJO_CAJA";

        return (
            <div>
                <div className="card shadow border-left-success mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-success">Flujo de caja</h6>
                    </div>
                    <BrandButton buttons={buttons} />
                    <div className="card-header py-3 d-flex float-right">
                        Total en caja: <h5 className="m-1 font-weight-bold text-success">
                            {numeral(total).format()}
                        </h5>
                    </div>
                    <div style={{ height: 'calc(100vh - 313px)' }}>
                        <div className="row" style={{ height: 'calc(100vh - 313px)' }}>
                            <div className={`col-md-4 ${selectRow !== null ? "" : "disabledDiv"} `}>
                                <div className="col-md-12">
                                    <label htmlFor="fecha">Fecha</label>
                                    <input className="form-control form-control-sm" id="fecha" type="date" max={today} value={selectRow !== null ? moment(selectRow.get('fecha')).format('YYYY-MM-DD') : ''} onChange={(e) => changeAttr(tipo, 'fecha', e.target.value)} />
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor="observaciones">Descripción</label>
                                    <textarea className="form-control form-control-sm" id="descripcion" rows="3" value={selectRow !== null ? selectRow.get('descripcion') : ''} onChange={(e) => changeAttr(tipo, 'descripcion', e.target.value)}></textarea>
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor="tipo">Tipo</label>
                                    <select className="form-control form-control-sm" id="tipo" value={selectRow !== null ? selectRow.get('tipo') : ''} onChange={(e) => changeAttr(tipo, 'tipo', e.target.value)} >
                                        <option value="1">Entrada</option>
                                        <option value="2">Salida</option>
                                    </select>
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor="valor">Valor</label>
                                    <input className="form-control form-control-sm" type="number" id="valor" value={selectRow !== null ? selectRow.get('valor') : ''} onChange={(e) => changeAttr(tipo, 'valor', e.target.value)} />
                                </div>
                            </div>
                            <div className="col-md-8">
                                <TableVirtualized
                                    tableColumns={tableColumnsFlujoCaja}
                                    ids={ids}
                                    list={list}
                                    keyVal="id"
                                    actionSelect={selectAction}
                                    selected={selected}
                                    tipo={tipo}
                                    actionDoubleClick={this.props.toggleModal}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        list: state.flujoCaja.get('list'),
        selected: state.flujoCaja.get('selected'),
        ids: state.flujoCaja.get('ids'),
        selectRow: state.flujoCaja.get('selectRow'),
        total: state.flujoCaja.get('total'),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getFlujoCaja: () => dispatch(getFlujoCaja()),
        saveAction: () => dispatch(saveAction()),
        selectAction: (id, reloadGrid, tipo) => dispatch(selectAction(id, reloadGrid, tipo)),
        changeAttr: (tipo, attr, value) => dispatch(changeAttr(tipo, attr, value)),
        newRow: (tipo) => dispatch(newRow(tipo)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlujoCaja)