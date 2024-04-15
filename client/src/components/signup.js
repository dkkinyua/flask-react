import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap';

const SignUp = () => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const submitForm = () => {
        console.log("Form Submitted sucessfully!")
        setUsername("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")
    }


    return (
        <div className="container mt-3">
            <div className="form">
                <h1>
                    Sign Up Here.
                </h1>
                <Form>
                    <Form.Group className="mb-2">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type='text' placeholder="Username" value={username} name="username" onChange={(e) => { setUsername(e.target.value) }} />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label >Email Address:</Form.Label>
                        <Form.Control type='email' placeholder="Your Email Address" value={email} name="email" onChange={(e) => { setEmail(e.target.value) }} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type='password' placeholder="Password" value={password} name="password" onChange={(e) => { setPassword(e.target.value) }} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="mb-2">Confirm Password:</Form.Label>
                        <Form.Control type='password' placeholder="Confirm your password." value={confirmPassword} name="confirmPassword" onChange={(e) => { setConfirmPassword(e.target.value) }} />
                    </Form.Group>
                    <Form.Group>
                        <Button as="sub" variant="primary" className="mt-2" onClick={submitForm}>
                            Sign Up
                        </Button>
                    </Form.Group>
                </Form>
            </div>
        </div>
    )
}

export default SignUp