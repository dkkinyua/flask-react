import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-bord-tertiary navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to='/'>Recipes App</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" to='/create-recipe'>Create Recipe</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to='/signup'>Sign Up</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to='/login'>Log In</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active">Log Out</Link>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                            <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default NavBar