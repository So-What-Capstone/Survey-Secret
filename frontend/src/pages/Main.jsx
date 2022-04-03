import React from 'react';
import { Routes, Route } from "react-router-dom";
import { Button } from 'antd';
import Menu from '../modules/Menu';


function Main() {
    return (
        <div>
            <Menu />
            <p>main</p>
            <Button type="primary">지구폭파</Button>
            <Button>태양계 탈출</Button>
            <Routes>
                <Route path="test" element={<p>test</p>} />
            </Routes>
        </div>
    )
}

export default Main;