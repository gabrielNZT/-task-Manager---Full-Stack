import { message } from 'antd';
import { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import api from '../../../service/api';
import headers from '../../../service/security/header';
import './style.css'

export default function DropButton() {

  const [isAdmin, setIsAdmin] = useState(null);
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')) === undefined? null: JSON.parse(localStorage.getItem('user')))
  
  
  function handleActive( ) {
    if(JSON.parse(localStorage.getItem('user')) !== null){
      if(!JSON.parse(localStorage.getItem('user')).receiveEmail){
        return (<Dropdown.Item onClick={() => handleReceiveEmail()} >Ativar Notificações</Dropdown.Item>)
      }
    }
    return null
  }

  const handleReceiveEmail = () => {
    api
      .put("/api/user/" + JSON.parse(localStorage.getItem('user')).id, {
        receiveEmail: true
      }, { headers: headers() })
      .then(setCurrentUser({...currentUser, receiveEmail: currentUser.receiveEmail? false: true}))
      .then(localStorage.setItem('user', JSON.stringify({ ...currentUser, receiveEmail: true })))
      .then(message.success('Tudo pronto para você receber as próximas atualizações!!'))
      .catch(function (error) {
        console.log(error)
      });
  }

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem('user')));
    if (JSON.parse(localStorage.getItem('auth')).roles[0] === 'ROLE_ADMIN') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [])

  return (
    <DropdownButton className='Dropdown-button' id="dropdown-basic-button" title="Menu" variant='primary'>
      <Dropdown.Item href="/dashboard">Dashboard</Dropdown.Item>
      {isAdmin ? <Dropdown.Item href="/users">Controle de Usuário</Dropdown.Item> : null}
      {handleActive(currentUser)}
      <Dropdown.Item style={{ color: 'red' }} href="/">SAIR</Dropdown.Item>
    </DropdownButton>
  );
}   