import React from 'react';
import CloseButton from 'react-bootstrap/CloseButton';
import { ButtonContainer } from './styles';

const DeleteGroupButton = (props) => {
    const { onClick } = props;
    return <ButtonContainer>
        <CloseButton onClick={onClick} variant='white' />
    </ButtonContainer>;
}

export default DeleteGroupButton;