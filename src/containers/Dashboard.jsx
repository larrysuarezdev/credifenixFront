import React, { Component } from 'react';
import { connect } from 'react-redux'
import numeral from 'numeral'

//UI
import Nuevos from '../components/Dashboard/Nuevos'
import Renovados from '../components/Dashboard/Renovados'

import { getNewClientes } from '../actions/dashboard'

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.changeTab = this.changeTab.bind(this);

    this.state = {
      tabs: [
        { id: 0, caption: 'Nuevos', component: <Nuevos />, active: true },
        { id: 1, caption: 'Renovados', component: <Renovados />, active: false },
      ],
      tab: 0
    };
  }
  componentWillMount() {
    this.props.getNewClientes();
  }

  changeTab(tab) {
    let tabs = this.state.tabs.map(x => {
      x.active = false;
      return x;
    })

    tabs[tabs.findIndex(x => x.id === tab.id)].active = true

    this.setState({ tabs, tab: tab.id });
  }

  render() {
    const { cantNew, cantRen } = this.props;
    const { tabs, tab } = this.state;

    return (
      <div className="row">
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="col-md-12 ">
            <div className="card border-left-primary shadow h-100 ">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Clientes nuevos en el mes</div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">{cantNew}</div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 py-2">
            <div className="card border-left-info shadow h-100 ">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Clientes renovados en el mes</div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">{cantRen}</div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-retweet fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-9 col-md-9">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-success">Clientes en el último mes</h6>
            </div>
            {/* <ul className="nav nav-tabs nav-justified" id="myTab" role="tablist">
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
            </ul> */}
            <div className="tab-content">
              <div className="tab-pane fade show active" style={{ minHeight: 'calc(100vh - 255px)' }}>
                {tabs[tab].component}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    clientesNew: state.dashboard.get('clientesNew'),
    cantNew: state.dashboard.get('cantNew'),
    cantRen: state.dashboard.get('cantRen'),
    label1: state.dashboard.get('label1'),
    label2: state.dashboard.get('label2'),
    dataSET_N: state.dashboard.get('data_N'),
    dataSET_R: state.dashboard.get('data_R')
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getNewClientes: () => dispatch(getNewClientes()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)