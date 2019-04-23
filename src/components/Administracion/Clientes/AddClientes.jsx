import React, { Component } from 'react';
import { connect } from 'react-redux'

// UI
import Card from '../../Common/Card'
import BoxButton from '../../Common/BoxButton'

class AddClientes extends Component {
    render() {
        const buttons = [
            <BoxButton key="bb[0][0]" name="plus" onClick={() => console.log('debe agregar')} title="Agregar referencia" classCSS="info" />,
        ]

        return (
            <div className="col-md-12 col-xl-12">
                <Card text="Información básica">
                    <div className="row">
                        <div className="col-md-4">
                            <label >Fecha</label>
                            <input className="form-control form-control-sm" type="date" ></input>
                        </div>
                        <div className="col-md-4">
                            <label >Modalidad</label>
                            <input className="form-control form-control-sm" type="text" ></input>
                        </div>
                        <div className="col-md-4">
                            <label >Adelanto</label>
                            <input className="form-control form-control-sm" type="number" ></input>
                        </div>
                    </div>

                    <hr></hr>

                    <div className="row">
                        <div className="col-md-4">
                            <label >Titular</label>
                            <input className="form-control form-control-sm" type="text" ></input>
                        </div>
                        <div className="col-md-2">
                            <label >Identificación</label>
                            <input className="form-control form-control-sm" type="text" ></input>
                        </div>
                        <div className="col-md-4">
                            <label >Fiador</label>
                            <input className="form-control form-control-sm" type="text"></input>
                        </div>
                        <div className="col-md-2">
                            <label >Identificación</label>
                            <input className="form-control form-control-sm" type="text" ></input>
                        </div>

                        <div className="col-md-6">
                            <label >Negocio titular</label>
                            <input className="form-control form-control-sm" type="text" ></input>
                        </div>
                        <div className="col-md-6">
                            <label >Negocio fiador</label>
                            <input className="form-control form-control-sm" type="text" ></input>
                        </div>
                    </div>

                    <hr></hr>

                    <div className="row">
                        <div className="col-md-4">
                            <label >Dirección de cobro </label>
                            <input className="form-control form-control-sm" type="text" ></input>
                        </div>
                        <div className="col-md-4">
                            <label >Barrio </label>
                            <input className="form-control form-control-sm" type="text" ></input>
                        </div>
                        <div className="col-md-4">
                            <label >Telefono </label>
                            <input className="form-control form-control-sm" type="text" ></input>
                        </div>

                        <div className="col-md-4">
                            <label >Dirección de casa </label>
                            <input className="form-control form-control-sm" type="text" ></input>
                        </div>
                        <div className="col-md-4">
                            <label >Barrio </label>
                            <input className="form-control form-control-sm" type="text" ></input>
                        </div>
                        <div className="col-md-4">
                            <label >Telefono </label>
                            <input className="form-control form-control-sm" type="text" ></input>
                        </div>
                        <hr></hr>
                        <div className="col-md-4">
                            <label >Dirección de fiador </label>
                            <input className="form-control form-control-sm" type="text" ></input>
                        </div>
                        <div className="col-md-4">
                            <label >Barrio </label>
                            <input className="form-control form-control-sm" type="text" ></input>
                        </div>
                        <div className="col-md-4">
                            <label >Telefono </label>
                            <input className="form-control form-control-sm" type="text" ></input>
                        </div>
                    </div>
                </Card>

                <div className="row">
                    <div className="col-md-6 col-xs-12">
                        <Card text="Referencias del titular" buttons={buttons} >
                            <div className="row col-md-12">
                                <table className="table table-sm">
                                    <thead>
                                        <tr>
                                            <th scope="col">Nombre</th>
                                            <th scope="col">Direccion</th>
                                            <th scope="col">Barrio</th>
                                            <th scope="col">Telefono</th>
                                            <th scope="col">Parentesco</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                            <td>@mdo1</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                            <td>@fat</td>
                                            <td>@fat1</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td>Larry</td>
                                            <td>Bird</td>
                                            <td>@twitter</td>
                                            <td>@twitter1</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </div>

                    <div className="col-md-6 col-xs-12">
                        <Card text="Referencias del fiador" buttons={buttons}>
                            <div className="row col-md-12">
                                <table className="table table-sm">
                                    <thead>
                                        <tr>
                                            <th scope="col">Nombre</th>
                                            <th scope="col">Direccion</th>
                                            <th scope="col">Barrio</th>
                                            <th scope="col">Telefono</th>
                                            <th scope="col">Parentesco</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                            <td>@mdo1</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                            <td>@fat</td>
                                            <td>@fat1</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td>Larry</td>
                                            <td>Bird</td>
                                            <td>@twitter</td>
                                            <td>@twitter1</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </div>
                </div>

                <div className="float-right">
                    <a className="btn btn-success btn-icon-split"  >
                        <span className="icon text-white-50">
                            <i className="fas fa-save"></i>
                        </span>
                        <span className="text">Guardar</span>
                    </a>
                    <div className="my-3"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddClientes)