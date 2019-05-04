import React, { Component } from 'react';
import { connect } from 'react-redux'

//UI
import SelectorInput from '../../Common/SelectorInput'
import ModalClientes from '../../Cobros/Rutas/ModalClientes'
// import Modal from '../../components/Common/Modal'
// import TableVirtualized from '../../components/Common/TableVirtualized2'
// import SelectComponent from '../../components/Common/SelectComponent';

// import { getRutas } from '../../actions/rutas'
import { changeAttr, toggleModalClientes } from '../../../actions/common'

class AddCredito extends Component {

    

    render() {
        const { selectRow, changeAttr } = this.props;
        const tipo = "RUTA"

        return (
            <div className="row">
                <div className="col-md-7">
                    <label >Cliente</label>
                    <SelectorInput
                        value={selectRow.getIn(['cliente', 'titular'])}
                        onClick={() =>  this.props.toggleModalClientes() } />
                    {/* <input className="form-control form-control-sm" type="text" value={ selectRow.get('cliente') } ></input> */}
                </div>
                <div className="col-md-5"></div>
                <div className="col-md-6">
                    <label >Fecha del crédito</label>
                    <input className="form-control form-control-sm" type="date" value={selectRow.get('fecha')} onChange={(e) => changeAttr(tipo, 'fecha', e.target.value)} />
                </div>
                <div className="col-md-6">
                    <label >Valor a prestar</label>
                    <input className="form-control form-control-sm" type="number" value={selectRow.get('prestamo')} onChange={(e) => changeAttr(tipo, 'prestamo', e.target.value)} />
                </div>
                <div className="col-md-4">
                    <label >Cuota</label>
                    <input className="form-control form-control-sm" type="number" value={selectRow.get('cuota')} onChange={(e) => changeAttr(tipo, 'cuota', e.target.value)} />
                </div>
                <div className="col-md-4">
                    <label >Dias</label>
                    <input className="form-control form-control-sm" type="number" value={selectRow.get('dias')} onChange={(e) => changeAttr(tipo, 'dias', e.target.value)} />
                </div>
                <div className="col-md-4">
                    <label >Valor total</label>
                    <input className="form-control form-control-sm" type="number" value={selectRow.get('cuota') * selectRow.get('dias')} readOnly disabled ></input>
                </div>
                <ModalClientes />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        selectRow: state.rutas.get('selectRow'),
        // list: state.rutas.get('list'),
        // ids: state.rutas.get('ids'),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        // getRutas: () => dispatch(getRutas()),
        // selectAction: (id, reloadGrid, tipo) => dispatch(selectAction(id, reloadGrid, tipo)),
        changeAttr: (tipo, attr, value) => dispatch(changeAttr(tipo, attr, value)),
        toggleModalClientes: () => dispatch(toggleModalClientes()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCredito)