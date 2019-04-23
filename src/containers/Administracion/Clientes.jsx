import React, { Component } from 'react';
import { connect } from 'react-redux'

//UI
import GridClientes from '../../components/Administracion/Clientes/GridClientes'
import AddClientes from '../../components/Administracion/Clientes/AddClientes'

class Clientes extends Component {
  constructor() {
    super();
    this.state = {
      tabs: [
        { id: 0, caption: 'Listado clientes', component: <GridClientes />, active: true },
        { id: 1, caption: 'Agregar - Modificar', component: <AddClientes />, active: false },
      ],
      selected: 0
    };
  }

  changeTab(tab) {
    let tabs = this.state.tabs.map(x => {
      x.active = false;
      return x;
    })

    tabs[tabs.findIndex(x => x.id === tab.id)].active = true

    this.setState({ tabs, selected: tab.id });
  }

  render() {
    const { tabs, selected } = this.state;
    // console.log(tabs, tabs[selected].component, selected)

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
                  <li key={`li01[${x.id}]`} className={x.active ? "nav-item active" : "nav-item"}>
                    <a
                      data-toggle="tab" href="#"
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
          <div className="tab-content" >
            <div className="tab-pane fade show active" style={{ minHeight: 'calc(100vh - 255px)', paddingTop: '10px' }}>
              {tabs[selected].component}
            </div>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Clientes)