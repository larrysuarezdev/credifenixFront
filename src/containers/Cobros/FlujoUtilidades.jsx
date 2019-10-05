import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import moment from 'moment'
import numeral from 'numeral'

//UI
import BoxButton from '../../components/Common/BoxButtonV2'
import BrandButton from '../../components/Common/BrandButton'
import ReactDataGridFilter from '../../components/Cobros/ReactDataGridFilter'

import { getFlujoUtilidades, saveAction } from '../../actions/flujoUtilidades'
import { selectAction, changeAttr, newRow } from '../../actions/common'

class FlujoUtilidades extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gridHeight: 330,
        }
    }

    componentWillMount() {
        this.props.getFlujoUtilidades();
    }

    componentDidMount() {
        var node = ReactDOM.findDOMNode(this.refs["dataExport"]);
        var gridHeight = node.clientHeight;
        this.setState({ gridHeight: gridHeight - 48 });
    }

    render() {
        const { ids, list, selectRow, changeAttr, total } = this.props;
        var today = moment((new Date())).format('YYYY-MM-DD');

        const buttons = [
            <BoxButton key="bfc[0][0]" name="plus" onClick={() => this.props.newRow(tipo)} title="Agregar nuevo" classCSS="info" />,
            <BoxButton key="bfc[0][1]" name="save" onClick={() => this.props.saveAction()} title="Guardar" classCSS="success" />,
        ]

        const tipo = "FLUJO_UTILIDADES";

        return (
            <div>
                <div className="card shadow border-left-success mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-success">Flujo de utilidades</h6>
                    </div>
                    <BrandButton buttons={buttons} />
                    <div style={{ height: 'calc(100vh - 248px)', maxHeight: 'calc(100vh - 248px)' }} ref="dataExport">
                        <div className="row col-md-12" >
                            <div className="col-md-4" style={{ padding: 0 }}>
                                <div className="col-md-12  card-header py-3 d-flex float-right">
                                    Utilidad neta: <h5 className="m-1 font-weight-bold text-success">
                                        {numeral(total).format()}
                                    </h5>
                                </div>
                                <div className={`${selectRow !== null ? "" : "disabledDiv"} `}>
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
                            </div>

                            <div className="col-md-8" style={{ paddingLeft: 25 }} >
                                {
                                    list.size != 0 ?
                                        <ReactDataGridFilter
                                            rows={list}
                                            height={this.state.gridHeight}
                                            ids={ids}
                                        /> : null
                                }
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
        list: state.flujoUtilidades.get('list'),
        selected: state.flujoUtilidades.get('selected'),
        ids: state.flujoUtilidades.get('ids'),
        selectRow: state.flujoUtilidades.get('selectRow'),
        total: state.flujoUtilidades.get('total'),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getFlujoUtilidades: () => dispatch(getFlujoUtilidades()),
        saveAction: () => dispatch(saveAction()),
        selectAction: (id, reloadGrid, tipo) => dispatch(selectAction(id, reloadGrid, tipo)),
        changeAttr: (tipo, attr, value) => dispatch(changeAttr(tipo, attr, value)),
        newRow: (tipo) => dispatch(newRow(tipo)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlujoUtilidades)