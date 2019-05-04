import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Modal as ModalB, ModalHeader, ModalBody } from 'reactstrap';

import { toggleModalClientes } from '../../../actions/common'
import { getClientes, selectCliente } from '../../../actions/rutas'

class ModalClientes extends Component {

    componentDidMount() {
        this.props.getClientes();
    }

    selectCliente(id) {
        this.props.selectCliente(id);
        this.props.toggleModalClientes();
    }

    render() {
        const { clientes } = this.props;

        return (
            <ModalB isOpen={this.props.modal} toggle={this.props.toggleModalClientes} className={this.props.className} centered={true} scrollable="true" style={{ width: 450 }}  >
                <ModalHeader toggle={this.props.toggleModalClientes}>Clientes</ModalHeader>
                <div style={{ backgroundColor : '#dddfeb', padding : '10px 10px 0px 10px' }}>
                    <div className="form-group has-search">
                        <span className="fa fa-search form-control-feedback"></span>
                        <input type="text" className="form-control form-control-sm" placeholder="Buscar" />
                    </div>
                </div>
                <ModalBody style={{ maxHeight: 350, overflowY: 'auto' }}>
                    <table className="table table-bordered table-striped table-hover table-sm">
                        <thead>
                            <tr>
                                <th style={{ width: "30%" }}>Documento</th>
                                <th style={{ width: "70%" }}>Nombre</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                clientes.sortBy(x => x.get('id')).valueSeq().map((x) => {
                                    return (
                                        <tr key={x.get('id')} onDoubleClick={() => this.selectCliente(x.get('id'))}>
                                            <td>{x.get('cc_titular')}</td>
                                            <td>{x.get('titular')}</td>
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