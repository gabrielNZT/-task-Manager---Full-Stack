import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import "../styles/style.css"
import { useRef, useState, useEffect } from 'react'
import api from '../../../service/api'
import toast, { Toaster } from 'react-hot-toast';
import { logIn } from '../../../service/security/auth.js'
import { useNavigate } from 'react-router-dom'


function LoginForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const buttonRef = useRef(null)

    const notify = () => toast.error("senha ou usuario inválido")
    let navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('auth')
    }, []);

    async function handleSubmit ( event ) {
        event.preventDefault();

        var user = {
            username: username,
            password: password
        }

        setUsername(username);
        setPassword(password);

        buttonRef.current.focus();


        api
            .post("/api/login", user)
            .then(response => {
                if(response.status === 200){
                    logIn(response);
                    navigate('../dashboard', {replace: true})
                }
            })
            .catch(function (error) {
                notify(error.message)
            });
    }


    return (
        <Form className='form-login' onSubmit={handleSubmit}>
            <div><Toaster /></div>
            <h1 className='title-login'>LOGIN</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Usuário</Form.Label>
                <Form.Control
                    onChange={event => setUsername(event.target.value)}
                    placeholder="Usuario"
                    value={username}
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
                <a href='/cadastro' className='register'>Criar Conta</a>
            </div>
        </Form>
    )
}
export default LoginForm