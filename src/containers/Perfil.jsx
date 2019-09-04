import React, { Component } from 'react';
import { connect } from 'react-redux'
import userImg from '../img/user.png'
import Card from '../components/Common/Card'

import { changePassword } from '../actions/auth'

class Perfil extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cPassword: false,
            password: ""
        };
    }

    render() {
        const { user, rol } = this.props;
        console.log(user, rol)
        return (
            <div className="row">
                <div className="col-md-4 justify-content-center text-center">
                    <img src={userImg} className="rounded-circle" alt="Usuario" />
                    <h4 style={{ marginTop: 5 }}>{user.username}</h4>
                    <a className="btn btn-success btn-icon-split" href="#" onClick={() => this.setState({ cPassword: !this.state.cPassword })}>
                        <span className="icon text-white-50">
                            <i className="fas fa-unlock-alt"></i>
                        </span>
                        <span className="text">Modificar contraseña</span>
                    </a>
                </div>
                <div className="col-md-8">
                    <Card text="Información del usuario" >
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Nombres</label>
                                    <input type="text" className="form-control" id="nombres" value={user.nombres} readOnly />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Email</label>
                                    <input type="text" className="form-control" id="email" value={user.email} readOnly />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Telefono2</label>
                                    <input type="number" className="form-control" id="telefono2" value={user.telefono2} readOnly />
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Apellidos</label>
                                    <input type="text" className="form-control" id="apellidos" value={user.apellidos} readOnly />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Telefono1</label>
                                    <input type="number" className="form-control" id="telefono1" value={user.telefono1} readOnly />
                                </div>
                                {
                                    this.state.cPassword ?
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Contraseña</label>
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="Nueva contraseña" onChange={(e) => this.setState({ password: e.target.value })} />
                                                <div className="input-group-append">
                                                    <button className="btn btn-success" type="button" onClick={() => this.props.changePassword(this.state.password)}>Guardar</button>
                                                </div>
                                            </div>
                                        </div>
                                        : null
                                }
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.auth.user,
        rol: state.auth.rol,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changePassword: (pass) => dispatch(changePassword(pass)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Perfil)