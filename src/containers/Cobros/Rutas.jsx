import React, { Component } from 'react';
import { connect } from 'react-redux'

//UI
import Card from '../../components/Common/Card'
// import BoxButton from '../../components/Common/BoxButton'
import TableVirtualized from '../../components/Common/TableVirtualized'

export const tableColumns = [
    { ID: 0, CAPTION: '', VALUE: '', TYPE: '', FORMAT: '', WIDTH: 30, FIXED: true },
    { ID: 1, CAPTION: 'Nombre', VALUE: 'Nombre', TYPE: 'VARCHAR2', FORMAT: '', WIDTH: 300, FIXED: true },
    { ID: 2, CAPTION: 'Descripción', VALUE: 'Descripcion', TYPE: 'VARCHAR2', FORMAT: '', WIDTH: 350, FIXED: false },
    // { ID: 3, CAPTION: 'Estado', VALUE: 'Estado_Visible', TYPE: 'BOOLEAN', FORMAT: '', WIDTH: 150, FIXED: false },
]

class Rutas extends Component {
    constructor() {
        super();
        this.state = {
            clientes : [
                { id_cliente : 1, Nombre : 'Nombre 1', Descripcion : 'Desc 1'   }
            ],
            ids : []
        };
    }

    select(){
        console.log('Hola');
    }

    render() {
        // const { ids, list }
        // const buttons = [
        //   <BoxButton key="bb[0][0]" name="plus" onClick={() => console.log('debe agregar')} title="Agregar referencia" classCSS="info" />,
        // ]

        return (
            <div className="row">
                <div className="col-md-12 col-xs-12" >
                    <Card text="Gestión de rutas" >
                        <TableVirtualized
                            tableColumns={tableColumns}
                            ids={this.state.ids}
                            list={this.state.clientes}
                            keyVal="id"
                            actionSelect={this.select}
                            selected={1}
                        />
                    </Card>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Rutas)