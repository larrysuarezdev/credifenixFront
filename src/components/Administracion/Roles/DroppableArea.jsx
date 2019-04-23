import React, { Component } from 'react'

import { addClass, removeClass } from '../../../utils/helpers'

export default class DroppableArea extends Component {
    handleDragEnter = (e) => {
        addClass(e.target, 'draggingover')
    }

    handleDragLeave = (e) => {
        removeClass(e.target, 'draggingover')
    }

    handleDragOverArea = (e) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = "move"
    }

    render() {
        const { children, onDrop } = this.props

        return (
            <div className="droppable" style={{ fontSize: '0.9em', fontWeight: '100' }} onDragOver={ (e) => this.handleDragOverArea(e) } onDragEnter={ (e) => this.handleDragEnter(e) } onDragLeave={ (e) => this.handleDragLeave(e) } onDrop={ onDrop }>
                { children }
            </div>
        )
    }
}