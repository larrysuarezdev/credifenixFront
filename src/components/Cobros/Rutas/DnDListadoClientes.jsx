import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { reorderList } from '../../../actions/rutas'

const COLOR = window.COLORDND;

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

const grid = 4;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    margin: `0 0 ${grid}px 0`,
    border: `1px solid ${COLOR}`,
    background: isDragging ? "lightgreen" : COLOR,
    color: '#fff',
    fontSize: 13,
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "#eaeaea" : "#fff",
    width: '100%'
});

class DnDListadoClientes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: this.props.list
        };
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(
            this.state.items,
            result.source.index,
            result.destination.index
        );

        this.setState({
            items
        });

        var data = this.state.items;
        console.log(data)
        var from = Number(result.source.index);
        var to = Number(result.destination.index);
        if (from < to) to--;
        data.splice(to, 0, data.splice(from, 1)[0]);
        data.map((item, i) => {
            item.NewOrden = i + 1;
            return item
        })
        // this.setState({ list: data });
        this.props.reorderList(data);
    }

    render() {
        console.log(COLOR);
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >
                            {
                                this.state.items.map((item, index) =>
                                    // console.log(item)
                                    (
                                        <Draggable key={item.orden} draggableId={String(item.orden)} index={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={getItemStyle(
                                                        snapshot.isDragging,
                                                        provided.draggableProps.style
                                                    )}
                                                >
                                                    <span className="badge badge-pill badge-light">{index + 1}</span> |
                                                    <span className="badge badge-pill badge-dark" style={{ marginLeft: 4 }}>{item.orden}</span> -
                                                    <span style={{ marginLeft: 4 }}>{item.cliente.titular}</span>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))
                            }
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );
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
export default connect(mapStateToProps, mapDispatchToProps)(DnDListadoClientes)