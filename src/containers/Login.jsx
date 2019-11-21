import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn } from '../actions/auth'
import { Cookies } from 'react-cookie';
import FontAwesome from 'react-fontawesome'
import { toast } from 'react-toastify'

import { clearMessage } from '../actions/index'

// import MsgBox from '../components/Layout/MsgBox'

//ui
import '../css/fontawesome-free/css/all.css'
import '../css/fonts.css'
import '../css/sb-admin-2.css'
import '../css/login.css'

import logo from '../img/logo.jpg'
import Fondo from '../img/Fondo.jpg'

const cookie = new Cookies();


class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            signin: false
        }
    }

    componentWillMount() {
        this.props.clearMessage()
        const token = cookie.get('token')
        if (token) {
            this.props.history.push('/')
        }
    }

    onSignIn = (e) => {
        e.preventDefault()
        this.setState({ signin: true })
        const data = { username: this.state.username, password: this.state.password }
        this.props.signIn(data, () => { this.setState({ signin: false }) })
    }

    componentDidUpdate() {
        this.props.clearMessage()
    }

    render() {

        if (this.props.messages) {
            const { messages } = this.props
            switch (messages.type) {
                case 'danger':
                    toast.error(messages.message)
                    break
                case 'warning':
                    toast.warn(messages.message)
                    break
                default:
                    toast.info(messages.message)
            }
        }

        return (
            <div className="SignIn">
                <div style={{ flex: '1', backgroundImage: `url(${Fondo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <div className="cn">
                        <div className="inner font-weight-bold text-primary" style={{ fontSize: '15vh', fontFamily: 'Impact, Charcoal, sans-serif' }}>
                            CREDIFENIX
                        </div>
                    </div>
                </div>

                <div style={{ minWidth: 400, height: '100%', width: '20%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

                    <div className="container d-flex h-100">
                        <div className="row justify-content-center align-self-center">
                            <form onSubmit={this.onSignIn} style={{ padding: 25, width : '100%' }} >
                                <div style={{ textAlign: 'center' }}>
                                    <img src={logo} alt="Logo" />
                                </div>
                                <div style={{ textAlign: 'center', margin: 15, fontSize: 20 }}>
                                    <strong>Bienvenido de vuelta</strong>
                                </div>
                                <div style={{ textAlign: 'center', margin: '10px' }}>
                                    <input className="form-control form-control-sm" type="text" autoComplete="off" name="username" onChange={(e) => this.setState({ username: e.target.value })} placeholder="Nombre de usuario" />
                                </div>
                                <div style={{ textAlign: 'center', margin: '10px', position: 'relative' }}>
                                    <input className="form-control form-control-sm flat" type={this.state.showPwd ? 'text' : 'password'} name="password" onChange={(e) => this.setState({ password: e.target.value })} placeholder="Contraseña" />
                                    <FontAwesome name="eye" onMouseDown={e => this.setState({ showPwd: true })} onMouseUp={e => this.setState({ showPwd: false })} style={{ position: 'absolute', top: '7px', right: '5px' }} />
                                </div>
                                <div style={{ textAlign: 'center', margin: '10px' }}>
                                    <button className="btn btn-success btn-block flat" style={{ padding: '10px' }} type="submit" disabled={this.state.signin}>
                                        {
                                            (this.state.signin) ? <span><FontAwesome name="cog" spin />  Iniciando sesión ...</span> : 'Iniciar sesion'
                                        }
                                    </button>
                                </div>
                            </form>
                            <div className="text-center my-auto">
                                <span style={{ fontSize: '0.8em' }}>&copy; Larry suarez, Software Development 2019</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <MsgBox /> */}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        messages: state.messages.get('message'),
        isAuthenticated: state.auth.isAuthenticated
    }
}

function mapDispatchToProps(dispatch) {
    return {
        signIn: (credentials, callback) => dispatch(signIn(credentials, callback)),
        clearMessage: () => dispatch(clearMessage())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)