import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { Button, Container, Col, Row, Modal } from 'react-bootstrap'
import { useAuth } from "../auth";

import Recipe from "./recipe";



const Home = () => {

    const LoggedInHome = () => {
        const [recipes, setRecipes] = useState([])
        const [show, setShow] = useState()

        useEffect(
            () => {
                fetch("recipe/recipes")
                    .then(r => r.json())
                    .then(data => {
                        setRecipes(data)
                    })
            }, []
        )

        const closeModal = () => setShow(false)
        const openModal = () => setShow(true)

        return (
            <div className="container mt-3">
                <Modal show={show} size='lg' onHide={closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Recipe</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Updaate your recipe here.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeModal}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={closeModal}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
                {
                    recipes.map(
                        (recipes) => (
                            <Recipe title={recipes.title} description={recipes.title} onClick={openModal} />
                        )
                    )
                }
            </div>
        )
    }

    const LoggedOutHome = () => {
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
    const [logged] = useAuth()
    return (
        <Container>
            {logged ? <LoggedInHome /> : <LoggedOutHome />}
        </Container>
    )
}

export default Home

