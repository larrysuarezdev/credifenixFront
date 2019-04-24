import React, { Component } from 'react';
import { connect } from 'react-redux'

//UI
import Card from '../../components/Common/Card'
import BoxButtonV1 from '../../components/Common/BoxButtonV1'

class Maestras extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    const buttons = [
      <BoxButtonV1 key="bb[0][0]" name="plus" onClick={() => console.log('debe agregar')} title="Agregar referencia" classCSS="info" />,
    ]

    return (
      <div className="row">
        <div className="col-md-6 col-xs-12">
          <Card text="Configuración de parámetros" buttons={buttons} >
        
          </Card>
        </div>

        <div className="col-md-6 col-xs-12">
          <Card text="Detalles de parámetro" buttons={buttons}>
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

export default connect(mapStateToProps, mapDispatchToProps)(Maestras)