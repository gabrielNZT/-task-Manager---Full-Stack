import React from 'react';
import Button from 'react-bootstrap/Button';


const AddGroupButton = (props) => {

    const { onClick } = props;

    const buttonStyle = {
        marginRight: 20,
        marginLeft: 30,
        marginTop: 20,
        color: '#1876d2',
        background: '#e7e7e7',
        border: '2px solid black',
        fontSize: '20px',
        fontWeight: '700',
        height: '4rem',
        width: '14rem',
        textAlign: 'left'
    }


    return <Button style={buttonStyle} variant="primary" onClick={onClick}>
        Novo Grupo +
    </Button>;
}

export default AddGroupButton;