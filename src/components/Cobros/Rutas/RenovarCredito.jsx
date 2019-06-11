import React, { Component } from 'react';
import { connect } from 'react-redux'

//UI
// import TableVirtualized from '../../Common/TableVirtualized'
// import ModalClientes from '../../Cobros/Rutas/ModalClientes'

// import { getDetallesRuta } from '../../../actions/rutas'
// import { selectAction } from '../../../actions/common'
// import { tableColumnsDetallesAbonos } from '../../../utils/headersColumns'

class RenovarCredito extends Component {

    render() {
        return (
            <div style={{ height: 'calc(100vh - 370px)', marginTop: 2 }}>
                <div className="row">
                    <div className="col-md-12">
                        <label htmlFor="observaciones">Observaciones</label>
                        <textarea className="form-control" id="observaciones" rows="3"></textarea>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="observaciones">Monto dado</label>
                        <input className="form-control form-control-sm" type="number"  />
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        // list: state.rutas.get('detalles'),
        // selected: state.rutas.get('detalle_selected'),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        // getDetallesRuta: () => dispatch(getDetallesRuta()),
        // selectAction: (id, reloadGrid, tipo) => dispatch(selectAction(id, reloadGrid, tipo)),
        // changeAttr: (tipo, attr, value) => dispatch(changeAttr(tipo, attr, value)),
        // toggleModal: () => dispatch(toggleModal()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RenovarCredito)