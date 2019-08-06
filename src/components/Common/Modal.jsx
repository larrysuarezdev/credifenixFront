import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Modal as ModalB, ModalHeader, ModalBody } from 'reactstrap';
import BrandButton from './BrandButton'

import { toggleModal } from '../../actions/common'

class Modal extends Component {
    render() {
        return (
            <ModalB isOpen={this.props.modal} toggle={this.props.toggleModal} className={this.props.className} centered={true} >
                <ModalHeader toggle={this.props.toggleModal}>{this.props.title}</ModalHeader>
                {
                    this.props.brand ? <BrandButton buttons={this.props.buttons} /> : null
                }
                <ModalBody>
                    {
                        this.props.children
                    }
                </ModalBody>
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