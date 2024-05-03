import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { login } from '../auth'

const Login = () => {

    const {register, handleSubmit, reset, watch, formState:{ errors }} = useForm()
    const [serverResponse, setServerResponse] = useState("")
    const [show, setShow] = useState()

    const loginForm = (data) => {

        const requestOptions = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        }

        fetch("/auth/login", requestOptions)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setServerResponse(data.access_token)
            login(data.access_token)
        })
        console.log("Logged in.")
        reset()
    }

    return (
        <div className="container mt-3">
            <div className="form">
                <h1>
                    Log in Page.
                </h1>
                <Form>
                    <Form.Group className="mb-2">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type='text' placeholder="Username"
                         {...register('username', {required:true, maxLength:25})}
                          />
                        {errors.username && errors.username.type === "required" && <span className="errors">Username is required</span>}
                        <br/>
                        {errors.username && errors.username.type === "maxLength" && <span className="errors">Maximum characters reached: 25</span>}
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type='password' placeholder="Password"
                        {...register("password", {required:true, minLength:8})}
                        />
                        {errors.password && errors.password.type === "required" && <span className="errors">Password is required</span>}
                        <br/>
                        {errors.password && errors.password.type == "required" && <span className="errors">Minimum characters required: 8</span>}
                    </Form.Group>
                    <Form.Group>
                        <Button as="sub" variant="primary" className="mt-2" onClick={handleSubmit(loginForm)}>
                            Log In
                        </Button>
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <small>Don't have an account? <Link to="/signup">Create an account</Link></small>
                    </Form.Group>
                </Form>
            </div>
        </div>
    )
}

export default Login