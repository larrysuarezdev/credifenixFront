import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import moment from 'moment'
import numeral from 'numeral'
import Swal from 'sweetalert2'

//UI
import BrandButton from '../../components/Common/BrandButton'
import BoxButton from '../../components/Common/BoxButtonV2'
import Modal from '../../components/Common/Modal'
import DataGrid from '../../components/Common/DataGrid'
import DnDListadoClientes from '../../components/Cobros/Rutas/DnDListadoClientes'
// import DnDListadoClientes from '../../components/Cobros/Rutas/DnDListadoClientes1'
import AddCredito from '../../components/Cobros/Rutas/AddCredito'
import RenovarCredito from '../../components/Cobros/Rutas/RenovarCredito'
import ObservacionesCredito from '../../components/Cobros/Rutas/ObservacionesCredito'
import DetallesPagos from '../../components/Cobros/Rutas/DetallesPagos'
import DetalleRenovaciones from '../../components/Cobros/Rutas/DetalleRenovaciones'
import AddClientes from '../../components/Administracion/Clientes/AddClientes'
import ModalFilterMaestras from '../../components/Common/ModalFilterMaestras'


import { getCreditos, saveCredito, getListRutas, getListPeriodos, saveAbonos, saveRenovacion, saveRenovacion1, cleanDataRutas, reorderData, saveRenovacionInmediata, deleteRenovacion, deleteCredito } from '../../actions/rutas'
import { cleanCliente } from '../../actions/clientes'
import { selectAction, changeAttr2, toggleModal, newRow } from '../../actions/common'
import { exportDataGrid } from '../../utils/helpers'
import { showHideModalFilter } from "../../actions/filtrarData";

const tipo = "RUTA";

class Rutas extends Component {
    constructor(props) {
        super(props);
        this.changeAction = this.changeAction.bind(this);
        this.actionClick = this.actionClick.bind(this);
        this.actionClickRenovados = this.actionClickRenovados.bind(this);
        this.actionClickDias = this.actionClickDias.bind(this);
        this.actionClickCancelarRenovado = this.actionClickCancelarRenovado.bind(this);
        this.actionClickRenovadosInmediatos = this.actionClickRenovadosInmediatos.bind(this);
        this.actionClickEliminarCredito = this.actionClickEliminarCredito.bind(this);
        this.createAction = this.createAction.bind(this);
        this.onChangeSelect = this.onChangeSelect.bind(this);
        this.actionToogleSidebarRigth = this.actionToogleSidebarRigth.bind(this);
        this.actionToogleSidebarRigth1 = this.actionToogleSidebarRigth1.bind(this);
        this.getCoteoCuota = this.getCoteoCuota.bind(this);
        this.onExportDataGrid = this.onExportDataGrid.bind(this);

        this.state = {
            tipoModal: 0,
            tabs: [
                { id: 0, caption: 'Observaciones', component: <ObservacionesCredito />, active: true },
                { id: 1, caption: 'Abonos', component: <DetallesPagos />, active: false },
                { id: 2, caption: 'Renovaciones', component: <DetalleRenovaciones />, active: false },
            ],
            tab: 0,
            toogleSidebarRigth: false,
            toogleSidebarRigth1: false,
            idRenovar: null,
            gridHeight: 350,
            moras: false,
            fechaExporte: moment().add(1, 'days'),
            value_dias: ""
        }

    }

    componentWillMount() {
        this.props.cleanDataRutas();
        this.props.getListRutas();
        this.props.getListPeriodos();
        this.props.cleanCliente();
    }

    componentDidMount() {
        var node = ReactDOM.findDOMNode(this.refs["dataExport"]);
        var gridHeight = node.clientHeight;
        this.setState({ gridHeight: gridHeight });
    }

    onExportDataGrid() {
        this.setState({ tipoModal: 4 })
        this.props.toggleModal();
    }

    createAction() {
        this.setState({ tipoModal: 0 })
        this.props.newRow("RUTA");
        this.props.toggleModal()
    }

    changeAction(tipo, id, attr, value, toogle = false) {
        this.props.changeAttr2(tipo, id, attr, value)
        if (toogle)
            this.props.toggleModal()
    }

    actionClick(id) {
        this.props.selectAction(id, null, tipo);
        this.setState({ tipoModal: 1 })
        this.props.toggleModal();
    }

    actionClickRenovados(rowId) {
        this.setState({ idRenovar: rowId })
        this.setState({ tipoModal: 2 });
        this.props.saveRenovacion(rowId);
    }

    actionClickDias(rowId) {
        this.setState({ idRenovar: rowId })
        this.setState({ tipoModal: 5 });
        this.props.toggleModal();
    }

    actionClickRenovadosInmediatos(rowId) {
        Swal.fire({
            title: 'Renovar credito',
            html: `<div> 
                    <p> Realmente desea renovar este credito? </p>
                   </div>`,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar cambios'
        }).then((result) => {
            if (result.value) {
                this.setState({ idRenovar: rowId })
                this.props.saveRenovacionInmediata(rowId);
            }
        })
    }

    actionClickEliminarCredito(rowId) {
        Swal.fire({
            title: 'Retirar credito',
            html: `<div> 
                    <p> Realmente desea retirar este credito de la ruta? </p>
                   </div>`,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar cambios'
        }).then((result) => {
            if (result.value) {
                this.setState({ idRenovar: rowId })
                this.props.deleteCredito(rowId);
            }
        })
    }

    actionClickCancelarRenovado(rowId) {
        Swal.fire({
            title: 'Cancelar renovación',
            html: `<div> 
                    <p> Realmente desea devolver el estado de la renovación? </p>
                   </div>`,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar cambios'
        }).then((result) => {
            if (result.value) {
                this.props.deleteRenovacion(rowId);
            }
        });
    }

    actionClickReorder() {
        this.setState({ tipoModal: 3 })
        this.props.toggleModal();
    }

    saveRenovacion() {
        this.props.saveRenovacion(this.state.idRenovar)
    }

    saveRenovacion1() {
        this.props.saveRenovacion1(this.state.idRenovar)
    }

    onChangeSelect(id) {
        this.props.getCreditos(id);
    }

    changeTab(tab) {
        let tabs = this.state.tabs.map(x => {
            x.active = false;
            return x;
        })
        tabs[tabs.findIndex(x => x.id === tab.id)].active = true;
        this.setState({ tabs, tab: tab.id });
    }

    actionToogleSidebarRigth(tipo = null) {
        this.setState({ tipoModal: tipo });
        this.setState({ toogleSidebarRigth: !this.state.toogleSidebarRigth })
        this.props.toggleModal();
    }

    actionToogleSidebarRigth1() {
        // this.setState({ tipoModal: tipo });
        this.setState({ toogleSidebarRigth1: !this.state.toogleSidebarRigth1 })
        // this.props.toggleModal();
    }

    reorderData(data) {
        this.props.reorderData();
        this.actionToogleSidebarRigth1()
    }

    getCoteoCuota(x) {
        let coteo = 0
        const rest = (x.get('cuota') * 1000) / x.get('mod_cuota')
        if (x.get('cuota') >= 5) {
            if ((x.get('cuota') * 1000) < x.get('mod_cuota')) {
                coteo = 1;
            }
            else {
                coteo = Math.floor(rest);
            }
        } else {
            coteo = 0;
        }
        return coteo;
    }

    saveAbonos() {
        let entrada = 0, salida = 0, utilidad = 0, coteos = 0;

        this.props.list.map((x) => {
            entrada = entrada + Number(x.get('cuota'));
            if (x.get('renovacion')) {
                coteos++;
                salida = salida + Number(x.getIn(['renovacion', 'monto']));
                if (x.getIn(['renovacion', 'editable'])) {
                    utilidad = utilidad + (x.getIn(['renovacion', 'utilidad']) * 1000);
                } else {
                    utilidad = utilidad + (x.get('valor_total') - x.get('valor_prestamo'));
                }
            } else {
                coteos = coteos + this.getCoteoCuota(x);
            }
        })

        const _new = this.props.nuevos.map(entry => entry.get('valor')).reduce((prev, current) => prev + current);

        entrada = entrada * 1000;
        salida = salida * 1000;

        if (_new) {
            salida = salida + (_new)
        }

        Swal.mixin({
            // input: 'text',
            confirmButtonText: 'Siguiente',
            showCancelButton: true,
            progressSteps: ['1', '2'],
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            // confirmButtonText: 'Confirmar cambios'
        }).queue([
            {
                title: 'FLUJO DE CAJA',
                html: `<div> 
                    <p> Entran: ${numeral(entrada).format('')} </p>
                    <p> Salen: ${numeral(salida).format('')} </p>
                    <p> Utilidad: ${numeral(utilidad).format('')} </p>
                    <p> Coteos: ${coteos} </p>
                    </div>`,
            },
            {
                title: "Calculo de moras",
                input: 'checkbox',
                inputValue: 1,
                inputPlaceholder: 'Desea calcular moras?',
                confirmButtonText: 'Confirmar cambios'
            }
        ]).then((result) => {
            if (result.value) {
                if (result.value[0]) {
                    this.props.saveAbonos(entrada, salida, utilidad, coteos, result.value[1] === 1 ? true : false)
                }
            }
        })
    }

    renderSwitch(param) {
        const buttons = [
            <BoxButton key="b1[0][0]" name="save" onClick={() => this.props.saveCredito()} title="Guardar crédito" classCSS="info" />,
        ]

        const buttons1 = [
            <BoxButton key="b2[0][0]" name="save" onClick={() => this.saveRenovacion1()} title="Guardar crédito" classCSS="info" />,
        ]

        const buttons2 = [
            <BoxButton key="b3[0][0]" name="save" onClick={() => this.reorderData()} title="Guardar enrutado" classCSS="info" />,
        ]

        const buttons3 = [
            <BoxButton key="b1[0][0]" name="save" onClick={() => exportDataGrid(this.props.list, this.props.idRuta, this.props.cobrador, this.state.fechaExporte, this.props.cartera)} title="Guardar exporte" classCSS="info" />,
        ]

        const buttons4 = [
            <BoxButton key="b1[0][0]" name="save" onClick={() => this.changeAction("RUTA", this.state.idRenovar, "obs_dia", this.state.value_dias, true)} title="Guardar exporte" classCSS="info" />,
        ]

        const { tabs, tab } = this.state;

        switch (param) {
            case 0:
                return (
                    <Modal title="Gestionar crédito" buttons={buttons} brand={true} width={600} className="modal-lg">
                        <AddCredito action={this.actionToogleSidebarRigth} obs_dias={this.props.obs_dias} />
                    </Modal>
                )
            case 1:
                return (
                    <Modal title="Detalles de abono al credito" brand={false}  >
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
                            <div className="tab-pane fade show active">
                                {tabs[tab].component}
                            </div>
                        </div>
                    </Modal>
                )
            case 2:
                return (
                    <Modal title="Renovar crédito" buttons={buttons1} brand={true} >
                        <RenovarCredito id={this.state.idRenovar} />
                    </Modal>
                )
            case 3:
                return (
                    <Modal title="Reordenar clientes" buttons={buttons2} brand={true} >
                        <DnDListadoClientes />
                    </Modal>
                )
            case 4:
                return (
                    <Modal title="Exportar ruta" buttons={buttons3} brand={true}>
                        <div className="row" style={{ padding: '10px 0' }}>
                            <div className="col-md-7">La fecha de exporte es automática, si desea cambiarla por favor seleccione...</div>
                            <div className="col-md-5">
                                <input className="form-control form-control-sm" type="date" style={{ marginTop: 15 }} value={moment(this.state.fechaExporte).format('YYYY-MM-DD')} onChange={(e) => this.setState({ fechaExporte: e.target.value })} />
                            </div>
                        </div>
                    </Modal>
                )
            case 5:
                return (
                    <Modal title="Cambiar día observación" buttons={buttons4} brand={true}>
                        <div className="row" style={{ padding: 20 }}>
                            <div className="col">Observación día:</div>
                            <div className="col">
                                <select className="form-control form-control-sm" id="observacion" onChange={(e) => this.setState({ value_dias: e.target.value })} >
                                    <option value="" key={0}>Seleccione..</option>
                                    {
                                        this.props.obs_dias.map((x, i) => {
                                            return (
                                                <option value={x.get("value")} key={i}>{x.get("value")}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </Modal>
                )
            default:
                return null;
        }
    }


    render() {
        const { ids, list, rutas, cartera, cobrador, idRuta, user } = this.props;
        var today = moment((new Date())).format('YYYY-MM-DD');

        const buttons = [
            <BoxButton key="br[0][0]" name="plus" onClick={() => this.createAction()} title="Agregar crédito" classCSS="info" disabled={idRuta != null ? false : true} />,
            // <BoxButton key="br[0][1]" name="exchange-alt" onClick={() => this.actionClickReorder()} title="Enrutar" classCSS="info" disabled={idRuta != null ? false : true} />,
            <BoxButton key="br[0][1]" name="exchange-alt" onClick={() => this.actionToogleSidebarRigth1()} title="Enrutar" classCSS="info" disabled={idRuta != null ? false : true} />,
            <BoxButton key="br[0][2]" name="save" onClick={() => this.saveAbonos()} title="Guardar abonos" classCSS="info" disabled={idRuta != null ? false : true} />,
            // <BoxButton key="br[0][3]" name="filter" onClick={() => this.props.showHideModalFilter(true, tableColumnsRutas, 'rutas')} title="Filtrar información" classCSS="info" disabled={idRuta != null ? false : true} />,
            <BoxButton key="br[0][4]" name="file-pdf" onClick={() => this.onExportDataGrid(list, idRuta, cobrador)} title="Exportar ruta" classCSS="info" disabled={idRuta != null ? false : true} />,
        ]

        return (
            <div className="card border-left-success">
                <BrandButton buttons={buttons} />
                <div className="row" style={{ marginBottom: 0, background: '#f7f7f7', marginLeft: 0, marginRight: 0, paddingBottom: 0 }}>
                    <div className="col-md-3">
                        <label >Ruta</label>
                        <div className="form-group">
                            <select className="form-control form-control-sm" id="exampleFormControlSelect1" onChange={(e) => this.onChangeSelect(e.target.value)}>
                                <option value="0">Seleccione...</option>
                                {
                                    rutas.map((x) => {
                                        return (
                                            <option value={x.get('value')} key={x.get('value')} >{x.get('label')}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <label >Fecha</label>
                        <input className="form-control form-control-sm" type="date" value={today} readOnly ></input>
                    </div>
                    <div className="col-md-3">
                        <label >Cartera</label>
                        <input className="form-control form-control-sm" type="text" value={numeral(cartera).format('')} readOnly disabled ></input>
                    </div>
                    <div className="col-md-3">
                        <label >Cobrador</label>
                        <input className="form-control form-control-sm" type="text" value={cobrador !== 'Sin asignar' ? cobrador.nombres + ' ' + cobrador.apellidos : cobrador} readOnly disabled ></input>
                    </div>
                </div>
                <div className="col-md-12 col-xs-12" style={{ padding: 0 }} >
                    <div style={{ height: "calc(100vh - 255px)", maxHeight: "calc(100vh - 255px)" }} ref="dataExport">
                        <DataGrid
                            height={this.state.gridHeight}
                            rows={list}
                            ids={ids}
                            changeAction={this.changeAction}
                            actionClick={this.actionClick}
                            actionClickRenovados={this.actionClickRenovados}
                            actionClickDias={this.actionClickDias}
                            actionClickCancelarRenovado={this.actionClickCancelarRenovado}
                            actionClickRenovadosInmediatos={this.actionClickRenovadosInmediatos}
                            actionClickEliminarCredito={this.actionClickEliminarCredito}
                            user={user}
                        />
                    </div>
                </div>
                {
                    this.state.toogleSidebarRigth ?
                        <div className="sidenav">
                            <div className="row">
                                <div className="col-md-9" style={{ paddingLeft: 25 }}>
                                    <h5>
                                        Agregar nuevo cliente:
                                    </h5>
                                </div>
                                <div className="col-md-3">
                                    <div className="col">
                                        <div className="float-right">
                                            <BoxButton key="bp[0][0]" name="times" onClick={() => this.actionToogleSidebarRigth(0)} title="Cerrar" classCSS="info" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <AddClientes showReferencias={false} />
                        </div>
                        : null
                }
                {
                    this.state.toogleSidebarRigth1 ?
                        <div className="sidenav" style={{ width: '30vw', paddingBottom: 70 }}>
                            <div className="row">
                                <div className="col-md-9" style={{ paddingLeft: 25 }}>
                                    <h5>
                                        Enrutar clientes
                                    </h5>
                                </div>
                                <div className="col-md-3">
                                    <div className="col">
                                        <div className="float-right">
                                            <BoxButton key="bp[0][1]" name="save" onClick={() => this.reorderData()} title="Guardar enrutado" classCSS="info" />,
                                            <BoxButton key="bp[0][0]" name="times" onClick={() => this.actionToogleSidebarRigth1()} title="Cerrar" classCSS="info" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <DnDListadoClientes />
                        </div>
                        : null
                }
                {this.renderSwitch(this.state.tipoModal)}
                <ModalFilterMaestras />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        list: state.rutas.get('list'),
        ids: state.rutas.get('ids'),
        rutas: state.rutas.get('rutas'),
        cartera: state.rutas.get('cartera'),
        nuevos: state.rutas.get('nuevos'),
        idRuta: state.rutas.get('idRuta'),
        obs_dias: state.rutas.get('obs_dias'),
        user: state.auth.user,
        cobrador: state.rutas.get('cobrador')
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getListRutas: () => dispatch(getListRutas()),
        getListPeriodos: () => dispatch(getListPeriodos()),
        getCreditos: (id) => dispatch(getCreditos(id)),
        selectAction: (id, reloadGrid, tipo) => dispatch(selectAction(id, reloadGrid, tipo)),
        changeAttr2: (tipo, id, attr, value) => dispatch(changeAttr2(tipo, id, attr, value)),
        toggleModal: () => dispatch(toggleModal()),
        newRow: (tipo) => dispatch(newRow(tipo)),
        saveCredito: () => dispatch(saveCredito()),
        saveAbonos: (entrada, salida, utilidad, coteos, moras) => dispatch(saveAbonos(entrada, salida, utilidad, coteos, moras)),
        saveRenovacion: (id) => dispatch(saveRenovacion(id)),
        saveRenovacion1: (id) => dispatch(saveRenovacion1(id)),
        saveRenovacionInmediata: (id) => dispatch(saveRenovacionInmediata(id)),
        deleteRenovacion: (id) => dispatch(deleteRenovacion(id)),
        deleteCredito: (id) => dispatch(deleteCredito(id)),
        cleanCliente: () => dispatch(cleanCliente()),
        cleanDataRutas: () => dispatch(cleanDataRutas()),
        reorderData: () => dispatch(reorderData()),
        showHideModalFilter: (state, columnas, mode) => dispatch(showHideModalFilter(state, columnas, mode)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Rutas)