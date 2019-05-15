import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Sidebar extends Component {

    render() {
        const { sidebarItems, toggle, isOpen, onClick } = this.props;
        return (
            <ul className={isOpen ? "navbar-nav bg-gradient-fenix sidebar sidebar-dark accordion" : "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled"} id="accordionSidebar">
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
                    <div className="sidebar-brand-icon rotate-n-15">
                        {/* <i className="fas fa-laugh-wink"></i> */}
                        <i className="fab fa-earlybirds"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3"> <sup>CREDI </sup> FENIX </div>
                </a>

                <hr className="sidebar-divider my-0" />

                <li className="nav-item active">
                    <a className="nav-link" href="/">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Inicio</span>
                    </a>
                </li>

                <hr className="sidebar-divider" />

                <div className="sidebar-heading">
                    Módulos
                </div>
                {
                    sidebarItems.map((item, ind) => {
                        return (
                            <li className="nav-item" key={ind} onClick={(e) => onClick(e, item.caption)} >
                                <a className={!item.isOpen ? "nav-link collapsed" : "nav-link"} data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo" >
                                    <i className={`fas fa-fw fa-${item.icon}`} ></i>
                                    <span>{item.caption}</span>
                                </a>
                                <div id="collapseTwo" className={!item.isOpen ? "collapse" : "collapse show"} aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                                    <div className="bg-white py-2 collapse-inner rounded">
                                        {
                                            item.subitems.map((subitems, index) => {
                                                return (
                                                    <Link key={`[0][${index}}]`} className="collapse-item" onClick={(e) => onClick(e, subitems.caption)} to={subitems.url}>
                                                        <i className={`fas fa-fw fa-${subitems.icon}`} style={{ marginRight : 5}} ></i>
                                                        {subitems.caption}
                                                    </Link>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </li>
                        )
                    })
                }

                <hr className="sidebar-divider d-none d-md-block" />

                <div className="text-center d-none d-md-inline">
                    <button className="rounded-circle border-0" id="sidebarToggle" onClick={toggle}></button>
                </div>
            </ul>
        )
    }
}
