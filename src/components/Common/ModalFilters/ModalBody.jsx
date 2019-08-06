import React from 'react'

export default function(props) {
    const { children, style } = props

    return (
        <div className="modal-body" style={style}>
            { children }
        </div>
    )
}