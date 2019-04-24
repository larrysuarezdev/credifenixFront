import React, { Component } from 'react'

export default class BrandButton extends Component {

    render() {

        return (
            <div className="button-brand">
                <div className="middle">
                    <div className="inner">
                       {
                           this.props.buttons
                       }
                    </div>
                </div>
            </div>
        )
    }
}