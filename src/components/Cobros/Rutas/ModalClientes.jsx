import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Modal as ModalB, ModalHeader, ModalBody } from 'reactstrap';

// UI
import BoxButton from '../../Common/BoxButtonV2'
import { toggleModalClientes } from '../../../actions/common'
import { getClientes, selectCliente } from '../../../actions/rutas'

class ModalClientes extends Component {

    constructor(props){
        super(props);

        this.state = {
            filter : ''
        };
    }

    componentDidMount() {
        this.props.getClientes();
    }

    selectCliente(id) {
        this.props.selectCliente(id);
        this.props.toggleModalClientes();
    }

    render() {
        const { clientes } = this.props;
        const filter = this.state == undefined ? '' : this.state.filter;

        console.log(this.state, filter)
        return (
            <ModalB isOpen={this.props.modal} toggle={this.props.toggleModalClientes} className={this.props.className} centered={true} scrollable="true" style={{ width: 450 }}  >
                <ModalHeader toggle={this.props.toggleModalClientes}>Clientes</ModalHeader>
                <div style={{ backgroundColor: '#dddfeb', padding: '10px 10px 0px 10px' }}>
                    <div className="form-group has-search">
                        <span className="fa fa-search form-control-feedback"></span>
                        <input type="text" className="form-control form-control-sm" onChange={(e) => this.setState({ filter : e.target.value })} placeholder="Buscar" />
                    </div>
                </div>
                <ModalBody style={{ maxHeight: 350, overflowY: 'auto' }}>
                    <table className="table table-bordered table-striped table-hover table-sm">
                        <thead>
                            <tr>
                                <th style={{ width: "30%" }}>Documento</th>
                                <th style={{ width: "60%" }}>Nombre</th>
                                <th style={{ width: "10%" }} align="center"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                clientes.filter(function(x){ return x.get('titular').toUpperCase().indexOf(filter.toUpperCase())>-1}).sortBy(x => x.get('id')).valueSeq().map((x) => {
                                    return (
                                        <tr key={x.get('id')} onDoubleClick={() => this.selectCliente(x.get('id'))}>
                                            <td>{x.get('cc_titular')}</td>
                                            <td>{x.get('titular')}</td>
                                            <td align="center">
                                                <BoxButton key="bp[0][0]" name="check" onClick={() => this.selectCliente(x.get('id'))} title="Seleccionar" classCSS="info" />
                                            </td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </ModalBody>
            </ModalB>
        )
    }
}

function mapStateToProps(state) {
    return {
        modal: state.common.get('modalClientes'),
        clientes: state.rutas.get('clientes'),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        toggleModalClientes: () => dispatch(toggleModalClientes()),
        getClientes: () => dispatch(getClientes()),
        selectCliente: (id) => dispatch(selectCliente(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalClientes)