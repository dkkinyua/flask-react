import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const SignUp = () => {

    const {register, watch, handleSubmit, formState:{errors}} = useForm();

    const submitForm = (data) => {
        console.log(data)
    }

    // console.log(watch("username"))

    return (
        <div className="container mt-3">
            <div className="form">
                <h1>
                    Sign Up Here.
                </h1>
                <Form>
                    <Form.Group className="mb-2">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type='text' placeholder="Username" {...register("username", {required:true, maxLength:20})} />
                        {errors.username && <span className="errors">Username is required</span>}
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label >Email Address:</Form.Label>
                        <Form.Control type='email' placeholder="Your Email Address" {...register("email", {required:true, maxLength:50})} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                        {errors.email && <span className="errors">Email is required</span>}
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type='password' placeholder="Password" {...register("password", {required:true, minLength:8})} />
                        {errors.password && <span className="errors">Password is required.</span>}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="mb-2">Confirm Password:</Form.Label>
                        <Form.Control type='password' placeholder="Confirm your password." {...register("confirmPassword", {required:true, minLength:8})} />
                        {errors.confirmPassword && <span className="errors">This field is required.</span>}
                    </Form.Group>
                    <Form.Group>
                        <Button as="sub" variant="primary" className="mt-2" onClick={handleSubmit(submitForm)}>
                            Sign Up
                        </Button>
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <small>Have an account? <Link to='/login'>Login.</Link></small>
                    </Form.Group>
                </Form>
            </div>
        </div>
    )
}

export default SignUp