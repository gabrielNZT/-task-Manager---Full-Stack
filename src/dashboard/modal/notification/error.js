import { message } from "antd";

function Notify(type) {
    switch (type) {
        case 'INVALIDE_ROUTE':
            return (message.error('Rota inválida, redireciando para a tela de login'))
        case 'ACCOUNT_EXIST':
            return (message.error('Conta já existe'))
        case 'LOGIN_ERROR':
            return (message.error('Usuário ou senha inválida'))
        default:
            return null
    }
}

export default Notify;