import React, { Component } from 'react';
import { connect } from 'react-redux'

//UI
// import Card from '../../components/Common/Card'
// import BoxButton from '../../components/Common/BoxButton'

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {

    return (
      <div className="row">
        Hola!
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)