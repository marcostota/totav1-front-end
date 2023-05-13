import React, { useEffect, useState } from "react";
import { Button, Container, Nav, Navbar, Modal, NavDropdown, Row, Col, Card } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import withAuth from "../security/wirhAuth";
import axios from "axios";
import useUserName from "../hooks/userName";
import "./profile.css"


function Profile() {

    const navigate = useNavigate();
    const username = useUserName();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [userData, setUserData] = useState(null);


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

    const handleSave = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/totapi/user/saveUserData", {
                username: username,
                name: name,
                email: email,
                phone: phone
            });

            // Update the user data state with the new data returned from the backend
            setUserData(response.data);

            alert("user data saved succesfully!");
        } catch (error) {
            alert("An error occurred while saving user data.");
        }
    }


    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        };
        axios.get("http://localhost:8080/totapi/user/getUser", config)
            .then(response => {
                const userData = response.data;
                setUserData(userData);
                setName(userData.name);
                setEmail(userData.email);
                setPhone(userData.phone);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);


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

                <Nav className="me-auto my-2" id="nav-dropdown" >
                    <NavDropdown title={useUserName()} >
                        <NavDropdown.Item eventKey="1.1" onClick={handleProfile} >My Profile</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item eventKey="1.2">Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar >


            <Container>
                <Row className="d-flex justify-content-center mt-4 ">
                    <Col md={6}>
                        <Card>
                            <Card.Body>
                                <Form style={{ maxWidth: '500px', margin: 'auto' }}>

                                    <Form.Group controlId="formBasicName">
                                        <Form.Label>FullName</Form.Label>
                                        <Form.Control
                                            type="fullName"
                                            placeholder="Enter your fullname"
                                            value={name === null ? '' : name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter email"
                                            value={email === null ? '' : email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPhonel">
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control
                                            type="phone"
                                            placeholder="Enter Phone"
                                            value={phone === null ? '' : phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </Form.Group>





                                </Form>
                                <Button
                                    className="form-button-profile"
                                    variant="primary"
                                    type="submit"
                                    onClick={handleSave}
                                >
                                    Save
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
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

}

export default withAuth(Profile);