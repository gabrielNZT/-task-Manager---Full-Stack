import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


function NewCard(props) {
  const [show, setShow] = useState(false);
  const [input, setInput] = useState('');
  const [inputDescription, setInputDescription] = useState('');
  

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleChange = e => {
    setInput(e.target.value);
  }

  const handleDescriptionChange = e => {
    setInputDescription(e.target.value);
  }
  
  const handleSubmit = e => {
      e.preventDefault();

      props.onSubmit({
        id: Math.floor(Math.random() * 100000),
        name: input,
        description: inputDescription
      });
    
      setInput('');
      setInputDescription('');
      handleClose();
  }

  return (
    <>
      <Button style={{marginTop: 10, color: '#1876d2', background: '#e7e7e7', borderColor: 'transparent', fontSize: '20px', fontWeight: '700', textAlign: 'left'}} variant="primary"  onClick={handleShow}>
        Novo Card +
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Novo Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nome</Form.Label>
              <Form.Control 
                type="text"
                name='name'
                value={input}
                onChange={handleChange}
                placeholder="exemplo: Task 1"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>descrição</Form.Label> 
              <Form.Control as="textarea" rows={3} 
               type='text'
               name='description'
               onChange={handleDescriptionChange}
               value={inputDescription}
               placeholder='exemplo: Reunião com o DR. Paulo no dia 10/08'
                
               />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button id='buttonNewCard' variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NewCard;