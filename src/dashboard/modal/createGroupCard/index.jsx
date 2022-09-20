import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { postCard } from '../../../service/requests.js';

const EditGroupCard = (props) => {
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

    const [header, setTitle] = useState('');
    const [description, setDescription] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        if (state.current) {
            const position = state.current.cards.length;
            const card = {
                position: position,
                header: header,
                description: description,
                group: state.current.id,
                user: JSON.parse(localStorage.getItem('user')).id
            }
            postCard(card).then(response => dispatch({ type: 'ADD_GROUP_CARD', payload: response.data}) )
        }
    }

    return (<Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
            <Modal.Title>Novo card</Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                    type="text"
                    name='name'
                    value={header}
                    onChange={event => setTitle(event.target.value)}
                    placeholder="Exemplo: Task 1"
                    required
                    autoFocus
                />
            </Form.Group>
            <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
            >
                <Form.Label>Descrição</Form.Label>
                <Form.Control as="textarea" rows={3}
                    type='text'
                    name='description'
                    onChange={event => setDescription(event.target.value)}
                    value={description}
                    placeholder='exemplo: Reunião com o DR. Paulo no dia 10/08'

                />
            </Form.Group>

        </Modal.Body>
        <Modal.Footer>
            <Button id='buttonNewCard' variant="primary" type='submit'>
                Salvar
            </Button>
        </Modal.Footer>
    </Form>)
})

export default EditGroupCard;