import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactDataGrid from 'react-data-grid';
import { Menu } from "react-data-grid-addons";

import { ClienteFormatter, NegocioFormatter, DireccionFormatter, TelefonoClienteFormatter, FiadorFormatter, TelefonoFiadorFormatter, ValorUltimoPagoFormatter, FechaUltimoPagoFormatter } from "../../utils/formatterFunctions";

const { ContextMenu, MenuItem, ContextMenuTrigger } = Menu;

const CuotaFormatter = ({ row }) => {
    if (row.renovacion) {
        return (<div className="disabledCell">RN</div>)
    }
    else
        return row.cuota;
};

function ExampleContextMenu({
    idx,
    id,
    rowIdx,
    onRenovarCredito,
    onDetallesCredito
}) {
    return (
        <ContextMenu id={id}>
            <MenuItem data={{ rowIdx, idx }} onClick={onRenovarCredito}>
                Ronovar credito
            </MenuItem>
            <MenuItem data={{ rowIdx, idx }} onClick={onDetallesCredito}>
                Detalles
            </MenuItem>
        </ContextMenu>
    );
}

const columns = [
    { key: 'orden', name: 'Orden', editable: false, width: 60, frozen: true },
    { key: 'cliente', name: 'Cliente', editable: false, width: 200, frozen: true, formatter: ClienteFormatter },
    { key: 'cuota', name: 'Cuota', editable: true, width: 60, frozen: true, formatter: CuotaFormatter },
    { key: 'mora', name: 'Mora', editable: false, width: 50, frozen: true },
    { key: 'cuotas_pagas', name: 'PAG', editable: false, width: 50, frozen: false },
    { key: 'valor_prestamo', name: 'Prestamo', editable: false, width: 100, frozen: false },
    { key: 'mod_cuota', name: 'Cuota', editable: false, width: 80, frozen: false },
    { key: 'mod_dias', name: 'Días', editable: false, width: 50, frozen: false },
    { key: 'saldo', name: 'Saldo', editable: false, width: 100, frozen: false },
    { key: 'valor_total', name: 'Total', editable: false, width: 100, frozen: false },
    { key: 'valor_ultimo_pago', name: 'Valor ult pag', editable: false, width: 110, frozen: false, formatter: ValorUltimoPagoFormatter },
    { key: 'fecha_ultimo_pago', name: 'Fecha ult pag', editable: false, width: 110, frozen: false, formatter: FechaUltimoPagoFormatter  },
    { key: 'inicio_credito', name: 'Inicio', editable: false, width: 120, frozen: false },
    { key: 'neg_titular', name: 'Negocio', editable: false, width: 200, frozen: false, formatter: NegocioFormatter },
    { key: 'dir_titular', name: 'Dirección', editable: false, width: 200, frozen: false, formatter: DireccionFormatter },
    { key: 'telefono', name: 'Telefono', editable: false, width: 200, frozen: false, formatter: TelefonoClienteFormatter },
    { key: 'fiador', name: 'Fiador', editable: false, width: 200, frozen: false, formatter: FiadorFormatter },
    { key: 'tel_fiador', name: 'Telefono', editable: false, width: 200, frozen: false, formatter: TelefonoFiadorFormatter },
];


class DataGrid extends Component {

    static defaultProps = { rowKey: "id" };

    constructor(props) {
        super(props);
    }

    onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
        const id = this.props.ids.get(toRow);
        const column = Object.keys(updated)[0];
        this.props.changeAction('RUTA', id, column, updated[column])
    };

    onRenovarCredito(rowIdx) {
        const id = this.props.ids.get(rowIdx);
        this.props.actionClickRenovados(id)
    }

    onDetallesCredito(rowIdx) {
        const id = this.props.ids.get(rowIdx);
        this.props.actionClick(id)
    }

    render() {
        const { height } = this.props;
        const data = this.props.rows.toList().toJS().sort(function (a, b) { return a.orden - b.orden });
        
        return (
            <ReactDataGrid
                columns={columns}
                rowGetter={(i) => data[i]}
                rowsCount={this.props.rows.toList().toJS().length}
                onGridRowsUpdated={this.onGridRowsUpdated}
                enableCellSelect={true}
                rowHeight={25}
                minHeight={height}
                contextMenu={
                    <ExampleContextMenu
                        onRenovarCredito={(e, { rowIdx }) => this.onRenovarCredito(rowIdx)}
                        onDetallesCredito={(e, { rowIdx }) => this.onDetallesCredito(rowIdx)}
                    />
                }
                RowsContainer={ContextMenuTrigger}
            />
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
export default connect(mapStateToProps, mapDispatchToProps)(DataGrid)