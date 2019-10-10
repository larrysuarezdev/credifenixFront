import React, { Component } from 'react';
import { connect } from 'react-redux'
import moment from 'moment'
import { exportCoteos } from '../../utils/helpers'


//UI
import TablesCoteo from '../../components/Reportes/TablesCoteo'
import TablesUtilidadRecaudo from '../../components/Reportes/TablesUtilidadRecaudo'
import TablesNuevosRenovaciones from '../../components/Reportes/TablesNuevosRenovaciones'

import BoxButtonV2 from '../../components/Common/BoxButtonV2'

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
        this.changeTab = this.changeTab.bind(this);

        this.state = {
            tabs: [
                { id: 0, caption: 'Corte 1', active: true },
                { id: 1, caption: 'Corte 2', active: false },
                { id: 2, caption: 'Corte 3', active: false },
                { id: 3, caption: 'UTILIDAD', active: false },
                { id: 4, caption: 'RECAUDO', active: false },
                { id: 5, caption: 'NUEVOS Y REN', active: false },
            ],
            tab: 0,
            dates: [],
        };
    }

    changeTab(tab) {
        if (this.props.selectRow !== null) {
            let tabs = this.state.tabs.map(x => {
                x.active = false;
                return x;
            })
            tabs[tabs.findIndex(x => x.id === tab.id)].active = true;
            this.setState({ tabs, tab: tab.id });
        }
    }

    onGetDate(month) {
        var date = new Date(), y = date.getFullYear();
        var firstDay = new Date(y, Number(month), 1);
        var lastDay = new Date(y, Number(month) + 1, 0);
        this.setState({ dates: getDates(firstDay, lastDay) });
        this.props.getCoteos(moment(firstDay).format('YYYY-MM-DD'), moment(lastDay).format('YYYY-MM-DD'));
    }

    render() {
        const { tabs, tab } = this.state;
        const { list, list1, nuevos, renovaciones } = this.props;

        const dates1 = this.state.dates.slice(0, 10);
        const dates2 = this.state.dates.slice(10, 20)
        const dates3 = this.state.dates.slice(20);
        const fechas = [dates1[dates1.length - 1], dates2[dates2.length - 1], dates3[dates3.length - 1]]

        tabs[0].component = <TablesCoteo title="CLIENTES  CORTE 1" dates={dates1} />;
        tabs[1].component = <TablesCoteo title="CLIENTES  CORTE 2" dates={dates2} />;
        tabs[2].component = <TablesCoteo title="CLIENTES  CORTE 3" dates={dates3} />;
        tabs[3].component = <TablesUtilidadRecaudo title="UTILIDAD RENOVACIONES" titles={["UTILIDAD CORTE 1", "UTILIDAD CORTE 2", "UTILIDAD CORTE 3"]} fechas={fechas} list={list} texto="Utilidad ruta " />;
        tabs[4].component = <TablesUtilidadRecaudo title="ACUMALADO RECAUDO" titles={["RECAUDO CORTE 1", "RECAUDO CORTE 2", "RECAUDO CORTE 3"]} fechas={fechas} list={list1} texto="Cobros ruta " />;
        tabs[5].component = <TablesNuevosRenovaciones title="NUEVOS Y RENOVACIONES" fechas={fechas} />;

        return (
            <div>
                <div className="card shadow border-left-success mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-success">Reporte de coteos</h6>
                        <BoxButtonV2 key="bb[0][0]" name="file-pdf" onClick={() => exportCoteos(this.props.data, this.state.dates, fechas, list, list1, nuevos, renovaciones)} title="Exportar" classCSS="success" />
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
                    {/* <div className="table-responsive" style={{ height: 'calc(100vh - 295px)' }} ref="dataExport"> */}
                    <ul className="nav nav-tabs nav-justified" id="myTab" role="tablist">
                        {
                            tabs.map(x => {
                                return (
                                    <li key={`li01[${x.id}]`} className={x.active ? "nav-item active" : "nav-item"} >
                                        <a
                                            data-toggle="tab"
                                            aria-expanded={x.active ? "true" : "false"}
                                            onClick={(e) => this.changeTab(x)}
                                            className="nav-link"
                                        >
                                            {x.caption}
                                        </a>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <div className="tab-content">
                        <div className="tab-pane fade show active table-responsive" style={{ height: 'calc(100vh - 333px)' }}>
                            {tabs[tab].component}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        data: state.reportes.get('dataCoteo'),
        list: state.reportes.get('utilidades'),
        list1: state.reportes.get('recaudos'),
        nuevos: state.reportes.get('nuevos'),
        renovaciones: state.reportes.get('renovaciones'),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getCoteos: (firstDay, lastDay) => dispatch(getCoteos(firstDay, lastDay)),
        // selectAction: (id, reloadGrid, tipo) => dispatch(selectAction(id, reloadGrid, tipo)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Coteos)