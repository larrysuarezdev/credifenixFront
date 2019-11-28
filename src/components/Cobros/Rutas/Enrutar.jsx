import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactDataGrid from "react-data-grid";
import { reorderList } from '../../../actions/rutas'
import Swal from 'sweetalert2'

const ClienteFormatter = ({ row }) => {
    return (
        <div data-toggle="tooltip" data-placement="left" title={row.cliente.titular} >
            {row.cliente.titular}
        </div>
    );
};

const columns = [
    // { key: "id", name: "ID", editable: true },
    { key: "NewOrden", name: "ID", width: 50 },
    { key: "orden", name: "Ord Ant", width: 70, editable: true },
    { key: "cliente", name: "Cliente", formatter: ClienteFormatter }
];

class Enrutar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: this.props.list,
        };
        this.onGridRowsUpdated = this.onGridRowsUpdated.bind(this);
    }

    componentDidMount() {
        this.setState({ items : this.props.list })
    }

    onGridRowsUpdated = ({ toRow, updated }) => {
        const column = Object.keys(updated)[0];
        const newValue = Number(updated[column]) - 1;
        var row = this.state.items[toRow];
        var data = this.state.items.filter(x => x.id !== row.id);

        if(newValue > data.length || newValue < 0)
        {
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'El numero ingresado es mayor o menor a la cantidad de clientes en la cartera!',
            })
            return;
        }

        data.splice(newValue, 0, row);

        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            element.NewOrden = index + 1
        }

        this.setState({ items: data });
        this.props.reorderList(data);
    };

    render() {
        // console.log(this.state.items)
        return (
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
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Enrutar)