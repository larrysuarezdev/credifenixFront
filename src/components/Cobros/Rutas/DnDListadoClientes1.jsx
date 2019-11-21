import React, { Component } from 'react'
import { connect } from 'react-redux'

import { reorderList } from '../../../actions/rutas'

var placeholder = document.createElement("li");
placeholder.className = "placeholder";

class DnDListadoClientes1 extends Component {
    constructor(props) {
        super(props);
        this.state = { ...props };
    }

    dragStart(e) {
        this.dragged = e.currentTarget;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.dragged);
    }

    dragEnd(e) {
        this.dragged.style.display = 'block';
        this.dragged.parentNode.removeChild(placeholder);

        // update state
        var data = this.props.list;
        var from = Number(this.dragged.dataset.id);
        var to = Number(this.over.dataset.id);
        if (from < to) to--;
        data.splice(to, 0, data.splice(from, 1)[0]);
        data.map((item, i) => {
            item.NewOrden = i + 1;
            return item
        })
        this.setState({ list: data });
        this.props.reorderList(data);
    }

    dragOver(e) {
        e.preventDefault();
        this.dragged.style.display = "none";
        if (e.target.className === 'placeholder') return;
        this.over = e.target;
        e.target.parentNode.insertBefore(placeholder, e.target);
    }

    render() {
        var listItems = this.state.list.map((item, i) => {
            return (
                <li
                    className="list-group-item"
                    data-id={i}
                    key={i}
                    draggable='true'
                    onDragEnd={this.dragEnd.bind(this)}
                    onDragStart={this.dragStart.bind(this)}
                >

                    {i + 1} | {item.orden} - {item.cliente.titular}
                </li>
            )
        });

        return (
            <ul onDragOver={this.dragOver.bind(this)} className="list-group list-group-flush" >
                {listItems}
            </ul>
        )
    }
}

function mapStateToProps(state) {
    return {
        list: state.rutas.get('reorder'),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        reorderList: (list) => dispatch(reorderList(list)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DnDListadoClientes1)