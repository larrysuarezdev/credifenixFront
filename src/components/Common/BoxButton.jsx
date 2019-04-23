import React, { Component } from 'react'

export default class BoxButton extends Component {
    
	render() {
        const { classCSS } = this.props;
        const disabled = (this.props.disabled === true)
        const onClick = (disabled) ? null : this.props.onClick
        const { size } = this.props

        let styleButton = {...this.props.style || {}}
        styleButton.marginRight = '5px'
        
        let styleI = {}
        if (size) {
            styleButton.lineHeight = `${size}px`
            styleI.fontSize = `${size}px`
        }
        
		return (
            <button className={ `btn btn-${ classCSS ? classCSS : 'secondary' } btn-circle btn-sm ${ disabled ? 'disabled' : ''} ${this.props.dropdown ? 'dropped' : ''} ` } onClick={ onClick } title={ this.props.title } style={ styleButton }>
                <i className={ `fa fa-${this.props.name}` } style={ styleI } />
            </button>
		)
	}
}