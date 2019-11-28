import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactDataGrid from "react-data-grid";
import { reorderList, reorderData } from '../../../actions/rutas'
import { toogleSidebar } from '../../../actions/common'
import Swal from 'sweetalert2'
import BrandButton from '../../Common/BrandButton'
import BoxButton from '../../Common/BoxButtonV2'

const ClienteFormatter = ({ row }) => {
    return (
        <div data-toggle="tooltip" data-placement="left" title={row.cliente.titular} >
            {row.cliente.titular}
        </div>
    );
};

const columns = [
    // { key: "id", name: "ID", editable: true },
    { key: "NewOrden", name: "New Pos", width: 80, editable: true },
    { key: "orden", name: "Ord", width: 50 },
    { key: "cliente", name: "Cliente", formatter: ClienteFormatter }
];

class Enrutar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: this.props.list,
            newPos: []
        };
        this.onGridRowsUpdated = this.onGridRowsUpdated.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    componentDidMount() {
        this.setState({ items: this.props.list })
    }

    onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
        const column = Object.keys(updated)[0];

        this.setState(state => {
            const items = state.items.slice();
            for (let i = fromRow; i <= toRow; i++) {
                items[i] = { ...items[i], ...updated };
            }
            return { items };
        });

        if (!/^([0-9])*$/.test(updated[column])) {
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Solo se permiten números',
            })
            return;
        }

        if (updated[column] !== "") {
            const newValue = Number(updated[column]) - 1;
            var list = this.state.newPos;

            if (list.filter(x => x.NewOrden === newValue).length > 0) {
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Ya existe un cliente con esa posicion',
                })
                return;
            }

            if (newValue > this.state.items.length || newValue < 0) {
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: 'El numero ingresado es mayor o menor a la cantidad de clientes en la cartera!',
                })
                return;
            }
            var row = this.state.items[toRow];
            row.NewOrden = newValue;
            list.push(row)
            this.setState({ newPos: list })
        } else {
            const item = this.state.items[fromRow];
            this.setState(state => {
                const newPos = state.newPos.filter(x => x.id !== item.id).slice();
                return { newPos };
            });
        }
    };

    onSave() {
        const newPos = this.state.newPos.sort(function (a, b) { return a.NewOrden - b.NewOrden });

        var data = this.state.items.filter(function (x) {
            return newPos.filter(function (z) {
                return z.id === x.id;
            }).length == 0
        });

        newPos.map((x) => {
            data.splice(Number(x.NewOrden), 0, x);
        })

        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            element.NewOrden = index + 1
        }

        this.setState({ items: data });
        this.props.reorderList(data);
        this.props.reorderData();
        this.props.toogleSidebar();
    }

    render() {
        const buttons = [
            <BoxButton key="bp[0][1]" name="save" onClick={() => this.onSave()} title="Guardar enrutado" classCSS="info" />
        ]

        return (
            <div>
                <BrandButton buttons={buttons} />
                <ReactDataGrid
                    columns={columns}
                    rowGetter={i => this.state.items[i]}
                    rowsCount={this.state.items.length}
                    rowHeight={25}
                    minHeight={this.props.height}
                    onGridRowsUpdated={this.onGridRowsUpdated}
                    CellNavigationMode={"NONE"}
                    enableCellSelect={true}
                />
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        list: state.rutas.get('reorder'),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        reorderList: (list) => dispatch(reorderList(list)),
        reorderData: () => dispatch(reorderData()),
        toogleSidebar: () => dispatch(toogleSidebar()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Enrutar)