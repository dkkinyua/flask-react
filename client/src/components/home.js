import React from "react";
import { Link } from 'react-router-dom'
import { Container, Col, Row } from 'react-bootstrap'

const Home = () => {
    return (
        <Container>
            <div className="container mt-3">
                <h1>Welcome to the React Recipes App</h1>
                <div className="row mt-3">
                    <div className="col-md-6 d-flex justify-content-center">
                        <Link className='btn btn-primary' to='/signup'>Sign Up Here.</Link>
                    </div>
                    <div className="col-md-6 d-flex justify-content-center">
                        <Link className='btn btn-primary' to='/login'>Login Here.</Link>
                    </div>
                </div>
            </div>
        </Container>

    )
}

export default Home