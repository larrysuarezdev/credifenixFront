import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment';
import numeral from 'numeral';

class TablesUtilidadRecaudo extends Component {

    constructor(props) {
        super(props);
        this.getTotalCorte = this.getTotalCorte.bind(this);
    }

    getTotalCorte(fecha, tipo, ruta, text) {
        let ret = 0;
        let data = [];

        switch (tipo) {
            case 0:
                data = this.props.list.filter(item => moment(item.get('fecha')).format('YYYY-MM-DD') <= fecha && item.get("descripcion") == text + ruta)
                break;
            case 1:
                data = this.props.list.filter(item => moment(item.get('fecha')).format('YYYY-MM-DD') > this.props.fechas[0] && moment(item.get('fecha')).format('YYYY-MM-DD') <= fecha && item.get("descripcion") == text + ruta)
                break;
            case 2:
                data = this.props.list.filter(item => moment(item.get('fecha')).format('YYYY-MM-DD') > this.props.fechas[1] && moment(item.get('fecha')).format('YYYY-MM-DD') <= fecha && item.get("descripcion") == text + ruta)
                break;
            default:
                break;
        }


        if (data !== undefined) {
            data.map((item) => {
                ret = ret + item.get("valor")
            })
        }
        return ret;
    }

    render() {
        let sumTotal = 0;
        return (
            <div >
                <table className="table table-striped table-hover table-sm table-bordered" style={{ margin: 0 }}>
                    <thead>
                        {/* <tr>
                            <td colSpan="5" style={{ backgroundColor: "rgba(93, 194, 70, 0.42)", verticalAlign: "inherit", textAlign: "center" }} >{this.props.title}</td>
                        </tr> */}
                        <tr align="center" style={{ fontSize: 13 }}>
                            <td scope="col" rowSpan="2" style={{ backgroundColor: "rgba(93, 194, 70, 0.42)", verticalAlign: "inherit" }}>COBRADOR</td>
                            {
                                this.props.titles.map((item, indexT) => {
                                    return (
                                        <td scope="col" key={indexT} style={{ backgroundColor: "rgba(93, 194, 70, 0.42)" }}>{item}</td>
                                    )
                                })
                            }
                            <td scope="col" rowSpan="2" style={{ backgroundColor: "rgba(93, 194, 70, 0.42)", verticalAlign: "inherit" }}>TOTAL MES</td>
                        </tr>
                        <tr align="center" style={{ fontSize: 13, backgroundColor: "rgb(247, 247, 247)" }}>
                            {
                                this.props.fechas.map((item, index) => {
                                    return (
                                        <td key={index} style={{ minWidth: 100 }}>{item}</td>
                                    )
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.data.map((x, index) => {
                                let total = 0;
                                return (
                                    <tr align="center" key={index} style={{ fontSize: 13, verticalAlign: "inherit", padding: 10 }}>
                                        <td scope="col" style={{ minWidth: 200 }} >{x.get("nombres")} {x.get("apellidos")}</td>
                                        {
                                            this.props.fechas.map((item, index1) => {
                                                const rest = this.getTotalCorte(item, index1, x.get("ruta"), this.props.texto);
                                                total = total + rest;
                                                return (
                                                    <td key={item} style={{ minWidth: 100 }}>
                                                        {
                                                            numeral(rest).format()
                                                        }
                                                    </td>
                                                )
                                            })
                                        }
                                        {
                                            <td style={{ display: 'none' }}>{sumTotal = sumTotal + total}</td>
                                        }
                                        <td>{numeral(total).format()}</td>
                                    </tr>
                                )
                            })
                        }
                        <tr>
                            <td colSpan="3" align="right" ></td>
                            <td align="center" >Total</td>
                            <td align="center">{numeral(sumTotal).format()}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        data: state.reportes.get('dataCoteo'),
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TablesUtilidadRecaudo)