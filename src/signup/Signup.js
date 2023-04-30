import { useState } from "react";
import { Button, Container, Nav, Navbar, Modal } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

function Signup() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showModal, setShowModal] = useState(false);

    const clearFormFiels = () => {
        setUsername("");
        setPassword("");
        setEmail("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:8080/totapi/auth/register",
                {
                    username,
                    password,
                    email,
                }
            );

            if (response.status === 201) {
                setShowModal(true);
                clearFormFiels();
            }
            console.log(showModal);
        } catch (error) {
            setErrorMessage("Username or email already exist");
        }
    };



    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="/">Tota App</Navbar.Brand>
                <Container>
                    <Nav className="me-auto my-2 " >
                    </Nav>
                    <Form className="d-flex">
                        <Button
                            className="btnSign"
                            variant="outline-light"
                            onClick={() => navigate("/signup")}
                        >
                            Sign up
                        </Button>
                    </Form>
                </Container>
            </Navbar>

            <Container>
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username" className="form-label">
                            Username:
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
                        <label htmlFor="email:" className="form-label">
                            E-mail
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="form-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Button type="submit" className="form-button">
                            Sign-up
                        </Button>
                    </form>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </div>
            </Container>

            <Modal className="mmoda" show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton bg="dark">
                    <Modal.Title>Registration Successful</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You have successfully registered. Please proceed to the login page. Big ass
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => navigate("/")}>
                        Go to Login
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Signup;
