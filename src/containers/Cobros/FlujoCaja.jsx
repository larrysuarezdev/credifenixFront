import React, { Component } from 'react';
import { connect } from 'react-redux'
import moment from 'moment'
import DataGrid from '../../components/Common/DataGrid'


//UI
import BoxButton from '../../components/Common/BoxButtonV2'
import BrandButton from '../../components/Common/BrandButton'
import TableVirtualized from '../../components/Common/TableVirtualized'
// import ModalClientes from '../../Cobros/Rutas/ModalClientes'

import { getFlujoCaja } from '../../actions/flujoCaja'
import { selectAction } from '../../actions/common'
import { tableColumnsFlujoCaja } from '../../utils/headersColumns'

class FlujoCaja extends Component {

    componentWillMount() {
        this.props.getFlujoCaja();
    }
    
    render() {
        const { ids, list, selected, selectAction } = this.props;

        console.log(list.toJS())

        var today = moment((new Date())).format('YYYY-MM-DD');

        const buttons = [
            <BoxButton key="bfc[0][0]" name="plus" onClick={() => null} title="Agregar nuevo" classCSS="info" />,
            <BoxButton key="bfc[0][1]" name="save" onClick={() => null} title="Guardar" classCSS="success" />,
        ]

        const tipo = "FLUJO_CAJA";

        return (
            <div className="card shadow border-left-success mb-4">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 className="m-0 font-weight-bold text-success">Flujo de caja</h6>
                </div>
                <BrandButton buttons={buttons} />
                <div style={{ height: 'calc(100vh - 250px)', marginTop: 2 }}>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="col-md-12">
                                <label htmlFor="fecha">Fecha</label>
                                <input className="form-control form-control-sm" id="fecha" type="date" max={today} />
                            </div>
                            <div className="col-md-12">
                                <label htmlFor="observaciones">Descripción</label>
                                <textarea className="form-control form-control-sm" id="Descripcion" rows="3"></textarea>
                            </div>
                            <div className="col-md-12">
                                <label htmlFor="tipo">Tipo</label>
                                <select className="form-control form-control-sm" id="tipo" >
                                    <option value="1">Entrada</option>
                                    <option value="2">Salida</option>
                                </select>
                            </div>
                            <div className="col-md-12">
                                <label htmlFor="valor">Valor</label>
                                <input className="form-control form-control-sm" type="number" id="valor" />
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
                                // actionClick={this.props.actionEditCliente}
                                actionDoubleClick={this.props.toggleModal}
                            />
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
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getFlujoCaja: () => dispatch(getFlujoCaja()),
        selectAction: (id, reloadGrid, tipo) => dispatch(selectAction(id, reloadGrid, tipo)),
        // changeAttr: (tipo, attr, value) => dispatch(changeAttr(tipo, attr, value)),
        // toggleModal: () => dispatch(toggleModal()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlujoCaja)