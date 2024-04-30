import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true)

    const toggleNavBar = () => {
        setIsNavbarCollapsed(!isNavbarCollapsed)
    }
    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="#">Blooog</Link>
                <button className="navbar-toggler" type="button" onClick={toggleNavBar}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${isNavbarCollapsed ? '' : 'show'}`} id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="#">Home</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="#">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">Signup</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">Create Recipe</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">Logout</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar