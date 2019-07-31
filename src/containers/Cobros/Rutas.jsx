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
import SelectComponent from '../../components/Common/SelectComponent';
import AddCredito from '../../components/Cobros/Rutas/AddCredito'
import RenovarCredito from '../../components/Cobros/Rutas/RenovarCredito'
import ObservacionesCredito from '../../components/Cobros/Rutas/ObservacionesCredito'
import DetallesPagos from '../../components/Cobros/Rutas/DetallesPagos'
import DetalleRenovaciones from '../../components/Cobros/Rutas/DetalleRenovaciones'
import AddClientes from '../../components/Administracion/Clientes/AddClientes'


import { getCreditos, saveCredito, getListRutas, saveAbonos, saveRenovacion, cleanDataRutas, reorderData } from '../../actions/rutas'
import { cleanCliente } from '../../actions/clientes'
import { selectAction, changeAttr2, toggleModal, newRow } from '../../actions/common'
import { exportDataGrid } from '../../utils/helpers'
const tipo = "RUTA";

class Rutas extends Component {
    constructor(props) {
        super(props);
        this.changeAction = this.changeAction.bind(this);
        this.actionClick = this.actionClick.bind(this);
        this.actionClickRenovados = this.actionClickRenovados.bind(this);
        this.createAction = this.createAction.bind(this);
        this.onChangeSelect = this.onChangeSelect.bind(this);
        this.actionToogleSidebarRigth = this.actionToogleSidebarRigth.bind(this);


        this.state = {
            tipoModal: 0,
            tabs: [
                { id: 0, caption: 'Observaciones', component: <ObservacionesCredito />, active: true },
                { id: 1, caption: 'Abonos', component: <DetallesPagos />, active: false },
                { id: 2, caption: 'Renovaciones', component: <DetalleRenovaciones />, active: false },
            ],
            tab: 0,
            toogleSidebarRigth: false,
            idRenovar: null,
            gridHeight: 350
        }

    }

    componentWillMount() {
        this.props.cleanDataRutas();
        this.props.getListRutas();
        this.props.cleanCliente();        
    }

    componentDidMount() {
        var node = ReactDOM.findDOMNode(this.refs["dataExport"]);
        console.log(node)
        var gridHeight = node.clientHeight;
        this.setState({ gridHeight : gridHeight });
    }
    
    createAction() {
        this.setState({ tipoModal: 0 })
        this.props.newRow("RUTA");
        this.props.toggleModal()
    }

    changeAction(tipo, id, attr, value) {
        this.props.changeAttr2(tipo, id, attr, value)
    }

    actionClick(id) {
        this.props.selectAction(id, null, tipo);
        this.setState({ tipoModal: 1 })
        this.props.toggleModal();
    }

    actionClickRenovados(rowId) {
        this.setState({ idRenovar: rowId })
        this.setState({ tipoModal: 2 })
        this.props.toggleModal();
    }

    actionClickReorder() {
        this.setState({ tipoModal: 3 })
        this.props.toggleModal();
    }

    saveRenovacion() {
        this.props.saveRenovacion(this.state.idRenovar)
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

    reorderData(data) {
        this.props.reorderData();
        this.props.toggleModal();
    }

    saveAbonos() {
        let entrada = 0, salida = 0;

        this.props.list.map((x) => {
            entrada = entrada + Number(x.get('cuota'));
            if (x.get('renovacion')) {
                salida = salida + Number(x.getIn(['renovacion', 'monto']))
            }
        })

        entrada = entrada * 1000;
        salida = salida * 1000;
        Swal.fire({
            title: 'FLUJO DE CAJA',
            html: `<div> 
                    <p> Entran: ${numeral(entrada).format('')} </p>
                    <p> Salen: ${numeral(salida).format('')} </p>
                    <p> Utilidad: ${numeral(entrada + salida).format('')} </p>
                   </div>`,
            // type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar cambios'
        }).then((result) => {
            if (result.value) {
                this.props.saveAbonos(entrada, salida)
            }
        })
    }

    renderSwitch(param) {
        const buttons = [
            <BoxButton key="b1[0][0]" name="save" onClick={() => this.props.saveCredito()} title="Guardar crédito" classCSS="info" />,
        ]

        const buttons1 = [
            <BoxButton key="b2[0][0]" name="save" onClick={() => this.saveRenovacion()} title="Guardar crédito" classCSS="info" />,
        ]

        const buttons2 = [
            <BoxButton key="b3[0][0]" name="save" onClick={() => this.reorderData()} title="Guardar crédito" classCSS="info" />,
        ]

        const { tabs, tab } = this.state;

        switch (param) {
            case 0:
                return (
                    <Modal title="Gestionar crédito" buttons={buttons} brand={true} >
                        <AddCredito action={this.actionToogleSidebarRigth} />
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
                        <RenovarCredito />
                    </Modal>
                )
            case 3:
                return (
                    <Modal title="Reordenar clientes" buttons={buttons2} brand={true} >
                        <DnDListadoClientes />
                    </Modal>
                )
            default:
                return null;
        }
    }


    render() {
        const { ids, list, rutas, cartera, idRuta } = this.props;
        var today = moment((new Date())).format('YYYY-MM-DD');

        const buttons = [
            <BoxButton key="br[0][0]" name="plus" onClick={() => this.createAction()} title="Agregar crédito" classCSS="info" disabled={idRuta != null ? false : true} />,
            <BoxButton key="br[0][1]" name="exchange-alt" onClick={() => this.actionClickReorder()} title="Enrutar" classCSS="info" disabled={idRuta != null ? false : true} />,
            <BoxButton key="br[0][2]" name="save" onClick={() => this.saveAbonos()} title="Guardar abonos" classCSS="info" disabled={idRuta != null ? false : true} />,
            <BoxButton key="br[0][3]" name="file-pdf" onClick={() => exportDataGrid(list)} title="Exportar ruta" classCSS="info" disabled={idRuta != null ? false : true} />,
        ]



        return (
            <div className="card border-left-success">
                <BrandButton buttons={buttons} />
                <div className="row" style={{ marginBottom: 5, background: '#f7f7f7', marginLeft: 0, marginRight: 0, paddingBottom: 5 }}>
                    <div className="col-md-4">
                        <label >Ruta</label>
                        <SelectComponent options={rutas.toJS()} onChange={this.onChangeSelect} />
                    </div>
                    <div className="col-md-4">
                        <label >Fecha</label>
                        <input className="form-control form-control-sm" type="date" value={today} readOnly ></input>
                    </div>
                    <div className="col-md-4">
                        <label >Cartera</label>
                        <input className="form-control form-control-sm" type="text" value={cartera} readOnly disabled ></input>
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
                            <AddClientes />
                        </div>
                        : null
                }
                {this.renderSwitch(this.state.tipoModal)}
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
        idRuta: state.rutas.get('idRuta'),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getListRutas: () => dispatch(getListRutas()),
        getCreditos: (id) => dispatch(getCreditos(id)),
        selectAction: (id, reloadGrid, tipo) => dispatch(selectAction(id, reloadGrid, tipo)),
        changeAttr2: (tipo, id, attr, value) => dispatch(changeAttr2(tipo, id, attr, value)),
        toggleModal: () => dispatch(toggleModal()),
        newRow: (tipo) => dispatch(newRow(tipo)),
        saveCredito: () => dispatch(saveCredito()),
        saveAbonos: (entrada, salida) => dispatch(saveAbonos(entrada, salida)),
        saveRenovacion: (id) => dispatch(saveRenovacion(id)),
        cleanCliente: () => dispatch(cleanCliente()),
        cleanDataRutas: () => dispatch(cleanDataRutas()),
        reorderData: () => dispatch(reorderData()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Rutas)