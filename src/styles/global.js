import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Heebo:wght@200&display=swap');
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    
  }
  html, body, #root {
    flex-grow: 1;
    height: 95%;
    width: 100%;
  }
  body {
    background: #E9EBF4;
    font: 14px sans-serif;
    color: #000000;
    -webkit-font-smoothing: antialiased !important;
  }
  ul {
    list-style: none;
  }
`;