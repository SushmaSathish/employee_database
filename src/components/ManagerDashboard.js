/*import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ManagerDashboard = () => {
  const { state } = useLocation();
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    username: '', password: '', emp_id: '', f_name: '', l_name: '', 
    designation: '', b_date: '', sex: '', address: '', job_id: '', 
    salary: '', manager_id: '', dep_id: '', emp_user: '', emp_pass: ''
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await fetch(`http://localhost:3000/api/list_employees_all?MANAGER_ID=${state.managerId}`);
      const data = await response.json();
      setEmployees(data);
    };
    fetchEmployees();
  }, [state.managerId]);

  const handleAddEmployee = async () => {
    const response = await fetch('http://localhost:3000/api/add_employee', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEmployee)
    });
    const data = await response.json();
    if (data.message === 'Employee added successfully') {
      setEmployees([...employees, newEmployee]);
    }
  };

  const handleDeleteEmployee = async (emp_id) => {
    const response = await fetch('http://localhost:3000/api/delete_employee', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: newEmployee.username, password: newEmployee.password, emp_id })
    });
    const data = await response.json();
    if (data.message === `Employee and credentials deleted successfully for employee ID ${emp_id}`) {
      setEmployees(employees.filter((emp) => emp.EMP_ID !== emp_id));
    }
  };

  return (
    <div>
      <h2>Manager Dashboard</h2>
      <h3>Employee List</h3>
      <ul>
        {employees.map((employee) => (
          <li key={employee.EMP_ID}>
            {employee.F_NAME} {employee.L_NAME} - {employee.DESIGNATION}
            <button onClick={() => handleDeleteEmployee(employee.EMP_ID)}>Delete</button>
          </li>
        ))}
      </ul>

      <h3>Add Employee</h3>
      <input type="text" placeholder="First Name" onChange={(e) => setNewEmployee({ ...newEmployee, f_name: e.target.value })} />
      
      <button onClick={handleAddEmployee}>Add Employee</button>
    </div>
  );
};

export default ManagerDashboard;
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ManagerDashboard = () => {
  const { state } = useLocation();
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    username: '', password: '', emp_id: '', f_name: '', l_name: '', 
    designation: '', b_date: '', sex: '', address: '', job_id: '', 
    salary: '', manager_id: '', dep_id: '', emp_user: '', emp_pass: ''
  });

  // Fetch employee data
  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await fetch(`http://localhost:3000/api/list_employees_all?MANAGER_ID=${state.managerId}`);
      const data = await response.json();
      setEmployees(data);
    };
    fetchEmployees();
  }, [state.managerId]);

  // Handle adding a new employee
  const handleAddEmployee = async () => {
    const response = await fetch('http://localhost:3000/api/add_employee', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEmployee)
    });
    const data = await response.json();
    if (data.message === 'Employee added successfully') {
      setEmployees([...employees, newEmployee]);
      setNewEmployee({
        username: '',
        password: '',
        emp_id: '', // Reset employee ID
        f_name: '',
        l_name: '',
        designation: '',
        b_date: '',
        sex: '',
        address: '',
        job_id: '',
        salary: '',
        manager_id: state.managerId,
        dep_id: '',
        emp_user: '',
        emp_pass: ''
      });
    }
  };

  // Handle deleting an employee
  const handleDeleteEmployee = async (emp_id) => {
    const response = await fetch('http://localhost:3000/api/delete_employee', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: state.username, password:state.password, emp_id })
    });
    const data = await response.json();
    if (data.message === `Employee and credentials deleted successfully for employee ID ${emp_id}`) {
      setEmployees(employees.filter((emp) => emp.EMP_ID !== emp_id));
    }
  };

  return (
    <div>
      <h2>Manager Dashboard</h2>
      <h3>Employee List</h3>

     
      <table border="1" cellPadding="10">
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.EMP_ID}>
              <td>{employee.EMP_ID}</td>
              <td>{employee.F_NAME}</td>
              <td>{employee.L_NAME}</td>
              <td>{employee.DESIGNATION}</td>
              <td>{new Date(employee.B_DATE).toLocaleDateString()}</td>
              <td>{employee.SEX}</td>
              <td>{employee.ADDRESS}</td>
              <td>{employee.JOB_ID}</td>
              <td>{employee.SALARY}</td>
              <td>{employee.MANAGER_ID}</td>
              <td>{employee.DEP_ID}</td>
              <td>
                <button onClick={() => handleDeleteEmployee(employee.EMP_ID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Add New Employee</h3>
      <input
        type="text"
        placeholder="Employee ID"
        value={newEmployee.emp_id}
        onChange={(e) => setNewEmployee({ ...newEmployee, emp_id: e.target.value })}/>
      <input type="text" placeholder="First Name" onChange={(e) => setNewEmployee({ ...newEmployee, f_name: e.target.value })} />
      <input type="text" placeholder="Last Name" onChange={(e) => setNewEmployee({ ...newEmployee, l_name: e.target.value })} />
      <input type="text" placeholder="Username" onChange={(e) => setNewEmployee({ ...newEmployee, username: e.target.value })} />
      <input type="password" placeholder="Password" onChange={(e) => setNewEmployee({ ...newEmployee, password: e.target.value })} />
      <input type="text" placeholder="Designation" onChange={(e) => setNewEmployee({ ...newEmployee, designation: e.target.value })} />
      <input type="date" onChange={(e) => setNewEmployee({ ...newEmployee, b_date: e.target.value })} />
      <input type="text" placeholder="Sex" onChange={(e) => setNewEmployee({ ...newEmployee, sex: e.target.value })} />
      <input type="text" placeholder="Address" onChange={(e) => setNewEmployee({ ...newEmployee, address: e.target.value })} />
      <input type="text" placeholder="Job ID" onChange={(e) => setNewEmployee({ ...newEmployee, job_id: e.target.value })} />
      <input type="text" placeholder="Salary" onChange={(e) => setNewEmployee({ ...newEmployee, salary: e.target.value })} />
      <input type="text" placeholder="Manager ID" value={newEmployee.manager_id || state.managerId} onChange={(e) => setNewEmployee({ ...newEmployee, manager_id: e.target.value })} />
      <input type="text" placeholder="Department ID" onChange={(e) => setNewEmployee({ ...newEmployee, dep_id: e.target.value })} />
      <input type="text" placeholder="Employee User" onChange={(e) => setNewEmployee({ ...newEmployee, emp_user: e.target.value })} />
      <input type="password" placeholder="Employee Pass" onChange={(e) => setNewEmployee({ ...newEmployee, emp_pass: e.target.value })} />
      <button onClick={handleAddEmployee}>Add Employee</button>
    </div>
  );
};

export default ManagerDashboard;*/
import React, { useState, useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import './dashboard.css';
import './manager.css';

const ManagerDashboard = () => {
  const { state } = useLocation();
  const navigate = useNavigate(); 
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    username: '', password: '', emp_id: '', f_name: '', l_name: '', 
    designation: '', b_date: '', sex: '', address: '', job_id: '', 
    salary: '', manager_id: '', dep_id: '', emp_user: '', emp_pass: ''
  });
  const [isAddEmployeeFormVisible, setIsAddEmployeeFormVisible] = useState(false);

  // Fetch employee data
  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await fetch(`http://localhost:3000/api/list_employees_all?MANAGER_ID=${state.managerId}`);
      const data = await response.json();
      setEmployees(data);
    };
    fetchEmployees();
  }, [state.managerId]);

  // Handle adding a new employee
  const handleAddEmployee = async () => {
    
    const response = await fetch('http://localhost:3000/api/add_employee', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEmployee)
    });
    const data = await response.json();
    if (data.message === 'Employee added successfully') {
      setEmployees([...employees, newEmployee]);
      setNewEmployee({
        username: '',
        password: '',
        emp_id: '', // Reset employee ID
        f_name: '',
        l_name: '',
        designation: '',
        b_date: '',
        sex: '',
        address: '',
        job_id: '',
        salary: '',
        manager_id: state.managerId,
        dep_id: '',
        emp_user: '',
        emp_pass: ''})
      setIsAddEmployeeFormVisible(false);  // Hide the form after adding the employee
    }
  };

  // Handle deleting an employee
  const handleDeleteEmployee = async (emp_id) => {
    const response = await fetch('http://localhost:3000/api/delete_employee', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: state.username, password:state.password, emp_id })
    });
    const data = await response.json();
    if (data.message === `Employee and credentials deleted successfully for employee ID ${emp_id}`) {
      setEmployees(employees.filter((emp) => emp.EMP_ID !== emp_id));
    }
  };

  // Toggle the Add Employee form visibility
  const toggleAddEmployeeForm = () => {
    setIsAddEmployeeFormVisible(!isAddEmployeeFormVisible);
  };
  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <h2 className="manager-dashboard-title">Manager Dashboard</h2>
      <button onClick={handleLogout} className="logout-btn">Logout</button>
      <h3>Employee List</h3>

      <table className="employee-table" >
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.EMP_ID}>
              <td>{employee.EMP_ID}</td>
              <td>{employee.F_NAME}</td>
              <td>{employee.L_NAME}</td>
              <td>{employee.DESIGNATION}</td>
              <td>{new Date(employee.B_DATE).toLocaleDateString()}</td>
              <td>{employee.SEX}</td>
              <td>{employee.ADDRESS}</td>
              <td>{employee.JOB_ID}</td>
              <td>{employee.SALARY}</td>
              <td>{employee.MANAGER_ID}</td>
              <td>{employee.DEP_ID}</td>
              <td>
                <button className="delete-btn" onClick={() => handleDeleteEmployee(employee.EMP_ID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
      <button className="add-employee-btn" onClick={toggleAddEmployeeForm}>
        {isAddEmployeeFormVisible ? 'Cancel Add Employee' : 'Add Employee'}
      </button>

      {isAddEmployeeFormVisible && (
        <div className="add-employee-form">
          <h3 >Add New Employee</h3>
          <div>
  <label htmlFor="firstName">First Name</label>
  <input
    id="firstName"
    type="text"
    placeholder="First Name"
    onChange={(e) => setNewEmployee({ ...newEmployee, f_name: e.target.value })}
  />

  <label htmlFor="lastName">Last Name</label>
  <input
    id="lastName"
    type="text"
    placeholder="Last Name"
    onChange={(e) => setNewEmployee({ ...newEmployee, l_name: e.target.value })}
  />

  <label htmlFor="username">Username</label>
  <input
    id="username"
    type="text"
    placeholder="Username"
    onChange={(e) => setNewEmployee({ ...newEmployee, username: e.target.value })}
  />

  <label htmlFor="password">Password</label>
  <input
    id="password"
    type="password"
    placeholder="Password"
    onChange={(e) => setNewEmployee({ ...newEmployee, password: e.target.value })}
  />

  <label htmlFor="designation">Designation</label>
  <input
    id="designation"
    type="text"
    placeholder="Designation"
    onChange={(e) => setNewEmployee({ ...newEmployee, designation: e.target.value })}
  />

  <label htmlFor="birthDate">Birth Date</label>
  <input
    id="birthDate"
    type="date"
    onChange={(e) => setNewEmployee({ ...newEmployee, b_date: e.target.value })}
  />

  <label htmlFor="sex">Sex</label>
  <input
    id="sex"
    type="text"
    placeholder="Sex"
    onChange={(e) => setNewEmployee({ ...newEmployee, sex: e.target.value })}
  />

  <label htmlFor="address">Address</label>
  <input
    id="address"
    type="text"
    placeholder="Address"
    onChange={(e) => setNewEmployee({ ...newEmployee, address: e.target.value })}
  />

  <label htmlFor="jobId">Job ID</label>
  <input
    id="jobId"
    type="text"
    placeholder="Job ID"
    onChange={(e) => setNewEmployee({ ...newEmployee, job_id: e.target.value })}
  />

  <label htmlFor="salary">Salary</label>
  <input
    id="salary"
    type="text"
    placeholder="Salary"
    onChange={(e) => setNewEmployee({ ...newEmployee, salary: e.target.value })}
  />

  <label htmlFor="managerId">Manager ID</label>
  <input
    id="managerId"
    type="text"
    placeholder="Manager ID"
    value={newEmployee.manager_id || state.managerId}
    onChange={(e) => setNewEmployee({ ...newEmployee, manager_id: e.target.value })}
  />

  <label htmlFor="departmentId">Department ID</label>
  <input
    id="departmentId"
    type="text"
    placeholder="Department ID"
    onChange={(e) => setNewEmployee({ ...newEmployee, dep_id: e.target.value })}
  />

  <label htmlFor="employeeUser">Employee User</label>
  <input
    id="employeeUser"
    type="text"
    placeholder="Employee User"
    onChange={(e) => setNewEmployee({ ...newEmployee, emp_user: e.target.value })}
  />

  <label htmlFor="employeePass">Employee Pass</label>
  <input
    id="employeePass"
    type="password"
    placeholder="Employee Pass"
    onChange={(e) => setNewEmployee({ ...newEmployee, emp_pass: e.target.value })}
  />

  <button onClick={handleAddEmployee}>Add Employee</button>
</div>

        </div>
      )}
    </div>
  );
};

export default ManagerDashboard;

