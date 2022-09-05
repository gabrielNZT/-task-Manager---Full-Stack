import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './style.css'

export default function DropButton(){
    return (
        <DropdownButton className='Dropdown-button' id="dropdown-basic-button" title="Menu" variant='danger'>
          <Dropdown.Item href="/">Logout</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </DropdownButton>
      );
}   