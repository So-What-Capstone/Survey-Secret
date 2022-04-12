import React from "react";
import { Routes, Route } from "react-router-dom";

import Menu from '../modules/Menu';
import MainContent from '../modules/MainContent';


function Main() {
    return (
        <div>
            <Menu />
            
            <MainContent/>
            <Routes>
                <Route path="test" element={<p>test</p>} />
            </Routes>
        </div>
    )
}

export default Main;
