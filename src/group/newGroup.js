import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function NewGroup() {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    
  }
  
  const handleShow = () => setShow(true);

  return (
    <>
      <Button style={{marginRight: 20 ,marginLeft: 30,marginTop: 20, color: '#1876d2', background: '#e7e7e7', border: '2px solid black', fontSize: '20px', fontWeight: '700', height: '4rem', width: '14rem', textAlign: 'left'}} variant="primary"  onClick={handleShow}>
        Novo Grupo +
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Novo Grupo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="exemplo: Task 1"
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NewGroup;