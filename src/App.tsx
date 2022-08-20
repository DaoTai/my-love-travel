import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '~/layouts/components/Header';

import './App.css';

function App() {
    return (
        <div className="App">
            <Header />
            <div className="">
                <Outlet />
            </div>
        </div>
    );
}

export default App;
