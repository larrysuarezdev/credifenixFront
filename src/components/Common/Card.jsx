import React, { Component } from 'react'

export default class Card extends Component {

    render() {
        const { text, buttons } = this.props;

        return (
            <div className="card border-left-success mb-3">
                <div className="card-header d-flex flex-row align-items-center justify-content-between">
                    <h6 className="text-xs font-weight-bold text-success text-uppercase mb-2">{text}</h6>
                    <div style={{ marginRight : '-15px' }} >
                        {buttons}
                    </div>
                </div>
                <div className="card-body">
                    {/* <div className="row"> */}
                        {
                            this.props.children
                        }
                    {/* </div> */}
                </div>
            </div>
        )
    }
}