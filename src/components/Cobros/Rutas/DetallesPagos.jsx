import React, { Component } from 'react';
import { connect } from 'react-redux'

//UI
import TableVirtualized from '../../Common/TableVirtualized'
import BrandButton from '../../Common/BrandButton'
import BoxButton from '../../Common/BoxButtonV2'

import { getDetallesRuta } from '../../../actions/rutas'
import { selectAction } from '../../../actions/common'
import { tableColumnsDetallesAbonos } from '../../../utils/headersColumns'
import { exportAbonos } from '../../../utils/helpers'


class DetallesPagos extends Component {

    componentDidMount() {
        this.props.getDetallesRuta();
    }

    render() {
        const { list, selected, selectAction } = this.props;
        const ids = list.sortBy(x => x.get('id')).keySeq().toList();
        const tipo = "DETALLE_RUTA";

        const buttons = [
            <BoxButton key="br[1][0]" name="file-pdf" onClick={() => exportAbonos(list)} title="Exportar ruta" classCSS="info" />,
        ]

        return (
            <div style={{ height: 'calc(100vh - 370px)', marginTop: 2 }}>
                <BrandButton buttons={buttons} />
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetallesPagos)