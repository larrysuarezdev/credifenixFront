import React, { Component } from 'react'

export default class Navbar extends Component {
    constructor(props) {
        super(props);

        this.DropDown = this.DropDown.bind(this);

        this.state = {
            dropDown: false
        };
    }

    DropDown() {
        console.log(this.state)
        this.setState({
            dropDown: !this.state.dropDown
        });
    }

    render() {
        return (
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                {/* <!-- Sidebar Toggle (Topbar) --> */}
                <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                    <i className="fa fa-bars"></i>
                </button>

                {/* <nav aria-label="breadcrumb"> */}
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="#">Inicio</a></li>
                        {
                            this.props.renderBreadCrumb()
                        }
                    </ol>
                {/* </nav> */}

                {/* <!-- Topbar Navbar --> */}
                <ul className="navbar-nav ml-auto">
                    <div className="topbar-divider d-none d-sm-block"></div>

                    {/* <!-- Nav Item - User Information --> */}
                    <li className="nav-item dropdown no-arrow">
                        <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={() => this.DropDown()}>
                            <span className="mr-2 d-none d-lg-inline text-gray-600 small"> {this.props.user ? this.props.user.nombres + ' ' + this.props.user.apellidos : ''} </span>
                            <img className="img-profile rounded-circle" src="https://source.unsplash.com/QAB-WJcbgJk/60x60" />
                        </a>
                        {/* <!-- Dropdown - User Information --> */}
                        <div className={`dropdown-menu dropdown-menu-right shadow animated--grow-in ${this.state.dropDown ? 'show' : ''} `} aria-labelledby="userDropdown">
                            {/* <a className="dropdown-item" href="#">
                                <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                                Settings
                            </a> */}
                            {/* <div className="dropdown-divider"></div> */}
                            <a className="dropdown-item" onClick={() => this.props.signOut()}>
                                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                Cerrar sesión
                            </a>
                        </div>
                    </li>
                </ul>
            </nav>
        )
    }
}
