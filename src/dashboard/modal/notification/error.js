import { message } from "antd";

function Notify (type){
    switch(type){
        case 'INVALIDE_ROUTE':
            return (message.error('Redireciando para a tela de login'))
        case 'ACCOUNT_EXIST':
            return (message.error('Conta já existe'))
        
        default:
            return null   
    }
}

export default Notify;