import React, { Component } from 'react';

class Dashboard extends Component {

    render() {

        return (
            <div className="text-center">
                <div className="error mx-auto" data-text="404">404</div>
                <p className="lead text-gray-800 mb-5">Pagina no encontrada</p>
                <p className="text-gray-500 mb-0">Parece que metiste el dedo mal ...</p>
                <a href="/">&larr; Regresar al Dashboard</a>
            </div>
        )
    }
}

export default Dashboard