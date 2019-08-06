import React from 'react'

export default function(props) {
    const { children } = props

    return (
        <div className="modal-footer">
            { children }
        </div>
    )
}