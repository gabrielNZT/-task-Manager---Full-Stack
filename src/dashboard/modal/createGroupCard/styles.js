import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


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

    const [title, setTitle] = useState(state.current !== undefined ? state.current.title : '');
    const [description, setDescription] = useState(state.current !== undefined ? state.current.description : '');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({ type: 'UPDATE_GROUP_CARD', payload: { title, description } });
    }

    const handleDelete = () => {
        dispatch({ type: 'DELETE_GROUP_CARD' });
    }


    return <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
            <Modal.Title>Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Nome</Form.Label>
                <Form.Control onChange={event => setTitle(event.target.value)}
                    type="text"
                    name='title'
                    value={title}
                    required
                    placeholder="exemplo: Task 1"
                />
            </Form.Group>
            <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
            >
                <Form.Label>Descrição</Form.Label>
                <Form.Control as="textarea" rows={3} onChange={event => setDescription(event.target.value)}
                    type='text'
                    name='description'
                    value={description}
                    placeholder='exemplo: Reunião com o DR. Paulo no dia 10/08'
                />
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" style={{ background: '#FF0000' }} onClick={handleDelete}>
                Deletar
            </Button>
            <Button id='buttonNewCard' variant="primary" type='submit'>
                Salvar
            </Button>
        </Modal.Footer>
    </Form>
})

export default CreateGroupCard;