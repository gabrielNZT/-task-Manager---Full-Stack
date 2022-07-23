import React from 'react';
import CloseButton from 'react-bootstrap/CloseButton';
import { Stylebtn } from './style.js';

function CloseBTN(props) {
  const {onDeleteGroup, group} = props;

  const handleDeleteGroup = () => {
    onDeleteGroup(group);
}
  return (
    <>
      <Stylebtn>
        <CloseButton onClick={handleDeleteGroup} variant='white'/>
      </Stylebtn>
    </>
  );
}



export default CloseBTN;