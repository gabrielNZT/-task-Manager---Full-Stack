import React from 'react';
import Button from 'react-bootstrap/Button';



const AddGroupButton = (props) => {
    const { onClick } = props;
    const buttonStyle = {
        marginTop: 10,
        color: '#1876d2',
        background: '#e7e7e7',
        borderColor: 'transparent',
        fontSize: '20px',
        fontWeight: '700',
        textAlign: 'left'
    }

    return <Button style={buttonStyle} variant="primary" onClick={onClick}>
        Novo Card +
    </Button>;
}

export default AddGroupButton;