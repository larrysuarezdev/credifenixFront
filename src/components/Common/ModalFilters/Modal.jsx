import React, { Component } from 'react'
import Draggable from 'react-draggable'

export default class ContentEditable extends Component {
    render() {
        const { id, show, children } = this.props
        if(!show) {
            return null
        }

        return (
            <div id={ id } className="modal animated fadeIn" tabIndex="-1" role="dialog" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Draggable handle=".modal-header">
                    <div className="modal-dialog animated zoomIn" role="document" style={{ minWidth: '500px' }}>
                        <div className="modal-content">
                            { children }
                        </div>
                    </div>
                </Draggable>
            </div>
        )
    }
}