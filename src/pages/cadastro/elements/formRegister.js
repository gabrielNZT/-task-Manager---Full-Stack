import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../styles/style.css';
import { useRef, useState } from 'react';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

function FormRegister() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [again, setAgain] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const buttonRef = useRef(null);
  const switchRef = useState(null);
  
  let navigate = useNavigate();

  const handleSubmit = (e) => {
    console.log(isAdmin)
    e.preventDefault();
    if (switchRef.current.checked) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
    if (again !== password) {
      message.error("a confirmação da senha não corresponde")
      setPassword('');
      setAgain('');
    } else {
      buttonRef.current.focus();
      navigate("/dashboard", {replace: false})
    }
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
        <Form.Check ref={switchRef} type="switch" label="Administrador" />
        <a href='/' className='login-link'>Ir para tela de Login</a>
      </Form.Group>
      <Button ref={buttonRef} variant="primary" type="submit">
        Cadastrar
      </Button>
    </Form>
  )
}
export default FormRegister;