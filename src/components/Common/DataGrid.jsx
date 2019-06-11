import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactDataGrid from 'react-data-grid';
import FontAwesome from 'react-fontawesome'

import { ClienteFormatter, NegocioFormatter, DireccionFormatter, TelefonoClienteFormatter, FiadorFormatter, TelefonoFiadorFormatter } from "../../utils/formatterFunctions";
// import { isNumber } from 'util';
// import numeral from 'numeral'
// import moment from 'moment'
let action = function(){};

const columns = [
    {
        key: 'detalles', name: '', editable: false, width: 30, frozen: true,
        events: {
            onClick: function (ev, args) {
                action(String(args.rowId));
            }
        }
    },
    { key: 'orden', name: 'Orden', editable: false, width: 60, frozen: true },
    { key: 'cliente', name: 'Cliente', editable: false, width: 200, frozen: true, formatter: ClienteFormatter },
    { key: 'cuota', name: 'Cuota', editable: true, width: 60, frozen: true, filterable: false },
    { key: 'mora', name: 'Mora', editable: false, width: 50, frozen: true },
    { key: 'cuotas_pagas', name: 'PAG', editable: false, width: 50, frozen: false },
    { key: 'valor_prestamo', name: 'Prestamo', editable: false, width: 100, frozen: false },
    { key: 'mod_cuota', name: 'Cuota', editable: false, width: 80, frozen: false },
    { key: 'mod_dias', name: 'Días', editable: false, width: 100, frozen: false },
    { key: 'saldo', name: 'Saldo', editable: false, width: 100, frozen: false },
    { key: 'valor_ultimo_pago', name: 'Último pago', editable: false, width: 100, frozen: false },
    { key: 'fecha_ultimo_pago', name: 'Fecha ult pago', editable: false, width: 120, frozen: false },
    { key: 'inicio_credito', name: 'Inicio', editable: false, width: 120, frozen: false },
    { key: 'neg_titular', name: 'Negocio', editable: false, width: 200, frozen: false, formatter: NegocioFormatter },
    { key: 'dir_titular', name: 'Dirección', editable: false, width: 200, frozen: false, formatter: DireccionFormatter },
    { key: 'telefono', name: 'Telefono', editable: false, width: 200, frozen: false, formatter: TelefonoClienteFormatter },
    { key: 'fiador', name: 'Fiador', editable: false, width: 200, frozen: false, formatter: FiadorFormatter },
    { key: 'tel_fiador', name: 'Telefono', editable: false, width: 200, frozen: false, formatter: TelefonoFiadorFormatter },
];

const detailActions = [
    {
        icon: <div style={{ textAlign: 'center', fontSize: '1em', paddingLeft : 5 }}><FontAwesome name="eye" /></div>,
        callback : () =>{
            
        }
    },
];

function getCellActions(column, row) {
    const cellActions = {
        detalles: detailActions
    };

    return cellActions[column.key];
}

class DataGrid extends Component {

    static defaultProps = { rowKey: "id" };

    constructor(props) {
        super(props);
    }

    onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
        const id = this.props.ids.get(toRow);
        const column = Object.keys(updated)[0];
        console.log(id, column, updated[column])
        this.props.changeAction('RUTA', id, column, updated[column])
    };

    render() {
        // const { ids, tableColumns } = this.props;
        const data = this.props.rows.toList().toJS().sort(function (a, b) { return a.orden - b.orden })
        action = this.props.actionClick;

        return (
            <ReactDataGrid
                columns={columns}
                rowGetter={(i) => data[i]}
                rowsCount={this.props.rows.toList().toJS().length}
                // cellRenderer={(i) => console.log(i)}
                onGridRowsUpdated={this.onGridRowsUpdated}
                enableCellSelect={true}
                rowHeight={25}
                getCellActions={getCellActions}
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