import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'

import { addClass, removeClass } from '../../../utils/helpers'

export default class DraggableItem extends Component {
     handleDragEnter = (e) => {
        addClass(e.target, 'draggingoveritem')
    }

    handleDragLeave = (e) => {
        removeClass(e.target, 'draggingoveritem')
    }

    handleDragEnd = (e) => {
        removeClass(e.target, 'dragging')
    }
 
    render() {
        const { onDragStart, caption, onDrop, order, selected, color } = this.props
        let style = {}
        style.color = (!color) ? '#1796D7' : color
        return (
            <div className={ `draggable-item ${selected ? 'selected' : ''}` } id={1} draggable={ true } onDragEnd={ (e) => { this.handleDragEnd(e) } } onDragStart={ onDragStart } onDragEnter={ this.handleDragEnter } onDragLeave={ this.handleDragLeave } onDrop={ onDrop } >
                <span style={{ marginRight: '4px', fontWeight: 'bold' }}>{ order }</span>
                { caption }
                <span style={{ float: 'right' }}><FontAwesome name="square" style={ style } /></span>
            </div>
        )
    }
}