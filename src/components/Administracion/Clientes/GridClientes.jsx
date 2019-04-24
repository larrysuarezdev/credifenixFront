import React, { Component } from 'react';
import { connect } from 'react-redux'

// UI
import TableVirtualized from '../../Common/TableVirtualized'
import BoxButtonV2 from '../../Common/BoxButtonV2'
import BrandButton from '../../Common/BrandButton'

import { getClientes } from '../../../actions/clientes'
import { selectAction } from '../../../actions/common'
import { tableColumnsClientes } from '../../../utils/headersColumns'


class GridClientes extends Component {

    componentWillMount() {
        this.props.getClientes();
    }

    render() {
        const { ids, list, selected, actionNewRow, selectAction } = this.props;
        const tipo = "CLIENTE";

        const buttons = [
            <BoxButtonV2 key="bb[0][0]" name="plus" onClick={() => actionNewRow(tipo)} title="Agregar referencia" classCSS="info" />,
        ]

        return (
            <div>
                <BrandButton buttons={buttons} />
                <div className="" style={{ height : 'calc(100vh - 286px)'}}>
                    <TableVirtualized
                        tableColumns={tableColumnsClientes}
                        ids={ids}
                        list={list}
                        keyVal="id"
                        actionSelect={selectAction}
                        selected={selected}
                        tipo={tipo}
                        actionClick={this.props.actionEditCliente}
                    />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        list: state.clientes.get('list'),
        ids: state.clientes.get('ids'),
        selected: state.clientes.get('selected'),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getClientes: () => dispatch(getClientes()),
        selectAction: (id, reloadGrid, tipo) => dispatch(selectAction(id, reloadGrid, tipo)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GridClientes)