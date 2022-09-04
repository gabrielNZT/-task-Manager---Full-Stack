import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import api from '../../../service/api';
import headers from '../../../service/security/header.js';


const CreateGroupCard = (props) => {
    const { dispatch, visible } = props;


    const onClose = () => {
        dispatch({ type: 'HIDE_MODAL' });
    }

    return <Modal show={visible} onHide={onClose}>
        <ModalContent {...props} />
    </Modal>;
}


const ModalContent = React.memo((props) => {
    const { dispatch, state } = props;
    const [title, setTitle] = useState('');

    const handleSubmit = (e) => {
        const index = state.groups.length;
        e.preventDefault();
        api
        .post("/api/grupo", {
            header: title,
            position: index,
            cards: [],
        }, {headers: headers()})
        .then((response) => dispatch({ type: 'ADD_GROUP', payload: response.data}));

        //dispatch({ type: 'ADD_GROUP', payload: { id: Math.floor(Math.random() * 10000), title, order, cards: [] } });
    }

    const handleOnChange = e => {
        setTitle(e.target.value);
    }

    return <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
            <Modal.Title>Nome</Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                    onChange={handleOnChange}
                    type="text"
                    name='header'
                    placeholder="exemplo: grupo de tarefas"
                    value={title}
                    autoFocus
                    required
                />
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" type="submit">
                Salvar
            </Button>
        </Modal.Footer>
    </Form>
})

export default CreateGroupCard;