/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { notification } from 'antd';
import { handleReceiveEmail } from '../../../service/requests.js';
import { currentUser } from '../../../service/requests.js';

function ModalNotification(props) {

  const {visible, dispatch} = props;
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  const [receiveEmail, setReceiveEmail] = useState();
  const buttonPopUp = useRef(null)

  const handleClose = () => dispatch({type: 'HIDE_MODAL'});
  const handleClick = () => {
    localStorage.setItem('user', JSON.stringify({...user, receiveEmail: !receiveEmail}));
    setUser({...user, receiveEmail: !receiveEmail});
    handleReceiveEmail(user.id, !receiveEmail);
    handleClose();
  }

  const openNotification = (user) => {
    const placement = 'bottomRight'
    const key = `open${Date.now()}`;
    const btn = (
      <Button 
      type="primary" 
      style={{background: 'red'}} 
      size="middle"
      ref={buttonPopUp} 
      onClick={() => {
        localStorage.setItem('user', JSON.stringify({...user, receiveEmail: !user.receiveEmail}));
        setUser({...user, receiveEmail: !user.receiveEmail});
        handleReceiveEmail(user.id, !user.receiveEmail);
        notification.close(key);
      }}
      >
        Confirmar
      </Button>
    );
    notification.warning({
      message: 'PARAR DE RECEBER EMAIL DE ATUALIZAÇÃO?',
      description:
        'Ao clicar em confirmar você não irá receber emails avisando que a tarefa a qual você já criou/modificou foi alterada',
      btn,
      key,
      duration: 10,
      placement
    });
  };

  useEffect(() => {
    if(localStorage.getItem('user') === null){
      currentUser().then(response => {
        if(response.receiveEmail){
          openNotification(response)
        }
        setUser(response)
      })
    } else{
      if(user?.receiveEmail){
        openNotification(user)
      }
    }
  }, []);

  useEffect(() => {
    setReceiveEmail(user?.receiveEmail)
  }, [user]);
  
  
  return (
    <>
      <Modal
        show={visible}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Notificações</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClick} disabled={!receiveEmail} >
            Desativar
          </Button>
          <Button variant="success" onClick={handleClick} disabled={receiveEmail}>
            Ativar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ModalNotification