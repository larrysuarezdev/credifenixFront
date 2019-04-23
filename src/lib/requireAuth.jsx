import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { signOut } from '../actions/auth'

export default function (ComposedComponent) {
    class Authentication extends Component {
        static contextTypes = {
            router: PropTypes.object
        }

        componentWillMount() {
            if (!this.props.authenticated) {
                this.context.router.history.push('/login')
                this.props.signOut()
            }
            
            if (!this.props.user) {
                this.context.router.history.push('/login')
                this.props.signOut()
            } else {
                // if (this.props.user.Activo !== 1) {
                //     if (this.props.location.pathname !== '/perfil') {
                //         this.context.router.history.push('/perfil')
                //         document.location.replace('/perfil')
                //     }
                // }
            }
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.authenticated) {
                this.context.router.history.push('/login')
                this.props.signOut()
            }
            if (!nextProps.user) {
                this.context.router.history.push('/login')
                this.props.signOut()
            } else {
                // if (nextProps.user.Activo !== 1) {
                //     if (nextProps.location.pathname !== '/perfil') {
                //         this.context.router.history.push('/perfil')
                //         document.location.replace('/perfil')
                //     }
                // }
            }
        }

        render() {
            return <ComposedComponent {...this.props} />
        }
    }

    function mapStateToProps(state) {
        return {
            authenticated: state.auth.isAuthenticated,
            user: state.auth.user
        }
    }

    const mapDispatchToProps = (dispatch) => {
        return {
            signOut: () => dispatch(signOut()),
        }
    }

    return connect(mapStateToProps, mapDispatchToProps)(Authentication)
}
