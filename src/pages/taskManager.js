import React from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import GlobalStyle from '../styles/global'
import { DndProvider } from "react-dnd";
import Dashboard from '../dashboard';
import { AppBar } from "../dashboard/appbar";

function TaskManager() {
  return (
    <DndProvider backend={HTML5Backend}>
      <AppBar/>
      <GlobalStyle/>
      <Dashboard />
    </DndProvider>
  );
}
export default TaskManager;