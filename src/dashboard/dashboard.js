import React, { useState } from "react";
import { Button, Container, Nav, Navbar, Modal, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import withAuth from "../security/wirhAuth";
import "./dashboard.css";
import useUserName from "../hooks/userName";

function Dashboard() {
    const navigate = useNavigate();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogout = () => {
        // Delete token from local storage
        localStorage.removeItem("token");
        navigate("/login");
    }

    const handleProfile = () => {
        navigate("/profile");
    }

    const handleClose = () => setShowLogoutModal(false);
    const handleShow = () => setShowLogoutModal(true);

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="/">Tota App</Navbar.Brand>

                <Form className="d-flex">
                    <Button
                        className="btnLogout"
                        variant="outline-light"
                        onClick={handleShow}
                    >
                        Logout
                    </Button>
                </Form>

                <Nav className="ml-auto my-2" id="nav-dropdown">
                    <NavDropdown title={useUserName()}>
                        <NavDropdown.Item eventKey="1.1" onClick={handleProfile}>
                            My Profile
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item eventKey="1.2">Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Nav>

            </Navbar>



            <Container>
                <Nav className="flex-column">
                    <Nav.Item>
                        <Nav.Link as={Link} to="/">
                            Home
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
