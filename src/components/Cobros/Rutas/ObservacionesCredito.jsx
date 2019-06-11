import React, { Component } from 'react';
import { connect } from 'react-redux'

//UI

class ObservacionesCredito extends Component {

    // componentDidMount() {
    //     this.props.getDetallesRuta();
    // }

    render() {
        const { selectRow } = this.props;
        const tipo = "RUTA"
        
        return (
            <div style={{ height : 'calc(100vh - 500px)', marginTop: 15 }}>
                <div className="col-md-12">
                    <textarea className="form-control form-control-sm" id="observaciones" rows="3" value={selectRow.get('observaciones') === null ? "" : selectRow.get('observaciones')} 
                        // onChange={(e) => changeAttr(tipo, 'observaciones', e.target.value)}
                    ></textarea>                    
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        selectRow: state.rutas.getIn(['list', String(state.rutas.get('selected'))]),
        // selected: state.rutas.get('detalle_selected'),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        // getDetallesRuta: () => dispatch(getDetallesRuta()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ObservacionesCredito)