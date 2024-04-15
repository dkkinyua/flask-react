import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap'

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const loginForm = () => {
        console.log("Logged in")

        setUsername("")
        setPassword("")
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
                        <Form.Control type='text' placeholder="Username" value={username} name="username" onChange={(e) => { setUsername(e.target.value) }} />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type='password' placeholder="Password" value={password} name="password" onChange={(e) => { setPassword(e.target.value) }} />
                    </Form.Group>
                    <Form.Group>
                        <Button as="sub" variant="primary" className="mt-2" onClick={loginForm}>
                            Log In
                        </Button>
                    </Form.Group>
                </Form>
            </div>
        </div>
    )
}

export default Login