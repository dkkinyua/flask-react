import React from "react";
import { Link } from 'react-router-dom'
import { Container, Col, Row, Button } from 'react-bootstrap'

const Home = () => {
    return (
        <Container>
            <Row>
                <Col md={6}>
                    <div className="mt-3">
                        <h1>Welcome to the React Recipes App</h1>
                    </div>
                </Col>
                <Col md={6}>
                    <Link to="/signup"><Button variant="primary">Sign Up</Button></Link>
                    <Link to="/login"><Button variant="primary" className="mx-2">Login Here</Button></Link>
                </Col>
            </Row>
        </Container>

    )
}

export default Home

