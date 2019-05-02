import React, { Component } from 'react'

// UI
// import FontAwesome from 'react-fontawesome'

export default class ListaParametros extends Component {

    render() {
        const { list, actionClick } = this.props

        return (
            <ul className="list-group">
                {
                    list.valueSeq().map(item => {
                        return (
                            <li key={item.get('id')} className="list-group-item d-flex justify-content-between align-items-center list-group-item-action"
                                onClick={() => actionClick(item.get('id'))}
                            >
                                <div>
                                    <i className={`fas fa-${item.get('icono')} text-info mx-1`} > </i>
                                    {item.get('nombre')}
                                    {/* {item.get('descripcion')} */}
                                </div>
                                <span className="badge badge-primary badge-pill">{item.get('parametros_detalles').count()}</span>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
}