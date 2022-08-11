import React from 'react';
import Modal from 'react-bootstrap/Modal';
import api from '../../service/api';
import Button from 'react-bootstrap/Button';


const DeleteGroup = (props) => {
    const { dispatch, visible, state } = props;

    const onClick = () => {
        api
        .delete("/grupo/"+state.current.id)
        .then()
        dispatch({ type: 'DELETE_GROUP' });
    }

    const onClose = () => {
        dispatch({ type: 'HIDE_MODAL' });
    }
    return <Modal show={visible} onHide={onClose}>
        <Modal.Header closeButton>
            <Modal.Title>REMOVER GRUPO</Modal.Title>
        </Modal.Header>
        <Modal.Body>Ao remover esse grupo você perderá todos as atividades contidas nele!!! </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" style={{ background: '#FF0000' }} onClick={onClick}>
                Remover
            </Button>
        </Modal.Footer>
    </Modal>;
}

export default DeleteGroup;