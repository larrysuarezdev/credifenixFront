import React, { Component } from 'react';
import { connect } from 'react-redux'
import numeral from 'numeral'
import { Line } from 'react-chartjs-2';

//UI
// import Card from '../../components/Common/Card'
// import BoxButton from '../../components/Common/BoxButton'

import { getNewClientes } from '../actions/dashboard'

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

  componentWillMount() {
    this.props.getNewClientes();
  }

  render() {
    const { clientesNew } = this.props;
    const dataset1 = [1, 3]
    const data = {
      chart: {
        labels: ["Lunes", "Martes"],
        datasets: [
          {
            type: 'line',
            yAxisID: 'yAxis1',
            label: "20/02/13",
            borderColor: "rgba(174, 100, 217, 1)",
            backgroundColor: "rgba(174, 100, 217, 0.2)",
            borderWidth: 2,
            data: dataset1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          labels: {
            fontSize: 10
          }
        },
        // title: {
        //   display: true,
        //   text: "Comparación del impacto al costo"
        // },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              // labelString: 'Instrucción'
            },
            ticks: {
              fontSize: 10
            }
          }],
          yAxes: [
            {
              id: "yAxis1",
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Costos instrucción'
              },
              ticks: {
                fontSize: 10,
              }
            }
          ]
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              var datasetLabel = data.datasets[tooltipItem.datasetIndex].label || ''
              return datasetLabel + ': ' + numeral(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]).format('0,0')
            }
          }
        }
      }
    }
    return (
      <div className="row">
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="col-md-12 ">
            <div className="card border-left-primary shadow h-100 ">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Clientes nuevos en el mes</div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">{clientesNew}</div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 py-2">
            <div className="card border-left-primary shadow h-100 ">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Clientes renovados en el mes</div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">{clientesNew}</div>
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
              <h6 className="m-0 font-weight-bold text-success">Clientes en la ultima semana</h6>
            </div>
            <Line data={data} />
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    clientesNew: state.dashboard.get('clientesNew'),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getNewClientes: () => dispatch(getNewClientes()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)