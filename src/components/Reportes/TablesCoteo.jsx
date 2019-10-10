import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment';

class TablesCoteo extends Component {

    constructor(props) {
        super(props);
        this.getCoteo = this.getCoteo.bind(this);
        this.getValorModalidadDia = this.getValorModalidadDia.bind(this);
    }

    getCoteo(list, fecha) {
        let ret = 0;
        var data = list.filter(item => moment(item.get('fecha')).format('YYYY-MM-DD') === fecha)

        if (data !== undefined) {
            data.map((item) => {
                ret = ret + item.get("coteos_dia")
            })
        }
        return ret;
    }

    getValorModalidadDia(list, tipo) {
        let ret = 0;
        this.props.dates.map(fecha => {
            // console.log(fecha)
            var data = list.filter(item => moment(item.get('fecha')).format('YYYY-MM-DD') === fecha)
            if (data !== undefined) {
                data.map((item) => {
                    // console.log(item.get("total_creditos_dia"), fecha)
                    if (tipo == 1) {
                        ret = item.get("total_creditos_dia") > 0 ? item.get("total_creditos_dia") : ret;
                    }
                    else
                        ret = item.get("total_creditos_dia") > 0 ? item.get("total_creditos_sem") : ret
                })
            }
        })

        return ret;
    }

    render() {
        let sumTotal = 0;
        return (
            <div >
                <table className="table table-striped table-hover table-sm table-bordered" style={{ margin: 0 }}>
                    <thead>
                        <tr align="center" style={{ fontSize: 13 }}>
                            <td scope="col" rowSpan="2" style={{ backgroundColor: "rgba(93, 194, 70, 0.42)", verticalAlign: "inherit" }}>COBRADOR</td>
                            <td scope="col" colSpan="2" style={{ backgroundColor: "rgba(93, 194, 70, 0.42)" }}>{this.props.title}</td>
                            {
                                this.props.dates.map((item) => {
                                    return (
                                        <td key={item} style={{ minWidth: 100 }}>{item}</td>
                                    )
                                })
                            }
                            <td scope="col" rowSpan="2" style={{ backgroundColor: "rgba(93, 194, 70, 0.42)", verticalAlign: "inherit" }}>COTEADO</td>
                            <td scope="col" rowSpan="2" style={{ backgroundColor: "rgba(93, 194, 70, 0.42)", verticalAlign: "inherit" }}>QUEDADO</td>
                        </tr>
                        <tr align="center" style={{ fontSize: 13, backgroundColor: "rgb(247, 247, 247)" }}>
                            <td scope="col" >DIARIOS</td>
                            <td scope="col" >SEMANALES</td>
                            {
                                this.props.dates.map((item, index) => {
                                    return (
                                        <td key={index} style={{ minWidth: 100 }}>COTEO</td>
                                    )
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.data.map((x, index) => {
                                let coteado = 0;
                                let diarios = this.getValorModalidadDia(x.get("coteos"), 1);
                                let semanales = this.getValorModalidadDia(x.get("coteos"), 2);

                                return (
                                    <tr align="center" key={index} style={{ fontSize: 13, verticalAlign: "inherit", padding: 10 }}>
                                        <td scope="col" style={{ minWidth: 200 }} >{x.get("nombres")} {x.get("apellidos")}</td>
                                        <td scope="col">
                                            {
                                                diarios
                                            }
                                        </td>
                                        <td scope="col">
                                            {
                                                semanales
                                            }
                                        </td>
                                        {
                                            this.props.dates.map((item) => {
                                                const rest = this.getCoteo(x.get("coteos"), item);
                                                coteado = coteado + rest;
                                                return (
                                                    <td key={item} style={{ minWidth: 100 }}>
                                                        {
                                                            rest
                                                        }
                                                    </td>
                                                )
                                            })
                                        }
                                        <td>{coteado}</td>
                                        <td>{((diarios * 8) + semanales) - coteado}</td>
                                    </tr>
                                )
                            })
                        }
                        {/* <tr>
                            <td colSpan={this.props.dates.length + 4} align="right" >Total</td>
                            <td align="center">{sumTotal}</td>
                        </tr> */}
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
export default connect(mapStateToProps, mapDispatchToProps)(TablesCoteo)