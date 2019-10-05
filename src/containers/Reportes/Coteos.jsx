import React, { Component } from 'react';
import { connect } from 'react-redux'
import moment from 'moment'
// import numeral from 'numeral'


//UI
import TablesCoteo from '../../components/Reportes/TablesCoteo'
// import ModalClientes from '../../Cobros/Rutas/ModalClientes'

import { getCoteos } from '../../actions/reportes'

var getDates = function (startDate, endDate) {
    var dates = [],
        currentDate = startDate,
        addDays = function (days) {
            var date = new Date(this.valueOf());
            date.setDate(date.getDate() + days);
            return date;
        };
    while (currentDate <= endDate) {
        dates.push(moment(currentDate).format('YYYY-MM-DD'));
        currentDate = addDays.call(currentDate, 1);
    }
    return dates;
};

class Coteos extends Component {

    constructor(props) {
        super(props);
        this.onGetDate = this.onGetDate.bind(this);

        this.state = {
            dates: [],
        }
    }
    componentWillMount() {
        // this.props.getFlujoCaja();
    }

    onGetDate(month) {
        var date = new Date(), y = date.getFullYear();
        var firstDay = new Date(y, Number(month), 1);
        var lastDay = new Date(y, Number(month) + 1, 0);
        this.setState({ dates: getDates(firstDay, lastDay) });
        this.props.getCoteos(moment(firstDay).format('YYYY-MM-DD'), moment(lastDay).format('YYYY-MM-DD'));
    }

    render() {

        return (
            <div>
                <div className="card shadow border-left-success mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-success">Reporte de coteos</h6>
                    </div>
                    <div className="row" style={{ marginBottom: 0, background: '#f7f7f7', marginLeft: 0, marginRight: 0, paddingBottom: 0 }}>
                        <div className="col-md-3">
                            <label >Mes reporte:</label>
                            <div className="form-group">
                                <select className="form-control form-control-sm" id="exampleFormControlSelect1" onChange={(e) => this.onGetDate(e.target.value)}>
                                    <option value="">Seleccione...</option>
                                    <option value="0">Enero</option>
                                    <option value="1">Febrero</option>
                                    <option value="2">Marzo</option>
                                    <option value="3">Abril</option>
                                    <option value="4">Mayo</option>
                                    <option value="5">Junio</option>
                                    <option value="6">Julio</option>
                                    <option value="7">Agosto</option>
                                    <option value="8">Septiembre</option>
                                    <option value="9">Octubre</option>
                                    <option value="10">Noviembre</option>
                                    <option value="11">Diciembre</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="table-responsive" style={{ height: 'calc(100vh - 290px)' }}>
                        <TablesCoteo title="CLIENTES  CORTE 1" dates={this.state.dates.slice(0, 10)} />
                        <TablesCoteo title="CLIENTES  CORTE 2" dates={this.state.dates.slice(10, 20)} />
                        <TablesCoteo title="CLIENTES  CORTE 3" dates={this.state.dates.slice(20)} />
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        // list: state.flujoCaja.get('list'),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getCoteos: (firstDay, lastDay) => dispatch(getCoteos(firstDay, lastDay)),
        // selectAction: (id, reloadGrid, tipo) => dispatch(selectAction(id, reloadGrid, tipo)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Coteos)