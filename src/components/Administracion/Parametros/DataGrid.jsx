import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactDataGrid from 'react-data-grid';

// import { isNumber } from 'util';
// import numeral from 'numeral'
// import moment from 'moment'

// import { ClienteFormatter, NegocioFormatter, DireccionFormatter, TelefonoClienteFormatter, FiadorFormatter, TelefonoFiadorFormatter } from "../../utils/formatterFunctions";

const columns = [
    { key: 'id_interno', name: 'Id', editable: false, width: 50, frozen: false },
    { key: 'valor', name: 'Valor', editable: true, frozen: false },
];

class DataGrid extends Component {

    static defaultProps = { rowKey: "id" };

    constructor(props) {
        super(props);
    }

    onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
        const id = this.props.ids.get(toRow);
        const column = Object.keys(updated)[0];
        this.props.changeAction('PARAMETRO', id, column, updated[column])
    };

    render() {
        const data = this.props.rows.toList().toJS().sort(function (a, b) { return a.id - b.id })

        return (
            <ReactDataGrid
                columns={columns}
                rowGetter={(i) => data[i]}
                rowsCount={data.length}
                onGridRowsUpdated={this.onGridRowsUpdated}
                enableCellSelect={true}
                rowHeight={25}
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