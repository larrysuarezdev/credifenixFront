import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment';
import numeral from 'numeral';

class TablesNuevosRenovaciones extends Component {

    constructor(props) {
        super(props);
        this.getTotalCorteNuevos = this.getTotalCorteNuevos.bind(this);
        this.getTotalCorteRenovaciones = this.getTotalCorteRenovaciones.bind(this);
    }

    getTotalCorteNuevos(fecha, tipo, ruta) {
        let ret = 0;
        let data = [];

        switch (tipo) {
            case 0:
                data = this.props.nuevos.filter(item => moment(item.get('inicio_credito')).format('YYYY-MM-DD') <= fecha && item.get('ruta_id') === ruta)
                break;
            case 1:
                data = this.props.nuevos.filter(item => moment(item.get('inicio_credito')).format('YYYY-MM-DD') >= this.props.fechas[0] && moment(item.get('inicio_credito')).format('YYYY-MM-DD') <= fecha && item.get('ruta_id') === ruta)
                break;
            case 2:
                data = this.props.nuevos.filter(item => moment(item.get('inicio_credito')).format('YYYY-MM-DD') >= this.props.fechas[1] && moment(item.get('inicio_credito')).format('YYYY-MM-DD') <= fecha && item.get('ruta_id') === ruta)
                break;
            default:
                break;
        }


        if (data !== undefined) {
            ret = data.size;
        }
        return ret;
    }

    getTotalCorteRenovaciones(fecha, tipo, ruta) {
        let ret = 0;
        let data = [];

        switch (tipo) {
            case 0:
                data = this.props.renovaciones.filter(item => moment(item.get('fecha')).format('YYYY-MM-DD') <= fecha && item.getIn(['credito', 'ruta_id']) === ruta)
                break;
            case 1:
                data = this.props.renovaciones.filter(item => moment(item.get('fecha')).format('YYYY-MM-DD') >= this.props.fechas[0] && moment(item.get('fecha')).format('YYYY-MM-DD') <= fecha && item.getIn(['credito', 'ruta_id']) === ruta)
                break;
            case 2:
                data = this.props.renovaciones.filter(item => moment(item.get('fecha')).format('YYYY-MM-DD') >= this.props.fechas[1] && moment(item.get('fecha')).format('YYYY-MM-DD') <= fecha && item.getIn(['credito', 'ruta_id']) === ruta)
                break;
            default:
                break;
        }


        if (data !== undefined) {
            ret = data.size;
        }
        return ret;
    }

    render() {
        return (
            <div >
                <table className="table table-striped table-hover table-sm table-bordered" style={{ margin: 0 }}>
                    <thead>
                        {/* <tr>
                            <td colSpan="8" style={{ backgroundColor: "rgba(93, 194, 70, 0.42)", verticalAlign: "inherit", textAlign: "center" }} >{this.props.title}</td>
                        </tr> */}
                        <tr align="center" style={{ fontSize: 13 }}>
                            <td scope="col" rowSpan="2" style={{ backgroundColor: "rgba(93, 194, 70, 0.42)", verticalAlign: "inherit" }}>COBRADOR</td>
                            {
                                this.props.fechas.map((item, index) => {
                                    return (
                                        <td key={index} colSpan="2" style={{ minWidth: 100 }}>{item}</td>
                                    )
                                })
                            }
                            <td scope="col" rowSpan="2" style={{ backgroundColor: "rgba(93, 194, 70, 0.42)", verticalAlign: "inherit" }}>TOTAL MES</td>
                        </tr>
                        <tr align="center" style={{ fontSize: 13, backgroundColor: "rgb(247, 247, 247)" }}>
                            <td style={{ minWidth: 100 }}>NUEVOS</td>
                            <td style={{ minWidth: 100 }}>RENOVACION</td>
                            <td style={{ minWidth: 100 }}>NUEVOS</td>
                            <td style={{ minWidth: 100 }}>RENOVACION</td>
                            <td style={{ minWidth: 100 }}>NUEVOS</td>
                            <td style={{ minWidth: 100 }}>RENOVACION</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.data.map((x, index) => {
                                let nuevosCorte1 = 0, renovadosCorte1 = 0, nuevosCorte2 = 0, renovadosCorte2 = 0, nuevosCorte3 = 0, renovadosCorte3;
                                
                                nuevosCorte1 = this.getTotalCorteNuevos(this.props.fechas[0], 0, x.get("ruta"));
                                renovadosCorte1 = this.getTotalCorteRenovaciones(this.props.fechas[0], 0, x.get("ruta"));

                                nuevosCorte2 = this.getTotalCorteNuevos(this.props.fechas[1], 1, x.get("ruta"));
                                renovadosCorte2 = this.getTotalCorteRenovaciones(this.props.fechas[1], 1, x.get("ruta"));

                                nuevosCorte3 = this.getTotalCorteNuevos(this.props.fechas[2], 2, x.get("ruta"));
                                renovadosCorte3 = this.getTotalCorteRenovaciones(this.props.fechas[1], 2, x.get("ruta"));
                                return (
                                    <tr align="center" key={index} style={{ fontSize: 13, verticalAlign: "inherit", padding: 10 }}>
                                        <td scope="col" style={{ minWidth: 200 }} >{x.get("nombres")} {x.get("apellidos")}</td>
                                        <td scope="col" style={{ minWidth: 100 }}>{numeral(nuevosCorte1).format()}</td>
                                        <td scope="col" style={{ minWidth: 100 }}>{numeral(renovadosCorte1).format()}</td>
                                        <td scope="col" style={{ minWidth: 100 }}>{numeral(nuevosCorte2).format()}</td>
                                        <td scope="col" style={{ minWidth: 100 }}>{numeral(renovadosCorte2).format()}</td>
                                        <td scope="col" style={{ minWidth: 100 }}>{numeral(nuevosCorte3).format()}</td>
                                        <td scope="col" style={{ minWidth: 100 }}>{numeral(renovadosCorte3).format()}</td>                                       
                                        <td>{numeral(nuevosCorte1 + renovadosCorte1 + nuevosCorte2 + renovadosCorte2 + nuevosCorte3 + renovadosCorte3).format()}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        data: state.reportes.get('dataCoteo'),
        nuevos: state.reportes.get('nuevos'),
        renovaciones: state.reportes.get('renovaciones'),
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TablesNuevosRenovaciones)