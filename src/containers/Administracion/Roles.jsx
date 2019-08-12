import React, { Component } from 'react';
import { connect } from 'react-redux'

//UI
import Card from '../../components/Common/Card'
import DroppableArea from '../../components/Administracion/Roles/DroppableArea'
import DraggableItem from '../../components/Administracion/Roles/DraggableItem'
// import BoxButton from '../../components/Common/BoxButton'


import { addClass, removeClass } from '../../utils/helpers'
import { getPermisoByRol, changePermision } from '../../actions/roles'


class Roles extends Component {

    handleDragStart = (e, item, origin) => {
        addClass(e.target, 'dragging')
        const obj = JSON.stringify({ item, origin })
        e.dataTransfer.setData("text", obj)
        e.dataTransfer.effectAllowed = "move"
    }

    handleDrop = (e, destination) => {
        e.preventDefault()
        removeClass(e.target, 'draggingover')
        const obj = JSON.parse(e.dataTransfer.getData("text"))
        const origin = obj.origin
        const item = obj.item;
        this.props.changePermision(item)
    }

    handleDropOnItem = (e, itemover, destination) => {
        e.preventDefault()
        removeClass(e.target, 'draggingoveritem')
        // const obj = JSON.parse(e.dataTransfer.getData("text"))
        // const origin = obj.origin
        // const item = obj.item
        // this.props.relocateItemToNewPosition(origin, destination, item, itemover)
        e.stopPropagation()
    }

    render() {
        const { vistas, selected, getPermisoByRol } = this.props;
        // const buttons = [
        //   <BoxButton key="bb[0][0]" name="plus" onClick={() => console.log('debe agregar')} title="Agregar referencia" classCSS="info" />,
        // ]

        return (
            <div className="row">
                <div className="col-md-12 col-xs-12">
                    <Card text="Asignación de permisos"  >
                        <div className="col-md-3">
                            <div className="form-group">
                                <label>Seleccione el rol...</label>
                                <select className="form-control form-control-sm" id="exampleFormControlSelect1" onChange={(e) => getPermisoByRol(e.target.value)}>
                                    <option value="0">Seleccione...</option>
                                    <option value="1">Administrador</option>
                                    <option value="2">Supervisor</option>
                                    <option value="3">Empleado</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Vistas disponibles</label>
                                    <DroppableArea fillPage onDrop={(e) => this.handleDrop(e, 0)} >
                                        {
                                            vistas.filter(x => x.get('ver') === false).map((item, index) => {
                                                return (
                                                    <DraggableItem key={`div0[${item.get('pantalla')}]`} onDragStart={(e) => { this.handleDragStart(e, item.get('pantalla'), 0) }} onDrop={(e) => { this.handleDropOnItem(e, item.get('pantalla'), 0) }} caption={item.get('pantalla')} selected={selected === item.get('pantalla')} />
                                                )
                                            })
                                        }
                                    </DroppableArea>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Vistas a las que tiene permiso el rol</label>
                                    <DroppableArea fillPage onDrop={(e) => this.handleDrop(e, 0)} >
                                        {
                                            vistas.filter(x => x.get('ver') === true).map((item, index) => {
                                                return (
                                                    <DraggableItem key={`div1[${item.get('pantalla')}]`} onDragStart={(e) => { this.handleDragStart(e, item.get('pantalla'), 0) }} onDrop={(e) => { this.handleDropOnItem(e, item.get('pantalla'), 0) }} caption={item.get('pantalla')}  selected={selected === item.get('pantalla')} />
                                                )
                                            })
                                        }
                                    </DroppableArea>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        vistas: state.roles.get('list'),
        selected: state.roles.get('selected'),
    }

}

function mapDispatchToProps(dispatch) {
    return {        
        getPermisoByRol: (id) => dispatch(getPermisoByRol(id)),
        changePermision: (vista) => dispatch(changePermision(vista)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Roles)