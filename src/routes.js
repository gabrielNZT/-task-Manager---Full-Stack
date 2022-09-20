import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Login from "./pages/login/login.js";
import Register from "./pages/cadastro/register";
import TaskManager from "./pages/taskManager.js"
import UserList from './pages/users/index.js';

export default function PagesRoutes() {
    return (
        <Router>
            <Routes>
                <Route element={<Login/>} path={"/"} />
                <Route element={<Register/>} path={"/cadastro"} />
                <Route element={<TaskManager/>} path={"/dashboard"}/>
                <Route element={<UserList/>} path={"/users"}/>
            </Routes>
        </Router>
    ); 
}