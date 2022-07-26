import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import CloseButton from 'react-bootstrap/CloseButton';
import { Stylebtn } from './style.js';
import Button from 'react-bootstrap/Button';

function CloseBTN(props) {
   
  const [show, setShow] = useState(false);

   const handleClose = () => setShow(false); 
   const handleShow = () => setShow(true);

  return (
    <>
      <Stylebtn>
        <CloseButton onClick={handleShow} variant='white'/>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>REMOVER GRUPO</Modal.Title>
            </Modal.Header>
            <Modal.Body>Ao remover esse grupo você perderá todos as atividades contidas nele!!! </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" style={{background: '#FF0000'}} onClick={props.onClick}>
                    Remover
                </Button>
            </Modal.Footer>
        </Modal>
      
      </Stylebtn>
      
    </>
  );
}



export default CloseBTN;