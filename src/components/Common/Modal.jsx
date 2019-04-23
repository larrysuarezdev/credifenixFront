import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button, Modal as ModalB, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { toggleModal } from '../../actions/common'

class Modal extends Component {
    render() {
        return (
            <ModalB isOpen={this.props.modal} toggle={this.props.toggleModal} className={this.props.className}  centered={true}  >
                <ModalHeader toggle={this.props.toggleModal}>Gestionar categorias</ModalHeader>
                <div className='buttonstrip'>
                    {
                        this.props.buttons
                    }
                </div>
                <ModalBody>
                    {
                        this.props.children
                    }
                </ModalBody>
                <ModalFooter>
                    <Button className="" color="secondary" onClick={this.props.toggleModal}>Cerrar</Button>
                </ModalFooter>
            </ModalB>
        )
    }
}

function mapStateToProps(state) {
    return {
        modal: state.common.get('modal'),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        toggleModal: () => dispatch(toggleModal()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)