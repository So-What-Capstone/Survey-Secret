import React from 'react';
import { Routes, Route } from "react-router-dom";

function Main() {
    return (
        <div>
            <p>main</p>
            <Routes>
                <Route path="test" element={<p>test</p>}/>
            </Routes>
        </div>
    )
}

export default Main;