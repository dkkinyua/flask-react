import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { Container, Col, Row, Button } from 'react-bootstrap'
import { useAuth } from "../auth";

import Recipe from "./recipe";



const Home = () => {

    const LoggedInHome = () => {
        const [recipes, setRecipes] = useState([])

        useEffect(
            () => {
                fetch("recipe/recipes")
                    .then(r => r.json())
                    .then(data => {
                        console.log(data)
                        setRecipes(data)
                    })
                    .catch(e => console.log(e))
            }, []
        )
        return (
            <div className="container mt-3">
                {
                recipes.map(
                    (recipes) => (
                        <Recipe title={recipes.title} description={recipes.title}/>
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

