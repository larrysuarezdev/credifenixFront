import React, { Component } from 'react';
import { connect } from 'react-redux'
import moment from 'moment'

//UI
import BrandButton from '../../components/Common/BrandButton'
import BoxButton from '../../components/Common/BoxButtonV2'
import Modal from '../../components/Common/Modal'
import TableVirtualized from '../../components/Common/TableVirtualized2'
import SelectComponent from '../../components/Common/SelectComponent';
import AddCredito from '../../components/Cobros/Rutas/AddCredito'
import DetallesPagos from '../../components/Cobros/Rutas/DetallesPagos'


import { getCreditos, saveCredito, getListRutas, saveAbonos } from '../../actions/rutas'
import { selectAction, changeAttr2, toggleModal, newRow } from '../../actions/common'

class Rutas extends Component {
    constructor(props) {
        super(props);
        this.changeAction = this.changeAction.bind(this);
        this.actionClick = this.actionClick.bind(this);
        this.createAction = this.createAction.bind(this);
        this.onChangeSelect = this.onChangeSelect.bind(this);

        this.state = {
            tableColumns: [
                { ID: 0, CAPTION: '', VALUE: 'eye', TYPE: 'BUTTON', FORMAT: '', WIDTH: 30, FIXED: true },
                { ID: 1, CAPTION: '#Cliente', VALUE: 'orden', TYPE: 'NUMBER', FORMAT: '', WIDTH: 80, FIXED: true, EDIT: false },
                { ID: 2, CAPTION: 'Cliente', VALUE: 'cliente.titular', TYPE: 'VARCHAR2', FORMAT: '', WIDTH: 200, FIXED: true, EDIT: false },
                { ID: 3, CAPTION: 'Cuota', VALUE: 'cuota', TYPE: 'NUMBER', FORMAT: '', WIDTH: 70, FIXED: true, EDIT: true },
                { ID: 4, CAPTION: 'Mora', VALUE: 'mora', TYPE: 'NUMBER', FORMAT: '', WIDTH: 50, FIXED: false, EDIT: false },
                { ID: 5, CAPTION: 'PAG', VALUE: 'cuotas_pagas', TYPE: 'NUMBER', FORMAT: '', WIDTH: 50, FIXED: false, EDIT: false },
                { ID: 6, CAPTION: 'Prestamo', VALUE: 'valor_prestamo', TYPE: 'NUMBER', FORMAT: '', WIDTH: 100, FIXED: true },
                { ID: 7, CAPTION: 'MOD cuota', VALUE: 'mod_cuota', TYPE: 'NUMBER', FORMAT: '', WIDTH: 100, FIXED: false, EDIT: false },
                { ID: 8, CAPTION: 'MOD días', VALUE: 'mod_dias', TYPE: 'NUMBER', FORMAT: '', WIDTH: 100, FIXED: false, EDIT: false },
                { ID: 9, CAPTION: 'Valor total', VALUE: 'valor_total', TYPE: 'NUMBER', FORMAT: '', WIDTH: 100, FIXED: false },
                { ID: 10, CAPTION: 'Saldo', VALUE: 'saldo', TYPE: 'NUMBER', FORMAT: '', WIDTH: 100, FIXED: false },
                { ID: 11, CAPTION: 'Ultimo pago', VALUE: 'valor_ultimo_pago', TYPE: 'NUMBER', FORMAT: '', WIDTH: 100, FIXED: false },
                { ID: 12, CAPTION: 'Fecha ult pago', VALUE: 'fecha_ultimo_pago', TYPE: 'DATE', FORMAT: 'YYYY-MM-DD', WIDTH: 120, FIXED: false },
                { ID: 13, CAPTION: 'Inicio', VALUE: 'inicio_credito', TYPE: 'DATE', FORMAT: 'YYYY-MM-DD', WIDTH: 120, FIXED: false },
                { ID: 14, CAPTION: 'Negocio', VALUE: 'cliente.neg_titular', TYPE: 'VARCHAR2', FORMAT: '', WIDTH: 200, FIXED: false },
                { ID: 15, CAPTION: 'Direccion', VALUE: 'cliente.dir_cobro', TYPE: 'VARCHAR2', FORMAT: '', WIDTH: 200, FIXED: false },
                { ID: 16, CAPTION: 'Telefono', VALUE: 'cliente.tel_cobro', TYPE: 'VARCHAR2', FORMAT: '', WIDTH: 100, FIXED: false },
                { ID: 17, CAPTION: 'Fiador', VALUE: 'cliente.fiador', TYPE: 'VARCHAR2', FORMAT: '', WIDTH: 200, FIXED: false },
                { ID: 18, CAPTION: 'Telefono', VALUE: 'cliente.tel_fiador', TYPE: 'VARCHAR2', FORMAT: '', WIDTH: 100, FIXED: false },
            ],
            tipoModal: 0
        }
    }

    componentWillMount() {
        this.props.getListRutas();
    }

    createAction() {
        this.setState({ tipoModal: 0 })
        this.props.newRow("RUTA");
        this.props.toggleModal()
    }

    changeAction(tipo, id, attr, value) {
        this.props.changeAttr2(tipo, id, attr, value)
    }

    actionClick() {
        this.setState({ tipoModal: 1 })
        this.props.toggleModal();
    }

    onChangeSelect(id) {
        this.props.getCreditos(id);
    }

    render() {
        const { ids, list, selected, selectAction, rutas, cartera } = this.props;
        const tipo = "RUTA";
        var today = moment((new Date())).format('YYYY-MM-DD');

        const buttons = [
            <BoxButton key="br[0][0]" name="plus" onClick={() => this.createAction()} title="Agregar crédito" classCSS="info" />,
            <BoxButton key="br[0][1]" name="save" onClick={() => this.props.saveAbonos()} title="Guardar abonos" classCSS="info" />,
        ]

        const buttons1 = [
            <BoxButton key="b1[0][0]" name="save" onClick={() => this.props.saveCredito()} title="Guardar crédito" classCSS="info" />,
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
                        <input className="form-control form-control-sm" type="date" max={today} ></input>
                    </div>
                    <div className="col-md-4">
                        <label >Cartera</label>
                        <input className="form-control form-control-sm" type="text" value={cartera} readOnly disabled ></input>
                    </div>
                </div>
                <div className="col-md-12 col-xs-12" style={{ padding: 0 }} >
                    <div style={{ height: "calc(100vh - 255px)", maxHeight: "calc(100vh - 255px)" }}>
                        <TableVirtualized
                            tableColumns={this.state.tableColumns}
                            ids={ids}
                            list={list}
                            keyVal="id"
                            actionSelect={selectAction}
                            selected={selected}
                            tipo={tipo}
                            onChange={this.changeAction}
                            actionClick={this.actionClick}
                        />
                    </div>
                </div>
                {
                    this.state.tipoModal === 0 ?
                        <Modal title="Gestionar crédito" buttons={buttons1} >
                            <AddCredito />
                        </Modal>
                        :
                        <Modal title="Detalle de abonos al credito"  >
                            <DetallesPagos />
                        </Modal>

                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        list: state.rutas.get('list'),
        ids: state.rutas.get('ids'),
        selected: state.rutas.get('selected'),
        rutas: state.rutas.get('rutas'),
        cartera: state.rutas.get('cartera'),
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
        saveAbonos: () => dispatch(saveAbonos()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Rutas)