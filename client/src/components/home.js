import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Button, Container, Col, Row, Modal, Form } from 'react-bootstrap';
import { useAuth } from "../auth";
import { useForm } from "react-hook-form";
import Recipe from "./recipe";


const Home = () => {

    const LoggedInHome = () => {
        const [recipes, setRecipes] = useState([]);
        const [show, setShow] = useState(false);
        const { register, handleSubmit, formState: { errors }, setValue } = useForm();
        const [recipeId, setRecipeId] = useState(0);
        const token = localStorage.getItem("REACT_TOKEN_AUTH_KEY");
    
        useEffect(() => {
            fetch("recipe/recipes")
                .then(r => r.json())
                .then(data => {
                    setRecipes(data);
                });
        }, []);
    
        const getAllRecipes = () => {
            fetch("recipe/recipes")
                .then(r => r.json())
                .then(data => {
                    setRecipes(data);
                });
        };
    
        const closeModal = () => setShow(false);
        const openModal = (id) => {
            setShow(true);
            setRecipeId(id);
    
            recipes.forEach((recipe) => {
                if (recipe.id === id) {
                    setValue("title", recipe.title);
                    setValue("description", recipe.description);
                }
            });
        };
    
        const updateRecipe = (data) => {
            const reload = window.location.reload();
            const requestOptions = {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ${JSON.parse(token)}`
                },
                body: JSON.stringify(data)
            };
    
            fetch(`/recipe/recipe/${recipeId}`, requestOptions)
                .then(r => r.json())
                .then(data => {
                    console.log(data);
                    reload();
                })
                .catch(e => console.log(data));
        };
    
        const deleteRecipe = (id) => {
            const requestOptions = {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ${JSON.parse(token)}`
                }
            };
    
            fetch(`/recipe/recipe/${id}`, requestOptions)
                .then(r => r.json())
                .then(data => {
                    getAllRecipes();
                })
                .catch(e => console.log(e));
        };
    

        return (
            <div className="container mt-3">

                <Modal show={show} size='lg' onHide={closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Recipe</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Recipe's title</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Recipe's Title"
                                    {...register("title", { required: true })}
                                />
                                {errors.title && errors.title.type === "required" && (
                                    <span className="errors">This field is required</span>
                                )}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Recipe's content</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    placeholder="Recipe's Content"
                                    {...register("description", { required: true })}
                                    style={{ minHeight: "50px", padding: "8px" }}
                                />
                                {errors.description && errors.description.type === "required" && (
                                    <span className="errors">This field is required</span>
                                )}
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeModal}>
                            Close
                        </Button>
                        <Button as="sub" variant="success" onClick={handleSubmit(updateRecipe)}>Update</Button>
                    </Modal.Footer>
                </Modal>

                    {
                        recipes.map(
                            (recipes, index) => (
                                <Recipe key={index} title={recipes.title} description={recipes.description} onClick={() => openModal(recipes.id)} onClickDelete={() => deleteRecipe(recipes.id)} />
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

