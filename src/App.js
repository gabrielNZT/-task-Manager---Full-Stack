import React from "react";
import GlobalStyle from './styles/global'
import 'bootstrap/dist/css/bootstrap.min.css'
import { DndProvider } from "react-dnd";
import  {HTML5Backend}  from "react-dnd-html5-backend";
import Board from "./board";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
    
    <Board></Board>
    <GlobalStyle></GlobalStyle>

    </DndProvider>
    
  );
}

export default App;
