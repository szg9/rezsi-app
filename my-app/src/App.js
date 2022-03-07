import db from './firebase/db'; // eslint-disable-line no-unused-vars
// ↑↑↑ A FENTI SOR(OKA)T NE MÓDOSÍTSD ↑↑↑
import './App.scss';
import React from "react";
import Attractions from "./Attractions";
import EditForm from "./EditForm";
import NewForm from './NewForm';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/attraction/new" element={<NewForm />} />
        <Route path="/attraction/edit/:id/:title" element={<EditForm />} />
        <Route path="/" element={<Attractions />} />
      </Routes>
    </Router>
  );
}

export default App;
