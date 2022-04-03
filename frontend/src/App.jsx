import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Main, Login } from "./pages";

function App() {
  return (
    <div className="root">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Main />} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
