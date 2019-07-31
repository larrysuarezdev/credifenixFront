import React, { Component } from 'react'

// UI
// import FontAwesome from 'react-fontawesome'
import DataGrid from './DataGrid'

export default class ListaDetalles extends Component {

    render() {
        const { list, ids, editable } = this.props
        return (
            <div>
                {
                    editable ?
                        <DataGrid
                            rows={list}
                            ids={ids}
                            changeAction={this.props.changeAction}
                        />
                        :
                        <ul className="list-group">
                            <div key="0" className="list-group-item d-flex justify-content-between align-items-center list-group-item-action">
                                <span>Id</span>
                                <div>
                                    Valor
                                </div>
                            </div>
                            {
                                list !== null ?
                                    list.valueSeq().map((item, index) => {
                                        return (
                                            <div key={index} className="list-group-item d-flex justify-content-between align-items-center list-group-item-action">
                                                <span className="badge badge-primary badge-pill">{item.get('id_interno')}</span>
                                                <div>
                                                    {item.get('valor')}
                                                </div>
                                            </div>
                                        )
                                    })
                                    : null
                            }
                        </ul>
                }
            </div>



        )
    }
}