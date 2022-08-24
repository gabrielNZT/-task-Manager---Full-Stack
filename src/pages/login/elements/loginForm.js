import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import "../style/style.css"
import { useRef, useState } from 'react'

function LoginForm() {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const buttonRef = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault();
        setUser(user);
        setPassword(password);
        
        buttonRef.current.focus();
        console.log(password, user)
    }

    
    return (
        <Form className='forms' onSubmit={handleSubmit}>
            <h1 className='title'>LOGIN</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Usuário</Form.Label>
                <Form.Control 
                onChange={event => setUser(event.target.value)}
                placeholder="Usuario" 
                value={user}
                autoFocus
                required 
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>senha</Form.Label>
                <Form.Control
                onChange={event => setPassword(event.target.value)}
                value={password} 
                type="password" 
                placeholder="Senha" 
                required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
            </Form.Group>
            <Button ref={buttonRef} variant="primary" type="submit">
                Entrar
            </Button>
            <div>
                <h2>Não possui conta ainda?</h2>
                <a href='#' className='register'>Criar Conta</a>
            </div>
        </Form>
    )
}
export default LoginForm