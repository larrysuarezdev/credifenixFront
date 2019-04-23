import React, { Component } from 'react';
import { connect } from 'react-redux'

// UI
import TableVirtualized from '../../Common/TableVirtualized'

export const tableColumns = [
    { ID: 0, CAPTION: '', VALUE: '', TYPE: '', FORMAT: '', WIDTH: 30, FIXED: true },
    { ID: 1, CAPTION: 'Nombre', VALUE: 'Nombre', TYPE: 'VARCHAR2', FORMAT: '', WIDTH: 300, FIXED: true },
    { ID: 2, CAPTION: 'Descripción', VALUE: 'Descripcion', TYPE: 'VARCHAR2', FORMAT: '', WIDTH: 350, FIXED: false },
    { ID: 3, CAPTION: 'Estado', VALUE: 'Estado_Visible', TYPE: 'BOOLEAN', FORMAT: '', WIDTH: 150, FIXED: false },
]

class GridClientes extends Component {
    render() {
        const { ids, clientes, selected } = this.props;
        return (
            <div>
                {/* <TableVirtualized
                    tableColumns={tableColumns}
                    ids={ids}
                    list={clientes}
                    keyVal="id_cliente"
                    actionSelect={this.props.selectEmpresa}
                    selected={selected}
                /> */}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GridClientes)