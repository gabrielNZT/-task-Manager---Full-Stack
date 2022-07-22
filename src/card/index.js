import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function Task(props) {
  const { item, onEdit, onDelete } = props;
  
  const [name, setName] = useState(item.name || '');
  const [description, setDescription] = useState(item.description || '');
 
  const [show, setShow] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    onEdit({ id: item.id, name, description});
    handleClose();
  }

  const handleDelete = ()=> {
    onDelete(item);
    handleClose();
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (

    <>
      <Button style={{ border: '2px solid #795244', marginTop: 15, cursor: 'pointer', background: '#FFF', color: 'GrayText', fontSize: '20px', textAlign: 'left', height: '5rem' }} variant="primary" onClick={handleShow}>
        {item.name}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Card</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nome</Form.Label>
              <Form.Control onChange={event => setName(event.target.value)}
                type="text"
                name='name'
                value={name}
                placeholder="exemplo: Task 1"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>descrição</Form.Label>
              <Form.Control as="textarea" rows={3} onChange={event => setDescription(event.target.value)}
                type='text'
                name='description'
                value={description}
                placeholder='exemplo: Reunião com o DR. Paulo no dia 10/08'
                autoFocus
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" style={{background: '#FF0000'}} onClick={handleDelete}>
              Delete
            </Button>
            <Button id='buttonNewCard' variant="primary" type='submit'>
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default Task;