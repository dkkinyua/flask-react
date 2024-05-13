import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Alert, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

const CreateRecipe = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const [show, setShow] = useState()

    const submitRecipe = (data) => {
        const token = localStorage.getItem("REACT_TOKEN_AUTH_KEY")

        const body = {
            title: data.title,
            description: data.description
        }

        const requestOptions = {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${JSON.parse(token)}`
            },
            body: JSON.stringify(body)
        }

        fetch("/recipe/recipes", requestOptions)
            .then(r => r.json())
            .then(data => {
                setShow(true)
                reset()
            })
    }

    return (
        <Container>
            {show ?
                <>
                    <Alert variant="success" onClose={() => setShow(false)} dismissible>
                        <Alert.Heading><h6>Your recipe has been posted.</h6></Alert.Heading>
                    </Alert>
                    <h2>
                        Create a recipe here.
                    </h2>
                </>
                :
                <h2>
                    Create a recipe here.
                </h2>
            }
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
                        style={{ minHeight: "100px", padding: "8px" }}
                    />
                    {errors.description && errors.description.type === "required" && (
                        <span className="errors">This field is required</span>
                    )}
                </Form.Group>

                <Button className="mt-2" as="sub" variant="success" onClick={handleSubmit(submitRecipe)}>Submit Recipe</Button>
            </Form>
        </Container>
    )
}

export default CreateRecipe