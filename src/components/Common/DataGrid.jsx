import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactDataGrid from 'react-data-grid';
import { Menu, Editors } from "react-data-grid-addons";

import { NegocioFormatter, DireccionFormatter, TelefonoClienteFormatter, FiadorFormatter, TelefonoFiadorFormatter, ValorUltimoPagoFormatter, FechaUltimoPagoFormatter, TotalFormatter, SaldoFormatter, CuotasFormatter, PrestamoFormatter } from "../../utils/formatterFunctions";

// console.log(this.props)
const { ContextMenu, MenuItem, ContextMenuTrigger } = Menu;

const CuotaFormatter = ({ row }) => {
    if (row.renovacion) {
        return (<div className="disabledCell">RN</div>)
    } else if (row.delete) {
        return (<div className="disabledCell">DEL</div>)
    }
    else
        return row.cuota;
};

const ClienteFormatter = ({ row }) => {
    return (
        <div data-toggle="tooltip" data-placement="left" title={row.cliente.titular} >
            {row.cliente.titular}
        </div>
    );
};

const MoraFormatter = ({ row }) => {
    var res = "";

    switch (true) {
        case row.mora >= 5 && row.mora <= 9:
            res = <div style={{ background: '#FBF462', textAlign: "center", color: "#fff" }}>{row.mora}</div>;
            break;
        case row.mora >= 10 && row.mora <= 19:
            res = <div style={{ background: '#F1775C', textAlign: "center", color: "#fff" }}>{row.mora}</div>;
            break;
        case row.mora >= 20:
            res = <div style={{ background: '#A25EEA', textAlign: "center", color: "#fff" }}>{row.mora}</div>;
            break;
        default:
            res = <div style={{ textAlign: "center" }}>{row.mora}</div>;
            break;
    }
    return res;
};

function ExampleContextMenu({
    idx,
    id,
    rowIdx,
    onRenovarCredito,
    onCambiarDias,
    onDetallesCredito,
    onRenovarCreditoInmediato,
    onCancelarRenovado,
    onEliminarCredito,
    user
}) {
    return (
        <ContextMenu id={id}>
            <MenuItem data={{ rowIdx, idx }} onClick={onCambiarDias}>
                Cambiar días
            </MenuItem>
            <MenuItem data={{ rowIdx, idx }} onClick={onRenovarCreditoInmediato}>
                Renovación inmediata
            </MenuItem>
            <MenuItem data={{ rowIdx, idx }} onClick={onRenovarCredito}>
                Renovación editable
            </MenuItem>
            <MenuItem data={{ rowIdx, idx }} onClick={onCancelarRenovado}>
                Cancelar renovación
            </MenuItem>
            <MenuItem data={{ rowIdx, idx }} onClick={onDetallesCredito}>
                Detalles del crédito
            </MenuItem>
            {
                user.rol == 1 ?
                    <MenuItem data={{ rowIdx, idx }} onClick={onEliminarCredito}>
                        Eliminar credito
                    </MenuItem>
                    : null
            }
        </ContextMenu>
    );
}

const columns = [
    { key: 'orden', name: 'Ord', editable: false, width: 45, frozen: true },
    { key: 'obs_dia', name: 'Día', editable: false, width: 70, frozen: true },
    { key: 'cliente', name: 'Cliente', editable: false, width: 250, frozen: true, formatter: ClienteFormatter },
    { key: 'cuota', name: 'Cuota', editable: true, width: 60, frozen: true, formatter: CuotaFormatter },
    { key: 'mora', name: 'Mora', editable: false, width: 50, frozen: true, formatter: MoraFormatter },
    { key: 'cuotas_pagas', name: 'PAG', editable: false, width: 50, frozen: false },
    { key: 'valor_prestamo', name: 'Prestamo', editable: false, width: 100, frozen: false, formatter: PrestamoFormatter },
    { key: 'mod_cuota', name: 'Cuota', editable: false, width: 80, frozen: false, formatter: CuotasFormatter },
    { key: 'mod_dias', name: 'Días', editable: false, width: 50, frozen: false },
    { key: 'saldo', name: 'Saldo', editable: false, width: 100, frozen: false, formatter: SaldoFormatter },
    { key: 'valor_total', name: 'Total', editable: false, width: 100, frozen: false, formatter: TotalFormatter },
    { key: 'valor_ultimo_pago', name: 'Valor ult pag', editable: false, width: 110, frozen: false, formatter: ValorUltimoPagoFormatter },
    { key: 'fecha_ultimo_pago', name: 'Fecha ult pag', editable: false, width: 110, frozen: false, formatter: FechaUltimoPagoFormatter },
    { key: 'inicio_credito', name: 'Inicio', editable: false, width: 110, frozen: false },
    { key: 'neg_titular', name: 'Negocio', editable: false, width: 200, frozen: false, formatter: NegocioFormatter },
    { key: 'dir_titular', name: 'Dirección', editable: false, width: 200, frozen: false, formatter: DireccionFormatter },
    { key: 'telefono', name: 'Telefono', editable: false, width: 200, frozen: false, formatter: TelefonoClienteFormatter },
    { key: 'fiador', name: 'Fiador', editable: false, width: 300, frozen: false, formatter: FiadorFormatter },
    { key: 'tel_fiador', name: 'Telefono', editable: false, width: 200, frozen: false, formatter: TelefonoFiadorFormatter },
];


class DataGrid extends Component {

    // static defaultProps = { rowKey: "id" };

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

    onCambiarDias(rowIdx) {
        const id = this.props.ids.get(rowIdx);
        this.props.actionClickDias(id)
    }

    onRenovarCreditoInmediato(rowIdx) {
        const id = this.props.ids.get(rowIdx);
        this.props.actionClickRenovadosInmediatos(id)
    }

    onCancelarRenovado(rowIdx) {
        const id = this.props.ids.get(rowIdx);
        this.props.actionClickCancelarRenovado(id)
    }

    onEliminarCredito(rowIdx) {
        const id = this.props.ids.get(rowIdx);
        this.props.actionClickEliminarCredito(id)
    }


    onDetallesCredito(rowIdx) {
        const id = this.props.ids.get(rowIdx);
        this.props.actionClick(id)
    }

    render() {
        const { height, user, obs_dias } = this.props;
        const data = this.props.rows.toList().toJS().sort(function (a, b) { return a.orden - b.orden });

        // if (obs_dias) {
        //     const issueTypes = [];
        //     obs_dias.map((x) => {
        //         issueTypes.push({ id: x.get("value"), value: x.get("value") })
        //     })
        //     const { DropDownEditor } = Editors;
        //     // const IssueTypeEditor = <DropDownEditor options={issueTypes} />;
        //     console.log(issueTypes);
        //     columns[1].editor = <DropDownEditor options={issueTypes} />;
        //     columns[1].name = "Hola";
        // }

        return (
            <ReactDataGrid
                columns={columns}
                rowGetter={(i) => data[i]}
                rowsCount={this.props.rows.toList().toJS().length}
                onGridRowsUpdated={this.onGridRowsUpdated}
                enableCellSelect={true}
                rowHeight={25}
                minHeight={height}
                CellNavigationMode={"NONE"}
                contextMenu={
                    <ExampleContextMenu
                        onRenovarCredito={(e, { rowIdx }) => this.onRenovarCredito(rowIdx)}
                        onCambiarDias={(e, { rowIdx }) => this.onCambiarDias(rowIdx)}                        
                        onDetallesCredito={(e, { rowIdx }) => this.onDetallesCredito(rowIdx)}
                        onRenovarCreditoInmediato={(e, { rowIdx }) => this.onRenovarCreditoInmediato(rowIdx)}
                        onCancelarRenovado={(e, { rowIdx }) => this.onCancelarRenovado(rowIdx)}
                        onEliminarCredito={(e, { rowIdx }) => this.onEliminarCredito(rowIdx)}
                        user={user}
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