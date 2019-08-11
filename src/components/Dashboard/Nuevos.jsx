import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Line } from 'react-chartjs-2';

class Nuevos extends Component {

    render() {
        const { label, dataSET } = this.props;
        console.log(label, dataSET);
        const data = {
            labels: label,
            datasets: [
              {
                label: 'Nuevos',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(78,122,130,0.4)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(78,122,130,0.4)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(78,122,130,0.4)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: dataSET
              }
            ]
          };

        return (
            <Line ref="chart" data={data} />            
        )
    }
}

function mapStateToProps(state) {
    return {
      label: state.dashboard.get('label1'),
      dataSET: state.dashboard.get('data_N'),
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return {
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Nuevos)