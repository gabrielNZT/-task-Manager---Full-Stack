import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function NewGroup(props) {
  const [show, setShow] = useState(false);
  const [input, setInput] = useState('');

  const handleClose = () => {
    setShow(false);
    
  }
  const handleOnChange = e => {
    setInput(e.target.value);
  }

  const handleOnSubmit = e => {
       e.preventDefault();
       
       props.onSubmit({
        id: Math.floor(Math.random() * 10000),  
        header: input
       });
       
       setInput('');
       handleClose();
  }
  
  const handleShow = () => setShow(true);

  return (
    <>
      <Button style={{marginRight: 20 ,marginLeft: 30,marginTop: 20, color: '#1876d2', background: '#e7e7e7', border: '2px solid black', fontSize: '20px', fontWeight: '700', height: '4rem', width: '14rem', textAlign: 'left'}} variant="primary"  onClick={handleShow}>
        Novo Grupo +
      </Button>

      <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleOnSubmit}>
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
                value={input}
                autoFocus
                required
              />
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default NewGroup;