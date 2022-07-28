import React, { useState, useRef, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useDrag, useDrop } from 'react-dnd';
import { Container } from './style';
import Context from '../board/context';

function Task(props) {
  const { item, onEdit, onDelete, index, listIndex } = props;
  const ref = useRef();
  const [name, setName] = useState(item.name || '');
  const [description, setDescription] = useState(item.description || '');
  const {moveItem} = useContext(Context);
  

  const [show, setShow] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    onEdit({ id: item.id, name, description });
    handleClose();
  }

  const handleDelete = () => {
    onDelete(item);
    handleClose();
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [{ isDragging }, dragRef] = useDrag({
    type: 'CARD',
    item: {index: index},
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: 'CARD',
    hover(item, monitor) {
        const draggedId = item.index;
        const draggedTarget = index;
        const draggedIndexList = listIndex;

        if(draggedId === draggedTarget){
          return;
        }

        const targetSize = ref.current.getBoundingClientRect();
        const targetCenter = (targetSize.bottom - targetSize.top) / 2;
        
        const draggedOffset = monitor.getClientOffset();
        const draggedTop = draggedOffset.y - targetSize.top;

        if (draggedId < draggedTarget && draggedTop < targetCenter) {
          return;
        }

        if (draggedId > draggedTarget && draggedTop > targetCenter) {
          return;
        }
          
        moveItem(draggedIndexList ,draggedId, draggedTarget);
    }
  })
   
  dragRef(dropRef(ref));

  return (

    <>
      
        <Container onClick={handleShow} ref={ref} isDragging={isDragging}>
          <h1>{item.name}</h1>
        </Container>

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
                required
                placeholder="exemplo: Task 1"
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
      </Modal>
    </>
  );
}

export default Task;