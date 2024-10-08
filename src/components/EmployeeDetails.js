import React, { useState, useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import './dashboard.css';
import './Employee.css';

const EmployeeDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [employeeDetails, setEmployeeDetails] = useState({});

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      const response = await fetch(`http://localhost:3000/api/list_employee_details?EMP=${state.employeeId}`);
      const data = await response.json();
      setEmployeeDetails(data[0]);
    };
    fetchEmployeeDetails();
  }, [state.employeeId]);
  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <h2 className="employee-dashboard-title">Employee Details</h2>
      <button onClick={handleLogout} className="logout-btn">Logout</button>
      <table className="employee-table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Designation</th>
            <th>Birth Date</th>
            <th>Sex</th>
            <th>Address</th>
            <th>Job ID</th>
            <th>Salary</th>
            <th>Manager ID</th>
            <th>Department ID</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{employeeDetails.EMP_ID}</td>
            <td>{employeeDetails.F_NAME}</td>
            <td>{employeeDetails.L_NAME}</td>
            <td>{employeeDetails.DESIGNATION}</td>
            <td>{new Date(employeeDetails.B_DATE).toLocaleDateString()}</td>
            <td>{employeeDetails.SEX}</td>
            <td>{employeeDetails.ADDRESS}</td>
            <td>{employeeDetails.JOB_ID}</td>
            <td>{employeeDetails.SALARY}</td>
            <td>{employeeDetails.MANAGER_ID}</td>
            <td>{employeeDetails.DEP_ID}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeDetails;


