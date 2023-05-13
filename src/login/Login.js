import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

import Form from 'react-bootstrap/Form';


function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");




    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:8080/totapi/auth/login",
                {
                    username,
                    password,
                }
            );

            const token = response.data.token;
            localStorage.setItem("token", token);

            try {
                await axios.get("http://localhost:8080/totapi/auth/verifyTokenExpiration", {
                    headers: {
                        Authorization: `${token}`,
                    },
                });
                navigate("/");
            } catch (error) {
                setErrorMessage("Token verification failed");

            }
        } catch (error) {
            setErrorMessage("Check your credentials");
        }
    };

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="/login">Tota App</Navbar.Brand>
                <Container  >
                    <Nav
                        className="me-auto my-2 " >
                    </Nav>
                    <Form className="d-flex">
                        <Button className="btnSign" variant="outline-light" onClick={() => navigate("/signup")}>Sign up</Button>
                    </Form>
                </Container>
            </Navbar>

            <Container>
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username" className="form-label">
                            Usernamess:
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="form-input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <label htmlFor="password" className="form-label">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button type="submit" className="form-button">
                            Login
                        </Button>
                    </form>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </div>
            </Container>
        </>
    );
}

export default Login;
