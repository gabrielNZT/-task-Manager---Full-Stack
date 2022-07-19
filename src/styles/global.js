import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Heebo:wght@200&display=swap');
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    
  }
  html, body, #root {
    height: 100%;
  }
  body {
    font: 14px sans-serif;
    background: #FFFFFF;
    color: #000000;
    -webkit-font-smoothing: antialiased !important;
  }
  ul {
    list-style: none;
  }
`;