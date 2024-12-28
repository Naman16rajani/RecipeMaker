import React, {useState} from 'react';
import './App.css';
import ImageGenerator from './components/ImageGenerator';
import ChatComponent from './components/ChatComponent';
import RecipeGenerator from './components/RecipeGenerator';
import SignupPage from "./components/SignUpPage";
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";


function App() {


    return (
        <div className="App">
            <BrowserRouter>


                <Routes>
                    <Route path="/" index element={<LoginPage/>}/>
                    <Route path="/signup" element={<SignupPage/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                </Routes>

            </BrowserRouter>

        </div>

    );
}

export default App;
