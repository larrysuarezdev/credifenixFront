import React, { Component } from 'react'

// UI
// import FontAwesome from 'react-fontawesome'

export default class ListaDetalles extends Component {

    render() {
        const { list } = this.props

        return (
            <ul className="list-group">
                {
                    list !== null ?
                        list.valueSeq().map((item, index) => {
                            return (
                                <div key={index}>
                                    {
                                        item.get('id_interno')
                                    }
                                    -
                                    {
                                        item.get('valor')
                                    }
                                </div>
                            )
                        })
                        : null
                }
            </ul>
        )
    }
}