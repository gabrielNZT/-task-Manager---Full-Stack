import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import api from "../../../service/api.js"
import './style.css'

function RegisterModal(props) {
    const {dispatch} = props;
    const [show, setShow] = useState(false);
    const [user, setUser] = useState();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        api
        .post("/api/user", {
            username: user.username,
            email: user.email,
            password: user.password,
            adm: false,
            enabled: true,
            accountExpired: false,
            accountLocked: false,
            passwordExpired: false
        })
        .then(response => dispatch({type: 'SUBMIT_USER', payload: response.data}))
        .catch(function(error) {
            console.log(error);
        });
    }

    return (
        <>

            <Button className='button-newUser' variant="primary" onClick={handleShow}>
                Novo usuário
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cadastro</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="nome-input">
                            <Form.Label>Nome completo</Form.Label>
                            <Form.Control
                                onChange={event => setUser({...user, name: event.target.value})}
                                type="text"
                                placeholder="Roberto Caldeira Dantas"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="username-input">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                onChange={event => setUser({...user, username: event.target.value})}
                                type="text"
                                placeholder="roberto"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email-input">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                onChange={event => setUser({...user, email: event.target.value})}
                                type="email"
                                placeholder="name@example.com"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password-input">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control
                                onChange={event => setUser({...user, password: event.target.value})}
                                type="password"
                            />
                        </Form.Group>
                        <Modal.Footer>
                            <Button variant="danger" onClick={handleClose}>
                                Fechar
                            </Button>
                            <Button type='submit' variant="success" onClick={handleClose}>
                                Salvar
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default RegisterModal