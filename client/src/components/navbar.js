import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth, logout } from "../auth";

const NavBar = () => {
    const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true)

    const toggleNavBar = () => {
        setIsNavbarCollapsed(!isNavbarCollapsed)
    }

    const LoggedInLinks = () => {
        return (
            <>
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="create-recipe">Create Recipe</Link>
                </li>
                <li className="nav-item">
                    <a className="nav-link" to="#" onClick={() => {logout()}}>Logout</a>
                </li>
            </>
        )
    }

    const LoggedOutLinks = () => {
        return (
            <>
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/signup">Signup</Link>
                </li>
            </>
        )
    }

    const [logged] = useAuth()

    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Recipes App</Link>
                <button className="navbar-toggler" type="button" onClick={toggleNavBar}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${isNavbarCollapsed ? '' : 'show'}`} id="navbarNav">
                    <ul className="navbar-nav me-auto">
                    </ul>
                    <ul className="navbar-nav">
                        {logged ? <LoggedInLinks/> : <LoggedOutLinks/>}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar