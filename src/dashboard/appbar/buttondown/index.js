import { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './style.css'

export default function DropButton(props) {
  const { dispatch } = props;
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('auth')).roles[0] === 'ROLE_ADMIN') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [])

  const openModal = () => {
    dispatch({type: 'SHOW_MODAL', payload: {modal: 'NOTIFICATION'}})
  } 

  return (
    <DropdownButton className='Dropdown-button' id="dropdown-basic-button" title="Menu" variant='primary'>
      <Dropdown.Item href="/dashboard"> Dashboard </Dropdown.Item>
      {isAdmin ? <Dropdown.Item href="/users"> Controle de Usuário </Dropdown.Item> : null}
      <Dropdown.Item
      onClick = { openModal }
      > Controle de notificações </Dropdown.Item>
      <Dropdown.Item style={{ color: 'red' }} href="/">SAIR</Dropdown.Item>
    </DropdownButton>
  );
}   