import React, { Component } from 'react';
import { connect } from 'react-redux'
import Swal from 'sweetalert2'

//UI
import GridClientes from '../../components/Administracion/Clientes/GridClientes'
import AddClientes from '../../components/Administracion/Clientes/AddClientes'

import { newRow } from '../../actions/common'
import { editCliente, cleanCliente, changeState } from '../../actions/clientes'


class Clientes extends Component {
  constructor(props) {
    super(props);

    this.changeTab = this.changeTab.bind(this);
    this.actionNewRow = this.actionNewRow.bind(this);
    this.actionEditCliente = this.actionEditCliente.bind(this);
    this.actionEstadoCliente = this.actionEstadoCliente.bind(this);

    this.state = {
      tabs: [
        { id: 0, caption: 'Listado clientes', component: <GridClientes actionNewRow={this.actionNewRow} actionEditCliente={this.actionEditCliente} actionEstadoCliente={this.actionEstadoCliente} />, active: true },
        { id: 1, caption: 'Agregar - Modificar', component: <AddClientes showReferencias={true} />, active: false },
      ],
      tab: 0
    };
  }

  changeTab(tab) {
    if (this.props.selectRow !== null) {
      let tabs = this.state.tabs.map(x => {
        x.active = false;
        return x;
      })

      tabs[tabs.findIndex(x => x.id === tab.id)].active = true
      if (tab.id === 0) {
        this.props.cleanCliente();
      }

      this.setState({ tabs, tab: tab.id });
    }
  }

  actionNewRow(tipo) {
    let tabs = this.state.tabs.map(x => {
      x.active = false;
      return x;
    })

    this.props.newRow(tipo)
    tabs[tabs.findIndex(x => x.id === 1)].active = true
    this.setState({ tabs, tab: 1 });
  }

  actionEditCliente(id) {
    this.props.editCliente(id);

    let tabs = this.state.tabs.map(x => {
      x.active = false;
      return x;
    })
    tabs[tabs.findIndex(x => x.id === 1)].active = true
    this.setState({ tabs, tab: 1 });
  }

  actionEstadoCliente(id) {
    Swal.fire({
      title: 'ESTA SEGURO QUE QUIERE CAMBIAR EL ESTADO AL CLIENTE?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar cambios'
    }).then((result) => {
      if (result.value) {
        this.props.changeState(id);
      }
    })
  }

  render() {
    const { tabs, tab } = this.state;

    return (
      <div className="col-xl-12 col-lg-12">
        <div className="card shadow mb-4">
          <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-success">Gestión de clientes</h6>
          </div>
          <ul className="nav nav-tabs nav-justified" id="myTab" role="tablist">
            {
              tabs.map(x => {
                return (
                  <li key={`li01[${x.id}]`} className={x.active ? "nav-item active" : "nav-item"} >
                    <a
                      data-toggle="tab"
                      aria-expanded={x.active ? "true" : "false"}
                      onClick={(e) => this.changeTab(x)}
                      className="nav-link"
                    >
                      {x.caption}
                    </a>
                  </li>
                )
              })
            }
          </ul>
          <div className="tab-content">
            <div className="tab-pane fade show active" style={{ minHeight: 'calc(100vh - 255px)' }}>
              {tabs[tab].component}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    selectRow: state.clientes.get('selectRow'),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    newRow: (tipo) => dispatch(newRow(tipo)),
    editCliente: (id) => dispatch(editCliente(id)),
    changeState: (id) => dispatch(changeState(id)),
    cleanCliente: () => dispatch(cleanCliente()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Clientes)