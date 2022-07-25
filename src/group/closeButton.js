import React from 'react';
import CloseButton from 'react-bootstrap/CloseButton';
import { Stylebtn } from './style.js';

function CloseBTN(props) {
  return (
    <>
      <Stylebtn>
        <CloseButton onClick={props.onClick} variant='white'/>
      </Stylebtn>
    </>
  );
}



export default CloseBTN;