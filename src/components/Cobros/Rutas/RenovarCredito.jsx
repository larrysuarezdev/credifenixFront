import React, { Component } from 'react';
import { connect } from 'react-redux'

import { cleanRenovacion } from '../../../actions/rutas'
import { changeAttr } from '../../../actions/common'

class RenovarCredito extends Component {

    componentWillMount() {
        this.props.cleanRenovacion();
    }

    render() {

        const { changeAttr, selectRow, periodos } = this.props;
        
        const tipo = "RENOVACION"
        return (
            <div style={{ height: 'calc(100vh - 450px)', marginTop: 2 }}>
                <div className="row">
                    <div className="col-md-12">
                        <label htmlFor="observaciones">Observaciones</label>
                        <textarea className="form-control" id="observaciones" rows="3"  value={selectRow !== null ? selectRow.get('observaciones') : ''} onChange={(e) => changeAttr(tipo, 'observaciones', e.target.value)}></textarea>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="monto">Monto dado</label>
                        <input className="form-control form-control-sm" type="number" id="monto"  value={selectRow !== null ? selectRow.get('monto') : ''} onChange={(e) => changeAttr(tipo, 'monto', e.target.value)} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="modalidad">Monto dado</label>
                        <select className="form-control form-control-sm" id="modalidad"  value={selectRow !== null ? selectRow.get('modalidad') : ''} onChange={(e) => changeAttr(tipo, 'modalidad', e.target.value)} >
                        {
                            periodos.map((x) => {
                                return (
                                    <option value={x.get("value")}>{ x.get("label") }</option>
                                )
                            })
                        }
                    </select>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        selectRow: state.rutas.get('renovacion'),
        periodos: state.rutas.get('periodos'),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeAttr: (tipo, attr, value) => dispatch(changeAttr(tipo, attr, value)),
        cleanRenovacion: () => dispatch(cleanRenovacion()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RenovarCredito)