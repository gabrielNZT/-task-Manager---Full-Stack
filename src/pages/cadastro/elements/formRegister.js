import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../styles/style.css';
import { useRef, useState } from 'react';
import { message } from 'antd';
import api from '../../../service/api';

function FormRegister() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [again, setAgain] = useState('');
  const [isAdmin, setIsAdmin] = useState('');
  const buttonRef = useRef(null);
  const switchRef = useState(null);
  

  const handleSubmit = (e) => {
    e.preventDefault();

    if (again !== password) {
      message.error("a confirmação da senha não corresponde")
      setPassword('');
      setAgain('');
      
    } else {
      if (switchRef.current.checked) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    
      buttonRef.current.focus();
    }

    api
    .post("/api/user", {
      username: name,
      email: email,
      password: password,
      adm: isAdmin,
      enabled: true,
      accountExpired: false,
      accountLocked: false,
      passwordExpired: false
    })
    .then(response => {
      if(response.status === 201){
        message.success("Conta Criada com sucesso")
      }
      else if(response.status === 409){
        message.error("Conta já em uso")
      } else {
        message.error(response.message)
      }
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  return (
    <Form className='form-register' onSubmit={handleSubmit}>
      <hi className='title'>CADASTRO</hi>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Nome Completo</Form.Label>
        <Form.Control onChange={event => setName(event.target.value)}
          type="text"
          value={name}
          placeholder="francisco chiquinho silva"
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control onChange={event => setEmail(event.target.value)}
          type="email"
          placeholder="franciscodasilva@gmail.com"
          value={email}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Senha</Form.Label>
        <Form.Control onChange={event => setPassword(event.target.value)}
          value={password}
          type="password"
          placeholder="Password"
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicTryPassword">
        <Form.Label>Confirme a senha</Form.Label>
        <Form.Control onChange={event => setAgain(event.target.value)}
          value={again}
          type="password"
          placeholder="Password"
          required
        />
      </Form.Group>
      <Form.Group className="form-switch" controlId="formBasicCheckbox" style={{display: 'flex'}}>
        <Form.Check ref={switchRef} value={isAdmin} type="switch" label="Administrador" />
        <a href='/' className='login-link'>Ir para tela de Login</a>
      </Form.Group>
      <Button ref={buttonRef} variant="primary" type="submit">
        Cadastrar
      </Button>
    </Form>
  )
}
export default FormRegister;