import { Button, notification } from 'antd';
import React from 'react';
import api from '../../service/api';
import headers from '../../service/security/header';

function handleReceiveEmail (key) {
  const currentUser = JSON.parse(localStorage.getItem('user'))
  api
  .put("/api/user/" +currentUser.id, {
    receiveEmail: false
  }, {headers: headers()})
  .then(notification.close(key))
  .catch(function (error){
    console.log(error)
  })
}

export const openNotification = () => {
  const placement = 'bottomRight'
  const key = `open${Date.now()}`;
  const btn = (
    <Button type="primary" style={{background: 'red'}} size="middle" onClick={() => handleReceiveEmail(key)}>
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
