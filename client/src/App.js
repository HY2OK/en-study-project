import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AnimatePresence} from 'framer-motion';

import './reset.module.css';

import InitialPage from './components/InitialPage/InitialPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import LoginPage from './components/LoginPage/LoginPage';
import MainPage from './components/MainPage/MainPage';

function App() {
    return (
        <BrowserRouter>
            <AnimatePresence>
                <Routes>
                    <Route path="/" element={<InitialPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/main" element={<MainPage />} />
                </Routes>
            </AnimatePresence>
        </BrowserRouter>
    );
}

export default App;
