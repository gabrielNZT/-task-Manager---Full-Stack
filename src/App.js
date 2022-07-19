import React from "react";
import GlobalStyle from './styles/global'
import 'bootstrap/dist/css/bootstrap.min.css'
import Board from "./board";
import Group from "./group";

function App() {
  return (
    <>
    <Board></Board>
    <GlobalStyle></GlobalStyle>
    </>
    
  );
}

export default App;
