import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import ManagerDashboard from './components/ManagerDashboard';
import EmployeeDetails from './components/EmployeeDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/manager" element={<ManagerDashboard />}  />
        <Route path="/employee" element={<EmployeeDetails />}  />
      </Routes>
    </Router>
  );
}

export default App;
