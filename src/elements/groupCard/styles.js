import styled, { css } from 'styled-components';

export const Container = styled.div`
      height: fit-content;
      min-height: 5rem;
      border: 2px solid #795244;
      background-color: white;
      cursor: grab;
      
      

      & + div {
        margin-top: 15px;
      }
   
      h1 {
        margin-top: 10%;
        margin-bottom: 10%;
        margin-right: 6%;
        margin-left: 6%;
        text-align: left;
        font-size: 22px;
        color: #565656;
      }

      ${props => props.isDragging && css`
        border: 2px dashed rgba(0,0,0,0.2);
        cursor: grabbing;

        div,h1 {
          opacity: 0;
        }
      `}
`;
