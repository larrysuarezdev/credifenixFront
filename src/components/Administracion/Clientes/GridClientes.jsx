import React, { Component } from 'react';
import { connect } from 'react-redux'

// UI
import TableVirtualized from '../../Common/TableVirtualized'
import BoxButtonV2 from '../../Common/BoxButtonV2'
import BrandButton from '../../Common/BrandButton'
import Modal from '../../Common/Modal'
import ModalFilterMaestras from '../../Common/ModalFilterMaestras'

import { getClientes } from '../../../actions/clientes'
import { selectAction, toggleModal } from '../../../actions/common'
import { tableColumnsClientes } from '../../../utils/headersColumns'
import { showHideModalFilter } from "../../../actions/filtrarData";

class GridClientes extends Component {

    componentWillMount() {
        this.props.getClientes();
    }

    render() {
        const { ids, list, selected, actionNewRow, selectAction, historial } = this.props;
        const tipo = "CLIENTE";

        const buttons = [
            <BoxButtonV2 key="bb[0][0]" name="plus" onClick={() => actionNewRow(tipo)} title="Agregar referencia" classCSS="info" />,
            <BoxButtonV2 key="bb[0][1]" name="filter" onClick={() => this.props.showHideModalFilter(true, tableColumnsClientes, 'clientes')} title="Filtrar información" classCSS="info" />,
        ]

        return (
            <div>
                <BrandButton buttons={buttons} />
                <div className="" style={{ height: 'calc(100vh - 286px)' }}>
                    <TableVirtualized
                        tableColumns={tableColumnsClientes}
                        ids={ids}
                        list={list}
                        keyVal="id"
                        actionSelect={selectAction}
                        selected={selected}
                        tipo={tipo}
                        actionClick={this.props.actionEditCliente}
                        actionClick1={this.props.actionEstadoCliente}
                        actionDoubleClick={this.props.toggleModal}
                    />
                </div>
                <Modal title={"Historial de creditos"} brand={false} >
                    <table className="table table-bordered table-striped table-sm">
                        <thead>
                            <tr>
                                <th scope="col">Id interno</th>
                                <th scope="col">Prestamo</th>
                                <th scope="col">Cuota</th>
                                <th scope="col">Dias</th>
                                <th scope="col">Total a pagar</th>
                                <th scope="col">Ruta</th>
                                <th scope="col">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                historial !== undefined ? historial.toList().map((x) => {
                                    return (
                                        <tr key={x.get('id')}>
                                            <th scope="row">{x.get('id')}</th>
                                            <td>{x.get('valor_prestamo')}</td>
                                            <td>{x.get('mod_cuota')}</td>
                                            <td>{x.get('mod_dias')}</td>
                                            <td>{x.get('mod_cuota') * x.get('mod_dias')}</td>
                                            <td>{x.get('ruta_id')}</td>
                                            <td align="center">
                                                {
                                                    x.get('activo') ? <span className="badge badge-success">Activo</span> :
                                                        <span className="badge badge-danger">Inactivo</span>
                                                }
                                            </td>
                                        </tr>
                                    )
                                }) : null
                            }
                        </tbody>
                    </table>
                </Modal>
                <ModalFilterMaestras />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        list: state.clientes.get('list'),
        ids: state.clientes.get('ids'),
        selected: state.clientes.get('selected'),
        historial: state.clientes.getIn(['list', String(state.clientes.get('selected')), 'creditos']),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getClientes: () => dispatch(getClientes()),
        toggleModal: () => dispatch(toggleModal()),
        selectAction: (id, reloadGrid, tipo) => dispatch(selectAction(id, reloadGrid, tipo)),
        showHideModalFilter: (state, columnas, mode) => dispatch(showHideModalFilter(state, columnas, mode)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GridClientes)