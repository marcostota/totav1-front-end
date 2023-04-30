import React, { useState } from "react";
import { Button, Container, Nav, Navbar, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import "./dashboard.css";
import { useNavigate } from "react-router-dom";
import withAuth from "../security/wirhAuth";

function Dashboard() {
    const navigate = useNavigate();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogout = () => {
        // Delete token from local storage
        localStorage.removeItem("token");
        navigate("/");
    }

    const handleClose = () => setShowLogoutModal(false);
    const handleShow = () => setShowLogoutModal(true);

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="/dashboard">Tota App</Navbar.Brand>
                <Container>
                    <Nav className="me-auto my-2 " >
                    </Nav>
                    <Form className="d-flex">
                        <Button
                            className="btnSign"
                            variant="outline-light"
                            onClick={handleShow}
                        >
                            Logout
                        </Button>
                    </Form>
                </Container>
            </Navbar>

            <Container>
                <Nav className="flex-column">
                    <Nav.Item>
                        <Nav.Link as={Link} to="/dashboard">
                            Home
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to="/services">
                            Services
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to="/contact">
                            Contact
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </Container>

            <Modal show={showLogoutModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to logout?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleLogout}>
                        Logout
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default withAuth(Dashboard);
