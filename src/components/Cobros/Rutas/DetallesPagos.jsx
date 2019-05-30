import React, { Component } from 'react';
import { connect } from 'react-redux'

//UI
import TableVirtualized from '../../Common/TableVirtualized'
// import ModalClientes from '../../Cobros/Rutas/ModalClientes'

import { getDetallesRuta } from '../../../actions/rutas'
import { selectAction } from '../../../actions/common'
import { tableColumnsDetallesAbonos } from '../../../utils/headersColumns'

class DetallesPagos extends Component {

    componentDidMount() {
        this.props.getDetallesRuta();
    }

    render() {
        const { list, selected, selectAction } = this.props;
        const ids = list.sortBy(x => x.get('id')).keySeq().toList();
        const tipo = "DETALLE_RUTA";
        
        return (
            <div style={{ height : 'calc(100vh - 370px)', marginTop: 2 }}>
                <TableVirtualized
                    tableColumns={tableColumnsDetallesAbonos}
                    ids={ids}
                    list={list}
                    keyVal="id"
                    actionSelect={selectAction}
                    selected={selected}
                    tipo={tipo}
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        list: state.rutas.get('detalles'),
        selected: state.rutas.get('detalle_selected'),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getDetallesRuta: () => dispatch(getDetallesRuta()),
        selectAction: (id, reloadGrid, tipo) => dispatch(selectAction(id, reloadGrid, tipo)),
        // changeAttr: (tipo, attr, value) => dispatch(changeAttr(tipo, attr, value)),
        // toggleModal: () => dispatch(toggleModal()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetallesPagos)