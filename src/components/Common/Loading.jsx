import React, { Component } from 'react';
import { connect } from 'react-redux'

class Loading extends Component {
    render() {
        const { modal } = this.props;
        if (!modal) {
            return null
        }

        return (
            <div className="loading-main">
                <span className="textLoading">UN MOMENTO POR FAVOR...</span>

                <div className="spin">
                    <span className="one"></span>
                    <span className="two"></span>
                    <span className="three"></span>                
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        modal: state.common.get('waiting'),
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Loading)