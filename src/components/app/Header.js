import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'
import Logout from './Logout';

const Header = ({session}) => {
    const elements = session.getUser ? <HeaderAuth/> : <HeaderNoAuth/>
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between d-flex mb-4">
            <div className="container">
                { elements }
            </div>
        </nav>
    )
}

const HeaderNoAuth = () => (
    <h3 className="navbar-brand text-light font-weight-bold">CRM</h3>
)

const HeaderAuth = () => (
    <Fragment>
        <Link to="/" className="navbar-brand text-light font-weight-bold">CRM</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#nav" aria-controls="nav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="nav">
            <ul className="navbar-nav ml-auto text-right">
                <li className="mr-md-2 mb-2 mb-md-0">
                    <Link to="/graphics" className="nav-link btn btn-block btn-success bold ">
                        Graphics
                    </Link>
                </li>
                <li className="nav-item dropdown mr-md-2 mb-2 mb-md-0 pointer">
                    <button className="nav-link dropdown-toggle btn btn-block btn-success bold" data-toggle="dropdown">
                        &ensp;Clients
                            </button>
                    <div className="dropdown-menu" aria-labelledby="navegation">
                        <Link to="/clients" className="dropdown-item">View Clients</Link>
                        <Link to="/client/new" className="dropdown-item">New Client</Link>
                    </div>
                </li>
                <li className="nav-item dropdown pointer">
                    <button className="nav-link dropdown-toggle btn btn-block btn-success bold" data-toggle="dropdown">
                        &ensp;Products
                            </button>
                    <div className="dropdown-menu" aria-labelledby="navegation">
                        <Link to="/products" className="dropdown-item">View Products</Link>
                        <Link to="/product/new" className="dropdown-item">New Product</Link>
                    </div>
                </li>
                <Logout/>
            </ul>
        </div>
    </Fragment>
)

export default Header;