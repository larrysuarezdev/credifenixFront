import React, { Component } from 'react';
import { connect } from 'react-redux'

//UI
import TableVirtualized from '../../Common/TableVirtualized'

import { getDetallesRenovaciones } from '../../../actions/rutas'
import { selectAction } from '../../../actions/common'
import { tableColumnsDetallesRenovaciones } from '../../../utils/headersColumns'

class DetalleRenovaciones extends Component {

    componentDidMount() {
        this.props.getDetallesRenovaciones();
    }

    render() {
        const { list, selected, selectAction } = this.props;
        const ids = list.sortBy(x => x.get('id')).keySeq().toList();
        const tipo = "DETALLE_RENOVACION";
        
        return (
            <div style={{ height : 'calc(100vh - 370px)', marginTop: 2 }}>
                <TableVirtualized
                    tableColumns={tableColumnsDetallesRenovaciones}
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
        list: state.rutas.get('renovaciones'),
        selected: state.rutas.get('renovacion_selected'),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getDetallesRenovaciones: () => dispatch(getDetallesRenovaciones()),
        selectAction: (id, reloadGrid, tipo) => dispatch(selectAction(id, reloadGrid, tipo)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetalleRenovaciones)