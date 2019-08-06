import React from 'react'

export default function (props) {
    const { title, onClose } = props

    return (
        <div className="modal-header" style={{ cursor: 'move' }}>
            <h4 className="modal-title">{title}</h4>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onClose}><span aria-hidden="true">&times;</span></button>
        </div>
    )
}